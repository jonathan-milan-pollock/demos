import { VideoDimension } from '@dark-rush-photography/shared/types';

export const findPublicVideoDimensions = (
  videoDimensions: VideoDimension[],
  publicVideoIds: string[]
): VideoDimension[] => {
  return videoDimensions
    .filter((videoDimension) => publicVideoIds.includes(videoDimension.videoId))
    .map((videoDimension) => loadVideoDimension(videoDimension));
};

export const loadVideoDimension = (
  videoDimension: VideoDimension
): VideoDimension => {
  return {
    id: videoDimension.id,
    entityId: videoDimension.entityId,
    videoId: videoDimension.videoId,
    type: videoDimension.type,
    resolution: videoDimension.resolution,
  };
};
