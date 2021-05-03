import { Identifier } from './identifier.interface';
import { DocumentMetadata } from './document-metadata.interface';
import { Location } from './location.interface';
import { Display } from './display.interface';
import { Image } from './image.interface';
import { ThreeSixtyImage } from './three-sixty-image.interface';
import { Video } from './video.interface';

export interface Event {
  readonly identifier: Identifier;
  readonly metadata: DocumentMetadata;
  readonly location: Location;
  readonly display: Display;
  readonly content: {
    readonly text: string[];
    readonly images?: ReadonlySet<Image>;
    readonly threeSixtyImages?: ReadonlySet<ThreeSixtyImage>;
    readonly videos?: ReadonlySet<Video>;
  };
}
