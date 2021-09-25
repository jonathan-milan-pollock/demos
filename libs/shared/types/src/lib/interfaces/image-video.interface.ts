import { Image } from './image.interface';
import { ImageDimension } from './image-dimension.interface';
import { Video } from './video.interface';

export interface ImageVideo {
  readonly id?: string;
  readonly title?: string;
  readonly text: string[];
  readonly images: Image[];
  readonly imageDimensions: ImageDimension[];
  readonly videos: Video[];
}
