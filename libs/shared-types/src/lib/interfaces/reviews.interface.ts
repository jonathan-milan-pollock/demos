import { Image } from './image.interface';
import { Video } from './video.interface';

export interface Reviews {
  readonly id?: string;
  // content
  readonly images: ReadonlyArray<Image>;
  readonly videos: ReadonlyArray<Video>;
}
