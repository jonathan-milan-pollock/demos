import { MediaState } from '../enums/media-state.enum';

export interface VideoUpdate {
  readonly fileName?: string;
  readonly state: MediaState;
  readonly order: number;
  readonly isStared: boolean;
  readonly title?: string;
  readonly description?: string;
  readonly keywords?: string;
  readonly datePublished?: string;
  readonly coverImageId?: string;
  readonly hlsUrl?: string;
  readonly isFlyOver: boolean;
}
