import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsDefined,
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

  @IsString()
  title!: string;

  @IsString()
  description!: string;

  @IsArray()
  keywords!: string[];

  @IsDateString()
  dateCreated!: string;

  @IsDateString()
  @IsOptional()
  datePublished?: string;

  @ValidateNested({ each: true })
  @Type(() => LocationDto)
  location!: LocationDto;

  @IsBoolean()
  useTitleImage!: boolean;

  @IsArray()
  text!: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImageDto)
  images!: ImageDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VideoDto)
  videos!: VideoDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EmotionDto)
  emotions!: EmotionDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CommentDto)
  comments!: ReadonlyArray<CommentDto>;
}
