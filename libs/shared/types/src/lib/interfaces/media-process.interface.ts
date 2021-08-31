import { Image } from './image.interface';
import { ImageDimension } from './image-dimension.interface';
import { Video } from './video.interface';

export interface MediaProcess {
  readonly id?: string;
  readonly slug: string;
  readonly images: Image[];
  readonly imageDimensions: ImageDimension[];
  readonly videos: Video[];
}
