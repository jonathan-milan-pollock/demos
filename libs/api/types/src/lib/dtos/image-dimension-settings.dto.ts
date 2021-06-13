import { IsNumber, IsOptional } from 'class-validator';

import { ImageDimensionSettings } from '@dark-rush-photography/shared-types';

export class ImageDimensionSettingsDto implements ImageDimensionSettings {
  @IsNumber()
  @IsOptional()
  pitch?: number;

  @IsNumber()
  @IsOptional()
  yaw?: number;

  @IsNumber()
  @IsOptional()
  hfov?: number;
}
