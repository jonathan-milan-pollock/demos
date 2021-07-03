import { Location } from './location.interface';

export interface PhotoOfTheWeekUpdate {
  readonly group: string;
  readonly slug: string;
  readonly title?: string;
  readonly description?: string;
  readonly keywords: string[];
  readonly datePublished?: string;
  readonly location?: Location;
  readonly useTileImage: boolean;
  readonly text: string[];
}
