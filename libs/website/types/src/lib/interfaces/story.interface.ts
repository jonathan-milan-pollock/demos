import { Location } from './location.interface';
import { EventDate } from './event-date.interface';
import { ImageDimension } from './image-dimension.interface';

export interface Story {
  readonly isPosted: boolean;
  readonly useTileImage: boolean;
  readonly pathname: string;
  readonly name: string;
  readonly descriptionParagraphs: string[];
  readonly eventDate: EventDate;
  readonly location: Location;
  readonly keywords: string[];
  readonly images: ImageDimension[];
  readonly threeSixtyImages: ImageDimension[];
  readonly youTubeVideos: string[];
}
