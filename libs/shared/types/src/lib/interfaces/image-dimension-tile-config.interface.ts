import { ImageDimensionConfig } from './image-dimension-config.interface';
import { MediaResolution } from './media-resolution.interface';

export interface ImageDimensionTileConfig extends ImageDimensionConfig {
  readonly minPixels: MediaResolution;
  readonly longestEdge: number;
}
