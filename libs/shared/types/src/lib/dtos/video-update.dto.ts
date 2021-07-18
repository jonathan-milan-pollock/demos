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
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { MediaState } from '../enums/media-state.enum';
import { ThreeSixtySettingsDto } from './three-sixty-settings.dto';

export class VideoUpdateDto {
  @IsString()
  fileName!: string;

  @IsEnum(MediaState)
  state!: MediaState;

  @IsInt()
  @Min(0)
  order!: number;

  @IsBoolean()
  isStarred!: boolean;

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
  isThreeSixty!: boolean;

  @ValidateNested()
  @Type(() => ThreeSixtySettingsDto)
  @IsOptional()
  threeSixtySettings?: ThreeSixtySettingsDto;

  @IsUUID()
  @IsOptional()
  coverImageId?: string;

  @IsUrl()
  @IsOptional()
  hlsUrl?: string;

  @IsBoolean()
  isFlyOver!: boolean;
}
