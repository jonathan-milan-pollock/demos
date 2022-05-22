import { ImageDimension } from './image-dimension.interface';
import { Dimension } from './dimension.interface';

export interface ImageDimensionStandard extends ImageDimension {
  readonly dimension: Dimension;
  readonly exactFit: boolean;
}
