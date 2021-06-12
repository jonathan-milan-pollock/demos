import { Image } from './image.interface';
import { Video } from './video.interface';

export interface About {
  readonly id?: string;
  readonly slug: string;
  readonly images: ReadonlyArray<Image>;
  readonly videos: ReadonlyArray<Video>;
}
