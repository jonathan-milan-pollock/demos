import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsISO8601,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
  Min,
} from 'class-validator';

import { PostState, Video } from '@dark-rush-photography/shared-types';

export class VideoUpdateDto implements Partial<Video> {
  @IsString()
  fileName!: string;

  @IsEnum(PostState)
  postState!: PostState;

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
  coverImageId!: string;

  @IsUrl()
  @IsOptional()
  hlsStreamingUrl?: string;

  @IsBoolean()
  isFlyOver!: boolean;

  @IsBoolean()
  isProcessed!: boolean;

  @IsBoolean()
  isLocked!: boolean;
}
