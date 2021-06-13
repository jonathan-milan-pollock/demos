import { PostedState } from '../enums/posted-state.enum';

export interface Video {
  readonly entityId: string;
  readonly slug: string;
  readonly state: PostedState;
  readonly order: number;
  readonly isStared: boolean; //TODO: Can star 1
  // metadata
  readonly title?: string;
  readonly description?: string;
  readonly keywords: string;
  readonly dateCreated: string;
  readonly datePublished?: string;
}
