import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async login(dto: AuthDto) {
    const profile = await this.prisma.profile.findUnique({
      where: { email: dto.email },
    });

    if (!profile) {
      throw new UnauthorizedException('Invalid account credentials');
    }

    const passwordMatches = await argon.verify(profile.password, dto.password);

    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid account credentials');
    }
    delete profile.password;
    return {
      profile,
      token: this.signToken(profile.id, profile.email),
    };
  }

  signToken(id: number, email: string) {
    return this.jwt.sign(
      {
        sub: id,
        email,
      },
      {
        expiresIn: '1h',
        secret: this.config.get('JWT_SECRET'),
      },
    );
  }
}
