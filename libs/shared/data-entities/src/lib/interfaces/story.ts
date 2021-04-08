import { Location } from '../interfaces/location';
import { ReadableDate } from './readable-date';

export interface Story {
  readonly slug: string;
  readonly name: string;
  readonly location: Location;
  readonly keywords: ReadonlySet<string>;
  readonly eventDate: ReadableDate;
}
