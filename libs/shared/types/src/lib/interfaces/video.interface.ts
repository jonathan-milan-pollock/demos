import { MediaState } from '../enums/media-state.enum';
import { ThreeSixtySettings } from './three-sixty-settings.interface';

export interface Video {
  readonly id: string;
  readonly entityId: string;
  readonly fileName: string;
  readonly state: MediaState;
  readonly order: number;
  readonly isStarred: boolean;
  readonly title?: string;
  readonly description?: string;
  readonly keywords?: string;
  readonly dateCreated?: string;
  readonly datePublished?: string;
  readonly isThreeSixty: boolean;
  readonly threeSixtySettings?: ThreeSixtySettings;
  readonly coverImageId?: string;
  readonly hlsUrl?: string;
  readonly isFlyOver: boolean;
  readonly isUploaded: boolean;
  readonly isGenerated: boolean;
  readonly isProcessing: boolean;
}
