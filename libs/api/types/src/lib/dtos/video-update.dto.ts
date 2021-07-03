import {
  IsBoolean,
  IsInt,
  IsISO8601,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
  Min,
} from 'class-validator';

import { VideoUpdate } from '@dark-rush-photography/shared/types';

export class VideoUpdateDto implements VideoUpdate {
  @IsString()
  fileName!: string;

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
}
