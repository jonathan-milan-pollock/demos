import { ImageDimensionConfig } from './image-dimension-config.interface';
import { Resolution } from './resolution.interface';

export interface ImageDimensionStandardConfig extends ImageDimensionConfig {
  readonly resolution: Resolution;
  readonly exactFit: boolean;
}
