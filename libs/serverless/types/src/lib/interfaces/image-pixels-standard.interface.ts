import { ImagePixels } from './image-pixels.interface';

export interface ImagePixelsStandard extends ImagePixels {
  readonly width: number;
  readonly height: number;
  readonly exactFit: boolean;
}
