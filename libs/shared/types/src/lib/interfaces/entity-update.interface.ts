import { Location } from './location.interface';
import { Dimension } from './dimension.interface';

export interface EntityUpdate {
  readonly isPublic: boolean;
  readonly title?: string;
  readonly text?: string;
  readonly createdDate?: string;
  readonly publishedDate?: string;
  readonly seoDescription?: string;
  readonly seoKeywords: string[];
  readonly location?: Location;
  readonly starredImageIsCentered: boolean;
  readonly tileDimension?: Dimension;
}
