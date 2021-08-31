import { Location } from './location.interface';
import { Image } from './image.interface';
import { ImageDimension } from './image-dimension.interface';
import { Comment } from './comment.interface';
import { Emotion } from './emotion.interface';

export interface PhotoOfTheWeek {
  readonly id?: string;
  readonly group: string;
  readonly slug: string;
  readonly order: number;
  readonly seoTitle?: string;
  readonly description?: string;
  readonly seoKeywords: string[];
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
