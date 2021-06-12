import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { Image, PostedState } from '@dark-rush-photography/shared-types';
import { ImageDimensionDto } from './image-dimension.dto';
import { EmotionDto } from './emotion.dto';
import { CommentDto } from './comment.dto';

export class ImageDto implements Image {
  @IsString()
  entityId!: string;

  @IsString()
  slug!: string;

  @IsEnum(PostedState)
  state!: PostedState;

  @IsNumber()
  order!: number;

  @IsBoolean()
  isStared!: boolean;

  @IsBoolean()
  isLoved!: boolean;

  @IsBoolean()
  isLiked!: boolean;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsArray()
  keywords: string[] = [];

  @IsDateString()
  dateCreated!: string;

  @IsDateString()
  @IsOptional()
  datePublished?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImageDimensionDto)
  dimensions: ImageDimensionDto[] = [];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EmotionDto)
  emotions: EmotionDto[] = [];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CommentDto)
  comments: CommentDto[] = [];
}
