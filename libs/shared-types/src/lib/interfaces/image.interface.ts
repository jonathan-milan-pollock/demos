import { PostedState } from '../enums/posted-state.enum';

export interface Image {
  readonly id: string;
  readonly entityId: string;
  readonly slug: string;
  readonly state: PostedState;
  readonly order: number;
  readonly isStared: boolean; //TODO: Can star 1
  readonly isLoved: boolean; //TODO: Can love 5
  readonly isLiked: boolean; //TODO: Can like 5
  readonly title?: string;
  readonly description?: string;
  readonly keywords?: string;
  readonly dateCreated: string;
  readonly datePublished?: string;
}
