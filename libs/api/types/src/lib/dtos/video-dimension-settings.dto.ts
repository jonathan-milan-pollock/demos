import { IsBoolean, IsOptional } from 'class-validator';

import { VideoDimensionSettings } from '@dark-rush-photography/shared-types';

export class VideoDimensionSettingsDto implements VideoDimensionSettings {
  @IsBoolean()
  @IsOptional()
  hasTrackPath?: boolean;

  @IsBoolean()
  @IsOptional()
  isFlyOver?: boolean;
}
