import { ImageResolution } from './image-resolution.interface';
import { MediaResolution } from './media-resolution.interface';

export interface StandardImageResolution extends ImageResolution {
  readonly pixels: MediaResolution;
  readonly exactFit: boolean;
}
