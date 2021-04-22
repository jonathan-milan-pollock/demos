import { ImageDimension } from '../interfaces/image-dimension.interface';

export interface ImageDimensions {
  readonly thumbnailImageDimension: ImageDimension;
  readonly tileImageDimension: ImageDimension;
  readonly smallImageDimension: ImageDimension;
  readonly mediumImageDimension: ImageDimension;
}
