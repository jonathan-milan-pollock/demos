import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { EntityType } from '../enums/entity-type.enum';
import { LocationDto } from './location.dto';
import { SocialMediaUrlDto } from './social-media-url.dto';

export class EntityUpdateDto {
  @IsEnum(EntityType)
  type!: EntityType;

  @IsString()
  group!: string;

  @IsString()
  slug!: string;

  @IsBoolean()
  isPublic!: boolean;

  @IsInt()
  @Min(0)
  order!: number;

  @IsString()
  title!: string;

  @IsString()
  description!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => String)
  keywords: string[] = [];
  
  @IsString()
  @IsOptional()
  dateCreated!: string;

  @IsString()
  @IsOptional()
  datePublished!: string;

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
  websiteUrl!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SocialMediaUrlDto)
  socialMediaUrls: SocialMediaUrlDto[] = [];
}
