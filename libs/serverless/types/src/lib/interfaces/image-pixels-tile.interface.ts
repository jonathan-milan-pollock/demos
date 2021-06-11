import { ImagePixels } from './image-pixels.interface';

export interface ImagePixelsTile extends ImagePixels {
  readonly minWidth: number;
  readonly minHeight: number;
  readonly longestEdge: number;
}
