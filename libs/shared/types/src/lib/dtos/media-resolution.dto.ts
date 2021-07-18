import { IsInt, Min } from 'class-validator';

import { MediaResolution } from '../interfaces/media-resolution.interface';

export class MediaResolutionDto implements MediaResolution {
  @IsInt()
  @Min(0)
  width!: number;

  @IsInt()
  @Min(0)
  height!: number;
}
