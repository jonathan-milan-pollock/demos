import { Image } from './image.interface';
import { ImageDimension } from './image-dimension.interface';
import { Video } from './video.interface';
import { VideoDimension } from './video-dimension.interface';

export interface About {
  readonly id?: string;
  readonly slug: string;
  readonly order: number;
  readonly images: Image[];
  readonly imageDimensions: ImageDimension[];
  readonly videos: Video[];
  readonly videoDimensions: VideoDimension[];
}
