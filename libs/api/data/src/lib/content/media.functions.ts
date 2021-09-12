import { MediaState } from '@dark-rush-photography/shared/types';
import { Media } from '@dark-rush-photography/shared/types';

export const loadMedia = (
  id: string,
  entityId: string,
  state: MediaState,
  blobPathId: string,
  fileName: string
): Media => ({
  id,
  entityId,
  state,
  blobPathId,
  fileName,
});
