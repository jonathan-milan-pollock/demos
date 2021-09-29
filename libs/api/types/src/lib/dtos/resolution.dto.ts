import { IsInt, Min } from 'class-validator';

import { Resolution } from '@dark-rush-photography/shared/types';

export class ResolutionDto implements Resolution {
  @IsInt()
  @Min(0)
  width!: number;

  @IsInt()
  @Min(0)
  height!: number;
}
