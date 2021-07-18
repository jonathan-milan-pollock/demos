import {
  IsArray,
  IsBoolean,
  IsInt,
  IsISO8601,
  IsMongoId,
  IsNumberString,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { Event } from '../interfaces/event.interface';
import { LocationDto } from './location.dto';
import { ImageAdminDto } from './image-admin.dto';
import { ImageDimensionDto } from './image-dimension.dto';
import { VideoAdminDto } from './video-admin.dto';
import { VideoDimensionDto } from './video-dimension.dto';
import { CommentDto } from './comment.dto';
import { EmotionDto } from './emotion.dto';

export class EventAdminDto implements Event {
  @IsMongoId()
  id!: string;

  @IsNumberString()
  group!: string;

  @IsString()
  slug!: string;

  @IsBoolean()
  isPublic!: boolean;

  @IsInt()
  @Min(0)
  order!: number;

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
  dateCreated!: string;

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

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CommentDto)
  comments: CommentDto[] = [];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EmotionDto)
  emotions: EmotionDto[] = [];
}
