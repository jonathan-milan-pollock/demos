import {
  IsArray,
  IsBoolean,
  IsISO8601,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { EntityUpdate } from '@dark-rush-photography/shared/types';
import { LocationDto } from './location.dto';
import { SocialMediaUrlDto } from './social-media-url.dto';

export class EntityUpdateDto implements EntityUpdate {
  @IsString()
  group!: string;

  @IsString()
  slug!: string;

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

  @IsISO8601()
  @IsOptional()
  dateCreated?: string;

  @IsISO8601()
  @IsOptional()
  datePublished?: string;

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
