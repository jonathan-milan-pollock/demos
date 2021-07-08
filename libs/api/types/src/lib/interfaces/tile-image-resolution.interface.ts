import { MediaDimensionPixels } from '@dark-rush-photography/shared/types';
import { ImageResolution } from './image-resolution.interface';

export interface TileImageResolution extends ImageResolution {
  readonly minPixels: MediaDimensionPixels;
  readonly longestEdge: number;
}
