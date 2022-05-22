import { EventDate } from './event-date.interface';
import { Location } from './location.interface';

export interface PhotoOfTheWeek {
  isPosted: boolean;
  useTileImage: boolean;
  pathname: string;
  name: string;
  descriptionParagraphs: string[];
  eventDate?: EventDate;
  location: Location;
  keywords: string[];
}
