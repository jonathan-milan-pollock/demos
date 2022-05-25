import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsMongoId,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

import { ImageAdmin, ImageState } from '@dark-rush-photography/shared/types';

export class ImageAdminDto implements ImageAdmin {
  @IsUUID()
  id!: string;

  @IsMongoId()
  entityId!: string;

  @IsUUID()
  storageId!: string;

  @IsString()
  pathname!: string;

  @IsInt()
  @Min(0)
  order!: number;

  @IsEnum(ImageState)
  state!: ImageState;

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
