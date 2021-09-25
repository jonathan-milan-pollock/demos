import { Image } from './image.interface';
import { ImageDimension } from './image-dimension.interface';

export interface ImagePost {
  readonly id?: string;
  readonly title?: string;
  readonly text: string[];
  readonly images: Image[];
  readonly imageDimensions: ImageDimension[];
}
