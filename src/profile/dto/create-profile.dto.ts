import {
  IsEmail,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';

export class CreateProfileDto {
  @IsString()
  firstName: string;
  @IsString()
  lastName: string;
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsString()
  professionalSummary: string;

  @IsString()
  @MaxLength(64)
  @MinLength(8)
  @Matches(/[a-z]/, {
    message: 'Password must contain a lower case letter',
  })
  @Matches(/[A-Z]/, {
    message: 'Password must contain an upper case letter',
  })
  @Matches(/\d/, {
    message: 'Password must contain a number',
  })
  @Matches(/[!@#$%^&*()_+=\[\]{};':"\\|,.<>\/?]/, {
    message: 'Password must contain a special character',
  })
  password: string;

  @IsString()
  title: string;
  @IsString()
  @IsOptional()
  location?: string;

  @IsString()
  careerStarDate: string;
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
