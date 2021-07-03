import { IsNumber } from 'class-validator';

import { ThreeSixtyImageSettings } from '@dark-rush-photography/shared/types';

export class ThreeSixtyImageSettingsDto implements ThreeSixtyImageSettings {
  @IsNumber()
  pitch!: number;

  @IsNumber()
  yaw!: number;

  @IsNumber()
  hfov!: number;
}
