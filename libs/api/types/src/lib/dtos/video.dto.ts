import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsDefined,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

import { Video } from '@dark-rush-photography/shared-types';
import { Type } from 'class-transformer';
import { CommentDto } from './comment.dto';
import { EmotionDto } from './emotion.dto';

export class VideoDto implements Video {
  @IsDefined()
  slug!: string;

  @IsDefined()
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
  keywords!: string[];

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
  emotions!: ReadonlyArray<EmotionDto>;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CommentDto)
  comments!: ReadonlyArray<CommentDto>;
}
