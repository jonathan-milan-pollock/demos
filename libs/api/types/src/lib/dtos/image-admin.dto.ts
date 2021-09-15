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

import { Image, MediaState } from '@dark-rush-photography/shared/types';

export class ImageAdminDto implements Image {
  @IsUUID()
  id!: string;

  @IsMongoId()
  entityId!: string;

  @IsEnum(MediaState)
  state!: MediaState;

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
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  seoDescription?: string;

  @IsString()
  @IsOptional()
  seoKeywords?: string;

  @IsISO8601()
  @IsOptional()
  dateCreated?: string;

  @IsISO8601()
  @IsOptional()
  datePublished?: string;

  @IsBoolean()
  skipExif!: boolean;

  @IsBoolean()
  isThreeSixty!: boolean;
}
