import { Image } from './image.interface';
import { Comment } from './comment.interface';
import { Emotion } from './emotion.interface';

export interface Destination {
  readonly id?: string;
  readonly slug: string;
  readonly images: Image[];
  readonly comments: Comment[];
  readonly emotions: Emotion[];
}
