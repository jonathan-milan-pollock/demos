import { Image } from './image.interface';
import { ImageDimension } from './image-dimension.interface';
import { Comment } from './comment.interface';
import { Emotion } from './emotion.interface';

export interface BestOf {
  readonly id?: string;
  readonly slug: string;
  readonly images: ReadonlyArray<Image>;
  readonly imageDimensions: ReadonlyArray<ImageDimension>;
  readonly comments: ReadonlyArray<Comment>;
  readonly emotions: ReadonlyArray<Emotion>;
}
