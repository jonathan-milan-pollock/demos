import { ReadableDate } from './readable-date.interface';
import { Location } from './location.interface';
import { Image } from './image.interface';
import { ThreeSixtyImage } from './three-sixty-image.interface';
import { Video } from './video.interface';
import { Flyover } from './flyover.interface';
import { ExtendedReality } from './extended-reality.interface';
import { SocialMedia } from './social-media.interface';

export interface Destination {
  readonly id: string;
  // identifier
  readonly slug: string;
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
  readonly images: ReadonlyArray<Image>;
  readonly threeSixtyImages: ReadonlyArray<ThreeSixtyImage>;
  readonly videos: ReadonlyArray<Video>;
  readonly flyOver?: Flyover;
  readonly extendedReality?: ExtendedReality;
  readonly socialMedia: ReadonlyArray<SocialMedia>;
  readonly destinations: ReadonlyArray<Destination>;
}
