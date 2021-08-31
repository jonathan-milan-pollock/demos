import { ImageResolution } from './image-resolution.interface';
import { MediaResolution } from './media-resolution.interface';

export interface TileImageResolution extends ImageResolution {
  readonly minPixels: MediaResolution;
  readonly longestEdge: number;
}
