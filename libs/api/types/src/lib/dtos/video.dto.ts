import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsISO8601,
  IsMongoId,
  IsString,
  IsUrl,
  IsUUID,
  Min,
} from 'class-validator';

import { Video, MediaState } from '@dark-rush-photography/shared/types';

export class VideoDto implements Video {
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

  @IsUUID()
  coverImageId!: string;

  @IsUrl()
  hlsUrl!: string;

  @IsBoolean()
  isFlyOver!: boolean;

  @IsBoolean()
  isGenerated!: boolean;

  @IsBoolean()
  isProcessing!: boolean;
}
