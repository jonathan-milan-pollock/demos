import { MediaState } from '../enums/media-state.enum';

export interface Video {
  readonly id: string;
  readonly entityId: string;
  readonly fileName: string;
  readonly state: MediaState;
  readonly order: number;
  readonly isStared: boolean; //TODO: Can star 1
  readonly title?: string;
  readonly description?: string;
  readonly keywords?: string;
  readonly dateCreated: string;
  readonly datePublished?: string;
  readonly coverImageId?: string;
  readonly hlsStreamingUrl?: string;
  readonly isFlyOver: boolean;
  readonly isGenerated: boolean;
}
