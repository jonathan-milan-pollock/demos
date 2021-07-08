import { ImageResolution } from './image-resolution.interface';

export interface LongestEdgeImageResolution extends ImageResolution {
  readonly longestEdge: number;
}
