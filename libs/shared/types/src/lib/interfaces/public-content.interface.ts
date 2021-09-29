import { Image } from './image.interface';
import { ImageDimension } from './image-dimension.interface';

export interface PublicContent {
  readonly images: Image[];
  readonly imageDimensions: ImageDimension[];
}
