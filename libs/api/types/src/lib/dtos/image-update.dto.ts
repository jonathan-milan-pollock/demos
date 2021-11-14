import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

import { ImageUpdate } from '@dark-rush-photography/shared/types';

export class ImageUpdateDto implements ImageUpdate {
  @IsString()
  @IsOptional()
  threeSixtyImageStorageId?: string;

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
}
