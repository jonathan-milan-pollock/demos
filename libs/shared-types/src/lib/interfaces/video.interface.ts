import { Emotion } from './emotion.interface';
import { Comment } from './comment.interface';

export interface Video {
  readonly slug: string;
  readonly order: number;
  readonly isStared: boolean; //TODO: Can star 1
  readonly titleTrackPath?: string;
  // metadata
  readonly title?: string;
  readonly description?: string;
  readonly keywords: ReadonlyArray<string>;
  readonly dateCreated?: string;
  readonly datePublished?: string;
  // content
  readonly emotions: ReadonlyArray<Emotion>;
  readonly comments: ReadonlyArray<Comment>;
}
