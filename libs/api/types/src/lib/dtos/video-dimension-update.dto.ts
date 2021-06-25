import { IsEnum, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import {
  VideoDimension,
  VideoDimensionState,
} from '@dark-rush-photography/shared-types';

export class VideoDimensionUpdateDto implements Partial<VideoDimension> {
  @IsEnum(VideoDimensionState)
  state!: VideoDimensionState;
}
