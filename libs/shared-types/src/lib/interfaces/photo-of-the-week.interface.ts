import { Identifier } from './identifier.interface';
import { DocumentMetadata } from './document-metadata.interface';
import { Location } from './location.interface';
import { Display } from './display.interface';
import { Image } from './image.interface';

export interface PhotoOfTheWeek {
  readonly identifier: Identifier;
  readonly metadata: DocumentMetadata;
  readonly location: Location;
  readonly display: Display;
  readonly content: {
    readonly image?: Image;
  };
}
