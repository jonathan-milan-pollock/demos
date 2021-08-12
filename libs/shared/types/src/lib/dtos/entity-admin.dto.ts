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

import { EntityType } from '../enums/entity-type.enum';
import { LocationDto } from './location.dto';
import { ImageAdminDto } from './image-admin.dto';
import { ImageDimensionDto } from './image-dimension.dto';
import { VideoAdminDto } from './video-admin.dto';
import { VideoDimensionDto } from './video-dimension.dto';
import { SocialMediaUrlDto } from './social-media-url.dto';
import { CommentDto } from './comment.dto';
import { EmotionDto } from './emotion.dto';
import { Entity } from '../interfaces/entity.interface';

export class EntityAdminDto implements Entity {

  @IsEnum(EntityType)
  type!: EntityType;
  
  @IsMongoId()
  id!: string;

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
  dateCreated!: string;

  @IsString()
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
  @Type(() => VideoAdminDto)
  videos: VideoAdminDto[] = [];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VideoDimensionDto)
  videoDimensions: VideoDimensionDto[] = [];

  @IsBoolean()
  hasExtendedReality!: boolean;

  @IsString()
  websiteUrl!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SocialMediaUrlDto)
  socialMediaUrls: SocialMediaUrlDto[] = [];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CommentDto)
  comments: CommentDto[] = [];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EmotionDto)
  emotions: EmotionDto[] = [];
}
