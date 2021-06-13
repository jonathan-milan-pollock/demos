import { ImageDimension } from './image-dimension.interface';
import { Image } from './image.interface';
import { VideoDimension } from './video-dimension.interface';
import { Video } from './video.interface';

export interface Reviews {
  readonly id?: string;
  // content
  readonly images: ReadonlyArray<Image>;
  readonly imageDimensions: ReadonlyArray<ImageDimension>;
  readonly videos: ReadonlyArray<Video>;
  readonly videoDimensions: ReadonlyArray<VideoDimension>;
}
