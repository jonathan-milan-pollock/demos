import { Location } from './location.interface';
import { Image } from './image.interface';

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
  readonly starredImageIsCentered: boolean;
  readonly text: string[];
  readonly images: Image[];
  readonly isPublic: boolean;
}
