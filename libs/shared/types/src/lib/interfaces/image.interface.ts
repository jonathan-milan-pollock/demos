import { MediaState } from '../enums/media-state.enum';

export interface Image {
  readonly id: string;
  readonly entityId: string;
  readonly state: MediaState;
  readonly blobPathId: string;
  readonly fileName: string;
  readonly order: number;
  readonly isStarred: boolean;
  readonly isLoved: boolean;
  readonly title?: string;
  readonly seoDescription?: string;
  readonly seoKeywords?: string;
  readonly dateCreated?: string;
  readonly datePublished?: string;
  readonly skipExif: boolean;
  readonly isThreeSixty: boolean;
}
