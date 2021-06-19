import { IsEnum, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import {
  ImageDimension,
  ImageDimensionState,
  ImageDimensionType,
} from '@dark-rush-photography/shared-types';
import { MediaDimensionPixelsDto } from './media-dimension-pixels.dto';
import { ImageDimensionSettingsDto } from './image-dimension-settings.dto';

export class ImageDimensionAddDto implements Partial<ImageDimension> {
  @IsEnum(ImageDimensionType)
  type!: ImageDimensionType;

  @IsEnum(ImageDimensionState)
  state!: ImageDimensionState;

  @ValidateNested()
  @Type(() => MediaDimensionPixelsDto)
  pixels!: MediaDimensionPixelsDto;

  @ValidateNested()
  @Type(() => ImageDimensionSettingsDto)
  settings!: ImageDimensionSettingsDto;
}
