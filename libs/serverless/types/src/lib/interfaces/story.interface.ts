import { Location } from './location.interface';
import { ReadableDate } from './readable-date.interface';

export interface Story {
  readonly slug: string;
  readonly name: string;
  readonly location: Location;
  readonly keywords: ReadonlySet<string>;
  readonly eventDate: ReadableDate;
}
