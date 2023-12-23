import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProfileDto, UpdateProfileDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

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

      return this.prisma.profile.create({
        data: {
          ...restDto,
          password: hash,
          socialMediaLinks: Array.isArray(socialMediaLink)
            ? socialMediaLink
            : [socialMediaLink],
          techStack: Array.isArray(techStack) ? techStack : [techStack],
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('Credentials taken');
        }
      }
    }
  }

  async getProfileById(id: number) {
    return this.prisma.profile.findUnique({ where: { id } });
  }

  async updateProfile(id: number, dto: UpdateProfileDto) {
    this.checkProfileOwnership(id);
    const { socialMediaLink, techStack } = dto;
    return this.prisma.profile.update({
      where: { id },
      data: {
        ...dto,
        socialMediaLinks: { push: socialMediaLink },
        techStack: { push: techStack },
      },
    });
  }

  async deleteProfile(id: number) {
    this.checkProfileOwnership(id);
    return this.prisma.profile.delete({ where: { id } });
  }

  async checkProfileOwnership(id: number) {
    const profile = await this.getProfileById(id);
    if (!profile || profile.id !== id) {
      throw new ForbiddenException(
        'You have no access to the specified profile',
      );
    }
  }
}
