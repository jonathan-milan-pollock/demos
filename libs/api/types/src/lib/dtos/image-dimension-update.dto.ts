import { IsEnum, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import {
  ImageDimension,
  ImageDimensionState,
} from '@dark-rush-photography/shared-types';
import { ThreeSixtyImageSettingsDto } from './three-sixty-image-settings.dto';

export class ImageDimensionUpdateDto implements Partial<ImageDimension> {
  @IsEnum(ImageDimensionState)
  state!: ImageDimensionState;

  @ValidateNested()
  @Type(() => ThreeSixtyImageSettingsDto)
  @IsOptional()
  threeSixtyImageSettings?: ThreeSixtyImageSettingsDto;
}
