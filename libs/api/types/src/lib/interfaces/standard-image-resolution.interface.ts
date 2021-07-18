import { MediaResolution } from '@dark-rush-photography/shared/types';
import { ImageResolution } from './image-resolution.interface';

export interface StandardImageResolution extends ImageResolution {
  readonly pixels: MediaResolution;
  readonly exactFit: boolean;
}
