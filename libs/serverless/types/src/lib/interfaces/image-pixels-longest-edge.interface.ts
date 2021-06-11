import { ImagePixels } from './image-pixels.interface';

export interface ImagePixelsLongestEdge extends ImagePixels {
  readonly longestEdge: number;
}
