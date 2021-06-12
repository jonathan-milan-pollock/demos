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

import { Video, PostedState } from '@dark-rush-photography/shared-types';
import { CommentDto } from './comment.dto';
import { EmotionDto } from './emotion.dto';

export class VideoDto implements Video {
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

  @IsString()
  @IsOptional()
  titleTrack?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EmotionDto)
  emotions: EmotionDto[] = [];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CommentDto)
  comments: CommentDto[] = [];
}
