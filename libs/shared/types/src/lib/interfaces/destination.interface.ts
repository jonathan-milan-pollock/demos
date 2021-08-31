import { Location } from './location.interface';
import { Image } from './image.interface';
import { ImageDimension } from './image-dimension.interface';
import { Comment } from './comment.interface';
import { Emotion } from './emotion.interface';

export interface Destination {
  readonly id?: string;
  readonly slug: string;
  readonly order: number;
  readonly seoTitle?: string;
  readonly description?: string;
  readonly seoKeywords: string[];
  readonly location?: Location;
  readonly text: string[];
  readonly images: Image[];
  readonly imageDimensions: ImageDimension[];
  readonly comments: Comment[];
  readonly emotions: Emotion[];
  readonly isPosted: boolean;
}
