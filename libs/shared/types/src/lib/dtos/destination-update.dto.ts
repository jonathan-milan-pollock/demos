import {
  IsArray,
  IsBoolean,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { LocationDto } from './location.dto';
import { SocialMediaUrlDto } from './social-media-url.dto';

export class DestinationUpdateDto {
  @IsString()
  slug!: string;

  @IsBoolean()
  isPublic!: boolean;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => String)
  keywords: string[] = [];

  @ValidateNested()
  @Type(() => LocationDto)
  @IsOptional()
  location?: LocationDto;

  @IsBoolean()
  useTileImage!: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => String)
  text: string[] = [];

  @IsBoolean()
  hasExtendedReality!: boolean;

  @IsUrl()
  @IsOptional()
  websiteUrl?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SocialMediaUrlDto)
  socialMediaUrls: SocialMediaUrlDto[] = [];
}
