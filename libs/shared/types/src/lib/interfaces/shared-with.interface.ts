import { Image } from './image.interface';
import { ImageDimension } from './image-dimension.interface';

export interface SharedWith {
  readonly id?: string;
  readonly slug: string;
  readonly order: number;
  readonly images: Image[];
  readonly imageDimensions: ImageDimension[];
}
