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
  readonly order: number;
  readonly title?: string;
  readonly description?: string;
  readonly keywords: string[];
  readonly datePublished?: string;
  readonly location?: Location;
  readonly useTileImage: boolean;
  readonly text: string[];
  readonly images: Image[];
  readonly imageDimensions: ImageDimension[];
  readonly comments: Comment[];
  readonly emotions: Emotion[];
}
