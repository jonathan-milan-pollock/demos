import { Location } from './location.interface';
import { Image } from './image.interface';

export interface PhotoOfTheWeek {
  readonly id?: string;
  readonly group: string;
  readonly slug: string;
  readonly order: number;
  readonly title?: string;
  readonly description?: string;
  readonly seoKeywords: string[];
  readonly datePublished?: string;
  readonly location?: Location;
  readonly starredImageIsCentered: boolean;
  readonly text: string[];
  readonly images: Image[];
  readonly isPublic: boolean;
}
