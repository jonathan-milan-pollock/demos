import { IsEnum, IsMongoId, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import {
  VideoDimension,
  VideoDimensionState,
  VideoDimensionType,
} from '@dark-rush-photography/shared-types';
import { MediaDimensionPixelsDto } from './media-dimension-pixels.dto';
import { VideoDimensionSettingsDto } from './video-dimension-settings.dto';

export class VideoDimensionDto implements VideoDimension {
  @IsMongoId()
  entityId!: string;

  @IsString()
  videoSlug!: string;

  @IsEnum(VideoDimensionType)
  type!: VideoDimensionType;

  @IsEnum(VideoDimensionState)
  state!: VideoDimensionState;

  @ValidateNested()
  @Type(() => MediaDimensionPixelsDto)
  pixels!: MediaDimensionPixelsDto;

  @ValidateNested()
  @Type(() => VideoDimensionSettingsDto)
  settings!: VideoDimensionSettingsDto;
}
