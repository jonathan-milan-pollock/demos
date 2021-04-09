import { Location } from '../interfaces/location';
import { ReadableDate } from './readable-date';

export interface PhotoOfTheWeek {
  readonly slug: string;
  readonly name: string;
  readonly location: Location;
  readonly keywords: Set<string>;
  readonly publishDate?: ReadableDate;
}
