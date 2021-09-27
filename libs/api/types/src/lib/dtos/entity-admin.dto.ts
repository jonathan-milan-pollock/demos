import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsMongoId,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import {
  Entity,
  EntityType,
  WatermarkedType,
} from '@dark-rush-photography/shared/types';
import { LocationDto } from './location.dto';
import { CommentDto } from './comment.dto';
import { EmotionDto } from './emotion.dto';
import { ImageAdminDto } from './image-admin.dto';
import { ImageDimensionDto } from './image-dimension.dto';
import { VideoDto } from './video.dto';

export class EntityAdminDto implements Entity {
  @IsEnum(EntityType)
  type!: EntityType;

  @IsMongoId()
  @IsOptional()
  id?: string;

  @IsString()
  @IsOptional()
  googleDriveFolderId?: string;

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
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  seoDescription?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => String)
  seoKeywords: string[] = [];

  @IsString()
  @IsOptional()
  dateCreated?: string;

  @IsString()
  @IsOptional()
  datePublished?: string;

  @ValidateNested()
  @Type(() => LocationDto)
  @IsOptional()
  location?: LocationDto;

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

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CommentDto)
  comments: CommentDto[] = [];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EmotionDto)
  emotions: EmotionDto[] = [];

  @IsBoolean()
  isPublic!: boolean;

  @IsBoolean()
  isPublishing!: boolean;

  @IsBoolean()
  isPublished!: boolean;
}
