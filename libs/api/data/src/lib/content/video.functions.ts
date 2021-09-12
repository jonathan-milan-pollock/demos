import { Video } from '@dark-rush-photography/shared/types';

export const loadVideo = (video: Video): Video => {
  return {
    id: video.id,
    entityId: video.entityId,
    state: video.state,
    blobPathId: video.blobPathId,
    fileName: video.fileName,
  };
};
