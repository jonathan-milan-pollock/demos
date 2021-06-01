import { DocumentType } from '../types/document.type';
import { ReadableDate } from './readable-date.interface';
import { Image } from './image.interface';
import { ThreeSixtyImage } from './three-sixty-image.interface';
import { Video } from './video.interface';

export interface BestOfNature {
  readonly id: string;
  readonly type: DocumentType;
  // identifier
  readonly slug: string;
  // metadata
  readonly title: string;
  readonly description: string;
  readonly keywords: ReadonlyArray<string>;
  readonly dateCreated?: ReadableDate;
  readonly datePublished?: ReadableDate;
  // content
  readonly images: ReadonlyArray<Image>;
  readonly threeSixtyImages: ReadonlyArray<ThreeSixtyImage>;
  readonly videos: ReadonlyArray<Video>;
}
