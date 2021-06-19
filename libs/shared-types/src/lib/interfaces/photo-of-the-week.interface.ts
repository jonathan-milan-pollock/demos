import { Location } from './location.interface';
import { Image } from './image.interface';
import { ImageDimension } from './image-dimension.interface';
import { Comment } from './comment.interface';
import { Emotion } from './emotion.interface';

export interface PhotoOfTheWeek {
  readonly id?: string;
  readonly group: string;
  readonly slug: string;
  readonly isPublic: boolean;
  readonly title?: string;
  readonly description?: string;
  readonly keywords: ReadonlyArray<string>;
  readonly datePublished?: string;
  readonly location?: Location;
  readonly useTileImage: boolean;
  readonly text: ReadonlyArray<string>;
  readonly images: ReadonlyArray<Image>;
  readonly imageDimensions: ReadonlyArray<ImageDimension>;
  readonly comments: ReadonlyArray<Comment>;
  readonly emotions: ReadonlyArray<Emotion>;
}
