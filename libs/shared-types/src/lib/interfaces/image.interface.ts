import { ImageDimension } from './image-dimension.interface';
import { Emotion } from './emotion.interface';
import { Comment } from './comment.interface';
import { ImageState } from '../enums/image-state.enum';

export interface Image {
  // identifier
  readonly slug: string;
  readonly state: ImageState;
  readonly order: number;
  readonly isStared: boolean; //TODO: Can star 1
  readonly isLoved: boolean; //TODO: Can love 5
  readonly isLiked: boolean; //TODO: Can like 5
  // metadata
  readonly title?: string;
  readonly description?: string;
  readonly keywords: ReadonlyArray<string>;
  readonly dateCreated?: string;
  readonly datePublished?: string;
  // content
  readonly imageDimensions: ReadonlyArray<ImageDimension>;
  readonly emotions: ReadonlyArray<Emotion>;
  readonly comments: ReadonlyArray<Comment>;
}
