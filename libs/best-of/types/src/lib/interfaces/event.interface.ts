import { EventDate } from './event-date.interface';
import { Location } from './location.interface';
import { ImageDimension } from './image-dimension.interface';

export interface Event {
  isPosted: boolean;
  useTileImage: boolean;
  pathname: string;
  name: string;
  descriptionParagraphs: string[];
  eventDate: EventDate;
  location: Location;
  keywords: string[];
  images: ImageDimension[];
  threeSixtyImages: ImageDimension[];
  youTubeVideos: string[];
}
