import { MediaState } from '../enums/media-state.enum';

export interface Video {
  readonly id: string;
  readonly entityId: string;
  readonly fileName: string;
  readonly state: MediaState;
}
