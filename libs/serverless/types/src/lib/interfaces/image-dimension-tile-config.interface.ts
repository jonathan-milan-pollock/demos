import { ImageDimensionConfig } from './image-dimension-config.interface';

export interface ImageDimensionTileConfig extends ImageDimensionConfig {
  readonly minWidth: number;
  readonly minHeight: number;
  readonly longestEdge: number;
}
