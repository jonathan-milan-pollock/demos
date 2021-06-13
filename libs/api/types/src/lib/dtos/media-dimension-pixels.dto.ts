import { IsInt, Min } from 'class-validator';

import { MediaDimensionPixels } from '@dark-rush-photography/shared-types';

export class MediaDimensionPixelsDto implements MediaDimensionPixels {
  @IsInt()
  @Min(0)
  width!: number;

  @IsInt()
  @Min(0)
  height!: number;
}
