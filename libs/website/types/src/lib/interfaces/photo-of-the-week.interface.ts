import { Location } from './location.interface';
import { EventDate } from './event-date.interface';

export interface PhotoOfTheWeek {
  readonly isPosted: boolean;
  readonly useTileImage: boolean;
  readonly pathname: string;
  readonly name: string;
  readonly descriptionParagraphs: string[];
  readonly eventDate?: EventDate;
  readonly location: Location;
  readonly keywords: string[];
}
