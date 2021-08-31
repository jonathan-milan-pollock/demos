import { Image } from './image.interface';
import { ImageDimension } from './image-dimension.interface';
import { Emotion } from './emotion.interface';
import { Comment } from './comment.interface';

export interface Favorites {
  readonly id?: string;
  readonly slug: string;
  readonly images: Image[];
  readonly imageDimensions: ImageDimension[];
  readonly comments: Comment[];
  readonly emotions: Emotion[];
}
