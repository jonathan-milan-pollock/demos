import { IsNumber } from 'class-validator';

import { ThreeSixtySettings } from '@dark-rush-photography/shared/types';

export class ThreeSixtySettingsDto implements ThreeSixtySettings {
  @IsNumber()
  pitch!: number;

  @IsNumber()
  roll!: number;

  @IsNumber()
  yaw!: number;

  @IsNumber()
  hfov!: number;
}
