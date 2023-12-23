import { Body, Controller, Post } from '@nestjs/common';
import { CreateProfileDto } from './dto';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}
  @Post('')
  async createProfile(@Body() body: CreateProfileDto) {
    console.log('body', body);
    return this.profileService.createProfile(body);
  }
}
