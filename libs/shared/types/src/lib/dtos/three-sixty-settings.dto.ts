import { IsNumber } from 'class-validator';

import { ThreeSixtySettings } from '../interfaces/three-sixty-settings.interface';

export class ThreeSixtySettingsDto implements ThreeSixtySettings {
  @IsNumber()
  pitch!: number;

  @IsNumber()
  yaw!: number;

  @IsNumber()
  hfov!: number;
}
