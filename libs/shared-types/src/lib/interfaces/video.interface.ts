import { PostedState } from '../enums/posted-state.enum';
import { Emotion } from './emotion.interface';
import { Comment } from './comment.interface';

export interface Video {
  readonly entityId: string;
  readonly slug: string;
  readonly state: PostedState;
  readonly order: number;
  readonly isStared: boolean; //TODO: Can star 1
  // metadata
  readonly title?: string;
  readonly description?: string;
  readonly keywords: ReadonlyArray<string>;
  readonly dateCreated?: string;
  readonly datePublished?: string;
  // content
  readonly titleTrackPath?: string;
  readonly emotions: ReadonlyArray<Emotion>;
  readonly comments: ReadonlyArray<Comment>;
}
