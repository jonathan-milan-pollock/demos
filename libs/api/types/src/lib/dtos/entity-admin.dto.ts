import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
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
import { ImageDimensionDto } from './image-dimension.dto';
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
  @ValidateNested({ each: true })
  @Type(() => String)
  seoKeywords: string[] = [];

  @IsString()
  dateCreated!: string;

  @IsString()
  datePublished!: string;

  @ValidateNested()
  @Type(() => LocationDto)
  location!: LocationDto;

  @IsBoolean()
  starredImageIsCentered!: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => String)
  text: string[] = [];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImageAdminDto)
  images: ImageAdminDto[] = [];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImageDimensionDto)
  imageDimensions: ImageDimensionDto[] = [];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VideoDto)
  videos: VideoDto[] = [];

  @IsBoolean()
  isPublic!: boolean;

  @IsBoolean()
  isPublishing!: boolean;

  @IsBoolean()
  isPublished!: boolean;
}
