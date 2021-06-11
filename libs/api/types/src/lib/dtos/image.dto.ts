import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsDefined,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { Image, ImageState } from '@dark-rush-photography/shared-types';
import { EmotionDto } from './emotion.dto';
import { CommentDto } from './comment.dto';
import { ImageDimensionDto } from './image-dimension.dto';

export class ImageDto implements Image {
  @IsDefined()
  slug!: string;

  @IsEnum(ImageState)
  state!: ImageState;

  @IsDefined()
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

  @IsOptional()
  description?: string;

  @IsArray()
  @IsOptional()
  keywords!: string[];

  @IsDateString()
  @IsOptional()
  dateCreated?: string;

  @IsDateString()
  @IsOptional()
  datePublished?: string;

  @IsNumber()
  width!: number;

  @IsNumber()
  height!: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImageDimensionDto)
  imageDimensions!: ReadonlyArray<ImageDimensionDto>;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EmotionDto)
  emotions!: EmotionDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CommentDto)
  comments!: CommentDto[];
}
