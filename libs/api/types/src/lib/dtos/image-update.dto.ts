import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsISO8601,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

import { ImageUpdate, MediaState } from '@dark-rush-photography/shared/types';

export class ImageUpdateDto implements ImageUpdate {
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
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  keywords?: string;

  @IsISO8601()
  @IsOptional()
  datePublished?: string;
}
