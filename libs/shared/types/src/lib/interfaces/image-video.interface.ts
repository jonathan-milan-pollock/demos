import { Image } from './image.interface';
import { Video } from './video.interface';

export interface ImageVideo {
  readonly id?: string;
  readonly title?: string;
  readonly text: string[];
  readonly images: Image[];
  readonly videos: Video[];
}
