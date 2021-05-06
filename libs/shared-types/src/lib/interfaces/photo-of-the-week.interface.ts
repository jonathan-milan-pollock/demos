import { Image } from './image.interface';
import { ReadableDate } from './readable-date.interface';
import { Location } from './location.interface';

export interface PhotoOfTheWeek {
  // identifier
  readonly slug: string;
  readonly group: number;
  // metadata
  readonly title: string;
  readonly description: string;
  readonly keywords: ReadonlySet<string>;
  readonly datePublished?: ReadableDate;
  // location
  readonly location: Location;
  // display
  readonly useTitleImage: boolean;
  // content
  readonly text: string[];
  readonly image?: Image;
}
