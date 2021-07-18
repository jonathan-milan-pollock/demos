import {
  IsArray,
  IsBoolean,
  IsInt,
  IsMongoId,
  IsOptional,
  IsString,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { CommentDto } from './comment.dto';
import { EmotionDto } from './emotion.dto';

export class ImageDto {
  @IsUUID()
  id!: string;

  @IsMongoId()
  entityId!: string;

  @IsString()
  fileName!: string;

  @IsInt()
  @Min(0)
  order!: number;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  keywords?: string;

  @IsBoolean()
  isThreeSixty!: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CommentDto)
  comments: CommentDto[] = [];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EmotionDto)
  emotions: EmotionDto[] = [];
}
