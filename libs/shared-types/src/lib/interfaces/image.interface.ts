import { PostState } from '../enums/post-state.enum';

export interface Image {
  readonly id: string;
  readonly entityId: string;
  readonly fileName: string;
  readonly postState: PostState;
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
