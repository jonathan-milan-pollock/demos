import { Image } from './image.interface';
import { ImageDimension } from './image-dimension.interface';

export interface SocialMedia {
  readonly id?: string;
  readonly group: string;
  readonly slug: string;
  readonly images: Image[];
  readonly imageDimensions: ImageDimension[];
}
