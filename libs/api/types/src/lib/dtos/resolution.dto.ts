import { IsNumber, Min } from 'class-validator';

import { Resolution } from '@dark-rush-photography/shared/types';

export class ResolutionDto implements Resolution {
  @IsNumber()
  @Min(0)
  width!: number;

  @IsNumber()
  @Min(0)
  height!: number;
}
