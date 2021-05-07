import { Image } from './image.interface';
import { ReadableDate } from './readable-date.interface';
import { Location } from './location.interface';

export interface PhotoOfTheWeek {
  readonly id: string;
  // identifier
  readonly slug: string;
  readonly group: number;
  // metadata
  readonly title: string;
  readonly description: string;
  readonly keywords: ReadonlyArray<string>;
  readonly datePublished?: ReadableDate;
  // location
  readonly location: Location;
  // display
  readonly useTitleImage: boolean;
  // content
  readonly text: ReadonlyArray<string>;
  readonly image?: Image;
}
