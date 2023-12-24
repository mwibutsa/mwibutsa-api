import { Body, Controller, Post, Put, UseGuards } from '@nestjs/common';
import { CreateProfileDto, UpdateProfileDto } from './dto';
import { ProfileService } from './profile.service';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from 'src/auth/guard';

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}
  @Post('')
  async createProfile(@Body() body: CreateProfileDto) {
    return this.profileService.createProfile(body);
  }

  @UseGuards(JwtGuard)
  @Put('')
  async updateProfile(
    @Body() body: UpdateProfileDto,
    @GetUser('id') profileId: number,
  ) {
    return this.profileService.updateProfile(profileId, body);
  }
}
