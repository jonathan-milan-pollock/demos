import { ImageDimension } from './image-dimension.interface';

export interface ImageDimensionLongestEdge extends ImageDimension {
  readonly longestEdge: number;
}
