import { ImageDimensionConfig } from './image-dimension-config.interface';

export interface ImageDimensionStandardConfig extends ImageDimensionConfig {
  readonly width: number;
  readonly height: number;
  readonly exactFit: boolean;
}
