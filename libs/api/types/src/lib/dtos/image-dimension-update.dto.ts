import { IsEnum, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import {
  ImageDimension,
  ImageDimensionState,
} from '@dark-rush-photography/shared-types';
import { ImageDimensionSettingsDto } from './image-dimension-settings.dto';

export class ImageDimensionUpdateDto implements Partial<ImageDimension> {
  @IsEnum(ImageDimensionState)
  state!: ImageDimensionState;

  @ValidateNested()
  @Type(() => ImageDimensionSettingsDto)
  settings!: ImageDimensionSettingsDto;
}
