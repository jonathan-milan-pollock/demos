import { Location } from './location.interface';
import { Image } from './image.interface';
import { ImageDimension } from './image-dimension.interface';
import { Emotion } from './emotion.interface';
import { Comment } from './comment.interface';

export interface Event {
  readonly id?: string;
  readonly group: string;
  readonly slug: string;
  readonly order: number;
  readonly title?: string;
  readonly seoDescription?: string;
  readonly seoKeywords: string[];
  readonly dateCreated?: string;
  readonly datePublished?: string;
  readonly location?: Location;
  readonly tileImageIsCentered: boolean;
  readonly text: string[];
  readonly images: Image[];
  readonly imageDimensions: ImageDimension[];
  readonly comments: Comment[];
  readonly emotions: Emotion[];
  readonly isPosted: boolean;
}
