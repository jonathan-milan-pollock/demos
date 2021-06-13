import { IsBoolean, IsOptional, IsString } from 'class-validator';

import { VideoDimensionSettings } from '@dark-rush-photography/shared-types';

export class VideoDimensionSettingsDto implements VideoDimensionSettings {
  @IsString()
  imageSlug!: string;

  @IsBoolean()
  @IsOptional()
  hasTrackPath?: boolean;

  @IsBoolean()
  @IsOptional()
  isFlyOver?: boolean;
}
