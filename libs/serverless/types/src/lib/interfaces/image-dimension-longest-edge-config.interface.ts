import { ImageDimensionConfig } from './image-dimension-config.interface';

export interface ImageDimensionLongestEdgeConfig extends ImageDimensionConfig {
  readonly longestEdge: number;
}
