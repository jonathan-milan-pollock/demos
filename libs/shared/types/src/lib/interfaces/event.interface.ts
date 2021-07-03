import { Location } from './location.interface';
import { Image } from './image.interface';
import { ImageDimension } from './image-dimension.interface';
import { Video } from './video.interface';
import { VideoDimension } from './video-dimension.interface';
import { Emotion } from './emotion.interface';
import { Comment } from './comment.interface';

export interface Event {
  readonly id?: string;
  readonly group: string;
  readonly slug: string;
  readonly isPublic: boolean;
  readonly title?: string;
  readonly description?: string;
  readonly keywords: string[];
  readonly dateCreated?: string;
  readonly datePublished?: string;
  readonly location?: Location;
  readonly useTileImage: boolean;
  readonly text: string[];
  readonly images: Image[];
  readonly imageDimensions: ImageDimension[];
  readonly videos: Video[];
  readonly videoDimensions: VideoDimension[];
  readonly comments: Comment[];
  readonly emotions: Emotion[];
}
