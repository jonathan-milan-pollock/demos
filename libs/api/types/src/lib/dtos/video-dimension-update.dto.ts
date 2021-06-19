import { IsEnum, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import {
  VideoDimension,
  VideoDimensionState,
} from '@dark-rush-photography/shared-types';
import { VideoDimensionSettingsDto } from './video-dimension-settings.dto';

export class VideoDimensionUpdateDto implements Partial<VideoDimension> {
  @IsEnum(VideoDimensionState)
  state!: VideoDimensionState;

  @ValidateNested()
  @Type(() => VideoDimensionSettingsDto)
  settings!: VideoDimensionSettingsDto;
}
