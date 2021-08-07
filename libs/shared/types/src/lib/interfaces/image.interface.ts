import { MediaState } from '../enums/media-state.enum';

export interface Image {
  //TODO: Should this be nullable?
  readonly id: string;
  readonly entityId: string;
  readonly fileName: string;
  readonly state: MediaState;
  readonly order: number;
  readonly isStarred: boolean;
  readonly isLoved: boolean;
  readonly title?: string;
  // TODO: description needs to be non nullable
  readonly description?: string;
  readonly keywords?: string;
  readonly dateCreated?: string;
  readonly datePublished?: string;
  readonly isThreeSixty: boolean;
  readonly skipExif: boolean;
  readonly isGenerated: boolean;
  readonly isProcessing: boolean;
}
