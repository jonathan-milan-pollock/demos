import { Image } from './image.interface';
import { ImageDimension } from './image-dimension.interface';
import { Video } from './video.interface';
import { VideoDimension } from './video-dimension.interface';
import { Emotion } from './emotion.interface';
import { Comment } from './comment.interface';

export interface Favorites {
  readonly id?: string;
  readonly slug: string;
  readonly images: Image[];
  readonly imageDimensions: ImageDimension[];
  readonly videos: Video[];
  readonly videoDimensions: VideoDimension[];
  readonly comments: Comment[];
  readonly emotions: Emotion[];
}
