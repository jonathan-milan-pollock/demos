import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsISO8601,
  IsMongoId,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

import { Image, ImageState } from '@dark-rush-photography/shared/types';

export class ImageAdminDto implements Image {
  @IsUUID()
  id!: string;

  @IsMongoId()
  entityId!: string;

  @IsEnum(ImageState)
  state!: ImageState;

  @IsString()
  blobPathId!: string;

  @IsString()
  fileName!: string;

  @IsInt()
  @Min(0)
  order!: number;

  @IsBoolean()
  isStarred!: boolean;

  @IsBoolean()
  isLoved!: boolean;

  @IsString()
  title!: string;

  @IsString()
  seoDescription!: string;

  @IsString()
  seoKeywords!: string;

  @IsISO8601()
  @IsOptional()
  dateCreated?: string;

  @IsISO8601()
  @IsOptional()
  datePublished?: string;

  @IsBoolean()
  isThreeSixty!: boolean;
}
