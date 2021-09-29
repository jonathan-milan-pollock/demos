import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsMongoId,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

import { ImageAdmin, ImageState } from '@dark-rush-photography/shared/types';

export class ImageAdminDto implements ImageAdmin {
  @IsUUID()
  id!: string;

  @IsMongoId()
  entityId!: string;

  @IsString()
  blobPathId!: string;

  @IsString()
  fileName!: string;

  @IsEnum(ImageState)
  state!: ImageState;

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

  @IsString()
  dateCreated!: string;

  @IsString()
  datePublished!: string;

  @IsBoolean()
  isThreeSixty!: boolean;
}
