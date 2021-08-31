import { Image } from './image.interface';
import { ImageDimension } from './image-dimension.interface';

export interface ReviewMedia {
  readonly id?: string;
  readonly images: Image[];
  readonly imageDimensions: ImageDimension[];
}
