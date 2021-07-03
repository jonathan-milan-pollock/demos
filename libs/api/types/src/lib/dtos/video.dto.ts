import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsISO8601,
  IsMongoId,
  IsOptional,
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
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  keywords?: string;

  @IsISO8601()
  dateCreated!: string;

  @IsISO8601()
  @IsOptional()
  datePublished?: string;

  @IsUUID()
  coverImageId?: string;

  @IsUrl()
  @IsOptional()
  hlsStreamingUrl?: string;

  @IsBoolean()
  isFlyOver!: boolean;

  @IsBoolean()
  isGenerated!: boolean;
}
