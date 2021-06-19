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
  readonly keywords: ReadonlyArray<string>;
  readonly dateCreated?: string;
  readonly datePublished?: string;
  readonly location?: Location;
  readonly useTileImage: boolean;
  readonly text: ReadonlyArray<string>;
  readonly images: ReadonlyArray<Image>;
  readonly imageDimensions: ReadonlyArray<ImageDimension>;
  readonly videos: ReadonlyArray<Video>;
  readonly videoDimensions: ReadonlyArray<VideoDimension>;
  readonly comments: ReadonlyArray<Comment>;
  readonly emotions: ReadonlyArray<Emotion>;
}
