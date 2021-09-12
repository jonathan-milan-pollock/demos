import { MediaState } from '../enums/media-state.enum';

export interface Media {
  readonly id: string;
  readonly state: MediaState;
  readonly blobPathId: string;
  readonly fileName: string;
  readonly entityId: string;
}
