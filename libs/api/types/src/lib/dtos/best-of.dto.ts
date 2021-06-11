import { IsArray, IsEnum, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { BestOfType } from '@dark-rush-photography/shared-types';
import { ImageDto } from './image.dto';
import { EmotionDto } from './emotion.dto';
import { CommentDto } from './comment.dto';

export class BestOfDto {
  @IsEnum(BestOfType)
  bestOfType!: BestOfType;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImageDto)
  images!: ImageDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EmotionDto)
  emotions!: EmotionDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CommentDto)
  comments!: CommentDto[];
}
