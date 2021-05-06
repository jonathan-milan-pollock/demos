import { ReadableDate } from './readable-date.interface';
import { Location } from './location.interface';
import { Image } from './image.interface';
import { ThreeSixtyImage } from './three-sixty-image.interface';
import { Video } from './video.interface';

export interface Destination {
  // identifier
  readonly slug: string;
  readonly group: number;
  // metadata
  readonly title: string;
  readonly description: string;
  readonly keywords: ReadonlySet<string>;
  readonly dateCreated?: ReadableDate;
  readonly datePublished?: ReadableDate;
  // location
  readonly location: Location;
  // display
  readonly useTitleImage: boolean;
  // content
  readonly text: string[];
  readonly images?: ReadonlySet<Image>;
  readonly threeSixtyImages?: ReadonlySet<ThreeSixtyImage>;
  readonly videos?: ReadonlySet<Video>;
}
