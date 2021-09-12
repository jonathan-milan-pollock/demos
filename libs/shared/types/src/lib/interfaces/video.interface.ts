import { MediaState } from '../enums/media-state.enum';

export interface Video {
  readonly id: string;
  readonly entityId: string;
  readonly state: MediaState;
  readonly blobPathId: string;
  readonly fileName: string;
}
