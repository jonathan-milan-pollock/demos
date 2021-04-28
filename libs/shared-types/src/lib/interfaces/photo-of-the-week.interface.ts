import { Location } from './location.interface';
import { ReadableDate } from './readable-date.interface';

export interface PhotoOfTheWeek {
  readonly slug: string;
  readonly name: string;
  readonly location: Location;
  readonly keywords: Set<string>;
  readonly publishDate?: ReadableDate;
  readonly useTitleImage: boolean;
  readonly isPosted: boolean;
}
