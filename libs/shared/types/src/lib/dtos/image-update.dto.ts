import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsISO8601,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

import { MediaState } from '../enums/media-state.enum';

export class ImageUpdateDto {
  @IsString()
  fileName!: string;

  @IsEnum(MediaState)
  state!: MediaState;

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
  description?: string;

  @IsString()
  @IsOptional()
  keywords?: string;

  @IsISO8601()
  dateCreated!: string;

  @IsISO8601()
  @IsOptional()
  datePublished?: string;

  @IsBoolean()
  skipExif!: boolean;

  @IsBoolean()
  isThreeSixty!: boolean;
}
