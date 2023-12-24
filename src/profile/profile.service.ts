import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProfileDto, UpdateProfileDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Profile } from '@prisma/client';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}

  async createProfile(dto: CreateProfileDto) {
    try {
      const {
        password,
        socialMediaLink = [],
        techStack = [],
        ...restDto
      } = dto;

      const hash = await argon.hash(password);

      const profile = await this.prisma.profile.create({
        data: {
          ...restDto,
          password: hash,
          socialMediaLinks: Array.isArray(socialMediaLink)
            ? socialMediaLink
            : [socialMediaLink],
          techStack: Array.isArray(techStack) ? techStack : [techStack],
        },
      });
      delete profile.password;
      return profile;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('Credentials taken');
        }
      }
      throw error;
    }
  }

  async getProfileById(id: number) {
    return this.prisma.profile.findUnique({ where: { id } });
  }

  async updateProfile(id: number, dto: UpdateProfileDto) {
    const profile = await this.getProfileById(id);
    await this.checkProfileOwnership(id, profile);

    const { techStack: pTeckStack = [], socialMediaLinks = [] } = profile;

    const { socialMediaLink, techStack, ...restDto } = dto;

    const updatedTechStack = Array.from(
      new Set([
        ...pTeckStack,
        ...(Array.isArray(techStack) ? techStack : [techStack]),
      ]),
    ) as string[];
    const updatedSocialMediaLinks = Array.from(
      new Set([
        ...socialMediaLinks,
        ...(Array.isArray(socialMediaLink)
          ? socialMediaLink
          : [socialMediaLink]),
      ]),
    ) as string[];

    const updatedProfile = await this.prisma.profile.update({
      where: { id },
      data: {
        ...restDto,
        ...(techStack && { techStack: updatedTechStack }),
        ...(socialMediaLink && { socialMediaLinks: updatedSocialMediaLinks }),
      },
    });

    delete updatedProfile.password;
    return updatedProfile;
  }

  async deleteProfile(id: number) {
    await this.checkProfileOwnership(id);
    return this.prisma.profile.delete({ where: { id } });
  }

  async checkProfileOwnership(id: number, profile?: Profile) {
    const userProfile = profile ?? (await this.getProfileById(id));
    if (!userProfile || userProfile.id !== id) {
      throw new ForbiddenException(
        'You have no access to the specified profile',
      );
    }
  }
}
