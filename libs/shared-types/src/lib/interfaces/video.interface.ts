import { PostState } from '../enums/post-state.enum';

export interface Video {
  readonly id: string;
  readonly entityId: string;
  readonly fileName: string;
  readonly postState: PostState;
  readonly order: number;
  readonly isStared: boolean; //TODO: Can star 1
  readonly title?: string;
  readonly description?: string;
  readonly keywords?: string;
  readonly dateCreated: string;
  readonly datePublished?: string;
  readonly imageId: string;
  readonly hasTrack: boolean;
  readonly isFlyOver: boolean;
}
