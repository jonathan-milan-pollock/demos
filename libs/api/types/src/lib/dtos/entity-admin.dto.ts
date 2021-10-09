import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsISO8601,
  IsMongoId,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import {
  EntityAdmin,
  EntityType,
  WatermarkedType,
} from '@dark-rush-photography/shared/types';
import { LocationDto } from './location.dto';
import { ImageAdminDto } from './image-admin.dto';
import { VideoDto } from './video.dto';

export class EntityAdminDto implements EntityAdmin {
  @IsEnum(EntityType)
  type!: EntityType;

  @IsMongoId()
  id!: string;

  @IsEnum(WatermarkedType)
  watermarkedType!: WatermarkedType;

  @IsString()
  group!: string;

  @IsString()
  slug!: string;

  @IsInt()
  @Min(0)
  order!: number;

  @IsString()
  title!: string;

  @IsString()
  seoDescription!: string;

  @IsArray()
  @Type(() => String)
  seoKeywords: string[] = [];

  @IsISO8601()
  dateCreated!: string;

  @IsISO8601()
  datePublished!: string;

  @ValidateNested()
  @Type(() => LocationDto)
  location!: LocationDto;

  @IsBoolean()
  starredImageIsCentered!: boolean;

  @IsArray()
  @Type(() => String)
  text: string[] = [];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImageAdminDto)
  images: ImageAdminDto[] = [];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VideoDto)
  videos: VideoDto[] = [];

  @IsBoolean()
  isPublic!: boolean;

  @IsBoolean()
  isPublished!: boolean;

  @IsBoolean()
  isProcessing!: boolean;
}
