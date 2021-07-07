import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsISO8601,
  IsMongoId,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

import { Image, MediaState } from '@dark-rush-photography/shared/types';

export class ImageDto implements Image {
  @IsUUID()
  id!: string;

  @IsMongoId()
  entityId!: string;

  @IsString()
  fileName!: string;

  @IsEnum(MediaState)
  state!: MediaState;

  @IsInt()
  @Min(0)
  order!: number;

  @IsBoolean()
  isStared!: boolean;

  @IsBoolean()
  isLoved!: boolean;

  @IsString()
  title!: string;

  @IsString()
  description!: string;

  @IsString()
  keywords!: string;

  @IsISO8601()
  dateCreated!: string;

  @IsISO8601()
  datePublished!: string;

  @IsBoolean()
  isGenerated!: boolean;

  @IsBoolean()
  isProcessing!: boolean;
}
