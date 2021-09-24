import { Image } from './image.interface';
import { ImageDimension } from './image-dimension.interface';
import { WatermarkedType } from '../..';

export interface SharedPhotoAlbum {
  readonly id?: string;
  readonly watermarkedType: WatermarkedType;
  readonly group: string;
  readonly slug: string;
  readonly images: Image[];
  readonly imageDimensions: ImageDimension[];
}
