import { MediaState } from '../enums/media-state.enum';

export interface ImageUpdate {
  readonly fileName: string;
  readonly state: MediaState;
  readonly order: number;
  readonly isStared: boolean;
  readonly isLoved: boolean;
  readonly title?: string;
  readonly description?: string;
  readonly keywords?: string;
  readonly datePublished?: string;
}
