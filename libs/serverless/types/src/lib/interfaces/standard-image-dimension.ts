import { ImageDimension } from './image-dimension.interface';

export interface StandardImageDimension extends ImageDimension {
  readonly width: number;
  readonly height: number;
  readonly exactFit: boolean;
}
