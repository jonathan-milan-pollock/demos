import { ReadableDate } from './readable-date.interface';
import { Location } from './location.interface';
import { Image } from './image.interface';
import { ThreeSixtyImage } from './three-sixty-image.interface';
import { Video } from './video.interface';

export interface Event {
  readonly id: string;
  // identifier
  readonly slug: string;
  readonly group: number;
  // metadata
  readonly title: string;
  readonly description: string;
  readonly keywords: ReadonlyArray<string>;
  readonly dateCreated?: ReadableDate;
  readonly datePublished?: ReadableDate;
  // location
  readonly location: Location;
  // display
  readonly useTitleImage: boolean;
  // content
  readonly text: ReadonlyArray<string>;
  readonly images: ReadonlyArray<Image>;
  readonly threeSixtyImages: ReadonlyArray<ThreeSixtyImage>;
  readonly videos: ReadonlyArray<Video>;
}
