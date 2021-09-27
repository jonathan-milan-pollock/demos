import { ImageState } from '../enums/image-state.enum';

export interface Media {
  readonly id: string;
  readonly state: ImageState;
  readonly blobPathId: string;
  readonly fileName: string;
  readonly entityId: string;
}
