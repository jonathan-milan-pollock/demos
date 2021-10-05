import {
  IsArray,
  IsBoolean,
  IsInt,
  IsISO8601,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

import { ImageUpdate } from '@dark-rush-photography/shared/types';

export class ImageUpdateDto implements ImageUpdate {
  @IsInt()
  @Min(0)
  order!: number;

  @IsBoolean()
  isStarred!: boolean;

  @IsBoolean()
  isLoved!: boolean;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  seoDescription?: string;

  @IsArray()
  @Type(() => String)
  seoKeywords: string[] = [];

  @IsISO8601()
  @IsOptional()
  dateCreated?: string;

  @IsISO8601()
  @IsOptional()
  datePublished?: string;
}
