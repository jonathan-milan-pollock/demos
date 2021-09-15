import { Image } from './image.interface';
import { ImageDimension } from './image-dimension.interface';
import { Comment } from './comment.interface';
import { Emotion } from './emotion.interface';

export interface PublicContent {
  readonly images: Image[];
  readonly imageDimensions: ImageDimension[];
  readonly comments: Comment[];
  readonly emotions: Emotion[];
}
