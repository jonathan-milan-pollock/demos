import { Location } from './location.interface';
import { Image } from './image.interface';
import { ImageDimension } from './image-dimension.interface';
import { Video } from './video.interface';
import { VideoDimension } from './video-dimension.interface';
import { Comment } from './comment.interface';
import { Emotion } from './emotion.interface';

export interface PhotoOfTheWeek {
  readonly id?: string;
  // identifier
  readonly slug: string;
  readonly group: number;
  readonly isPublic: boolean;
  // metadata
  readonly title?: string;
  readonly description?: string;
  readonly keywords: ReadonlyArray<string>;
  readonly datePublished?: string;
  // location
  readonly location?: Location;
  // display
  readonly useTitleImage: boolean;
  // content
  readonly text: ReadonlyArray<string>;
  readonly images: ReadonlyArray<Image>;
  readonly imageDimensions: ReadonlyArray<ImageDimension>;
  readonly videos: ReadonlyArray<Video>;
  readonly videoDimensions: ReadonlyArray<VideoDimension>;
  readonly comments: ReadonlyArray<Comment>;
  readonly emotions: ReadonlyArray<Emotion>;
}
