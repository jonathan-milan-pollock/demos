import { IsInt, Min } from 'class-validator';

import { MediaResolution } from '@dark-rush-photography/shared/types';

export class MediaResolutionDto implements MediaResolution {
  @IsInt()
  @Min(0)
  width!: number;

  @IsInt()
  @Min(0)
  height!: number;
}
