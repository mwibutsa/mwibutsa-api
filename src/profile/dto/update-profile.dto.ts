import {
  IsDate,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';

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
  title?: string;
  @IsString()
  @IsOptional()
  location?: string;

  @IsDate()
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
  @IsString()
  @IsOptional()
  @ValidateNested()
  techStack?: string | string[];
  @IsUrl()
  @IsOptional()
  cvLink?: string;
  @IsUrl()
  @IsOptional()
  @ValidateNested()
  socialMediaLink?: string | string[];
}
