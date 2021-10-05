import { ImageDimension } from './image-dimension.interface';
import { Resolution } from './resolution.interface';

export interface ImageDimensionStandard extends ImageDimension {
  readonly resolution: Resolution;
  readonly exactFit: boolean;
}
