import { IsOptional, IsString, IsUrl, Validate } from 'class-validator';
import { IsArrayOrString, IsArrayOrStringOfUrls } from '../validator';

export class UpdateProfileDto {
  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsString()
  @IsOptional()
  professionalSummary?: string;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsString()
  @IsOptional()
  careerStarDate?: string;

  @IsString()
  @IsOptional()
  isOpenToWork?: boolean;

  @IsString()
  @IsOptional()
  isOpenToRelocation?: boolean;

  @IsString()
  @IsOptional()
  preferredLocation?: string;

  @Validate(IsArrayOrString, {
    message: 'techStack should be either string or array of strings',
  })
  @IsOptional()
  techStack?: string | string[];

  @IsUrl()
  @IsOptional()
  cvLink?: string;

  @IsOptional()
  @Validate(IsArrayOrStringOfUrls, {
    message: 'socialMediaLink should be either url or array of urls',
  })
  socialMediaLink?: string | string[];
}
