import { IsNumber, Min } from 'class-validator';

import { Dimension } from '@dark-rush-photography/shared/types';

export class DimensionDto implements Dimension {
  @IsNumber()
  @Min(0)
  width!: number;

  @IsNumber()
  @Min(0)
  height!: number;
}
