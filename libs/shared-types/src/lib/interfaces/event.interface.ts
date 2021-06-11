import { Location } from './location.interface';
import { Image } from './image.interface';
import { Video } from './video.interface';
import { Emotion } from './emotion.interface';
import { Comment } from './comment.interface';

export interface Event {
  readonly id?: string;
  // identifier
  readonly slug: string;
  readonly group: number;
  // metadata
  readonly title?: string;
  readonly description?: string;
  readonly keywords?: ReadonlyArray<string>;
  readonly dateCreated?: string;
  readonly datePublished?: string;
  // location
  readonly location?: Location;
  // display
  readonly useTitleImage: boolean;
  // content
  readonly text: ReadonlyArray<string>;
  readonly images: ReadonlyArray<Image>;
  readonly videos: ReadonlyArray<Video>;
  readonly emotions: ReadonlyArray<Emotion>;
  readonly comments: ReadonlyArray<Comment>;
}
