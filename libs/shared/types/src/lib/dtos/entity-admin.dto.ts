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
import { CommentDto } from './comment.dto';
import { EmotionDto } from './emotion.dto';
import { ImageAdminDto } from './image-admin.dto';
import { VideoDto } from './video.dto';

export class EntityAdminDto {
  @IsEnum(EntityType)
  type!: EntityType;

  @IsMongoId()
  id!: string;

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
  tileImageIsCentered!: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => String)
  text: string[] = [];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CommentDto)
  comments: CommentDto[] = [];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EmotionDto)
  emotions: EmotionDto[] = [];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImageAdminDto)
  images: ImageAdminDto[] = [];

  @ValidateNested({ each: true })
  @Type(() => VideoDto)
  @IsOptional()
  video?: VideoDto;

  @IsBoolean()
  isPublished!: boolean;

  @IsBoolean()
  isPublishing!: boolean;
}
