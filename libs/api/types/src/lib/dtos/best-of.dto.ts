import { IsArray, IsMongoId, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { BestOf } from '@dark-rush-photography/shared-types';
import { ImageDto } from './image.dto';
import { ImageDimensionDto } from './image-dimension.dto';
import { CommentDto } from './comment.dto';
import { EmotionDto } from './emotion.dto';

export class BestOfDto implements BestOf {
  @IsMongoId()
  id!: string;

  @IsString()
  slug!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImageDto)
  images: ImageDto[] = [];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImageDimensionDto)
  imageDimensions: ImageDimensionDto[] = [];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CommentDto)
  comments: CommentDto[] = [];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EmotionDto)
  emotions: EmotionDto[] = [];
}
