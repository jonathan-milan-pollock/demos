import { IsArray, IsInt, IsString, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { ImageMinimalDto } from './image-minimal.dto';
import { CommentDto } from './comment.dto';
import { EmotionDto } from './emotion.dto';

export class DestinationDto {
  @IsString()
  slug!: string;

  @IsInt()
  @Min(0)
  order!: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImageMinimalDto)
  images: ImageMinimalDto[] = [];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CommentDto)
  comments: CommentDto[] = [];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EmotionDto)
  emotions: EmotionDto[] = [];
}
