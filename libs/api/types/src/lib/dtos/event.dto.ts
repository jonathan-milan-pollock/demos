import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { LocationDto } from './location.dto';
import { ImageDto } from './image.dto';
import { VideoDto } from './video.dto';
import { EmotionDto } from './emotion.dto';
import { CommentDto } from './comment.dto';

export class EventDto {
  @IsString()
  slug!: string;

  @IsNumber()
  group!: number;

  @IsBoolean()
  isPublic!: boolean;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsArray()
  keywords: string[] = [];

  @IsDateString()
  @IsOptional()
  dateCreated?: string;

  @IsDateString()
  @IsOptional()
  datePublished?: string;

  @ValidateNested({ each: true })
  @Type(() => LocationDto)
  @IsOptional()
  location?: LocationDto;

  @IsBoolean()
  useTitleImage!: boolean;

  @IsArray()
  text: string[] = [];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImageDto)
  images: ImageDto[] = [];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VideoDto)
  videos: VideoDto[] = [];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EmotionDto)
  emotions: EmotionDto[] = [];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CommentDto)
  comments: CommentDto[] = [];
}
