import { ImageDimension } from './image-dimension.interface';

export interface LongestEdgeImageDimension extends ImageDimension {
  readonly longestEdge: number;
}
