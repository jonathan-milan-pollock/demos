import { Image } from './image.interface';
import { ImageDimension } from './image-dimension.interface';

export interface SharedPhotoAlbum {
  readonly id?: string;
  readonly slug: string;
  readonly images: Image[];
  readonly imageDimensions: ImageDimension[];
}
