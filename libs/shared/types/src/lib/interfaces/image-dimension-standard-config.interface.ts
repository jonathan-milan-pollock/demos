import { ImageDimensionConfig } from './image-dimension-config.interface';
import { MediaResolution } from './media-resolution.interface';

export interface ImageDimensionStandardConfig extends ImageDimensionConfig {
  readonly pixels: MediaResolution;
  readonly exactFit: boolean;
}
