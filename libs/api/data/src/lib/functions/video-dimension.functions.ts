import { VideoDimension } from '@dark-rush-photography/shared-types';

export const toVideoDimension = (
  videoDimension: VideoDimension
): VideoDimension => {
  return {
    id: videoDimension.id,
    entityId: videoDimension.entityId,
    videoId: videoDimension.videoId,
    type: videoDimension.type,
    state: videoDimension.state,
    pixels: videoDimension.pixels,
  };
};

export const findPublicVideoDimensions = (
  videoDimensions: VideoDimension[],
  publicVideoIds: string[]
): VideoDimension[] => {
  return videoDimensions
    .filter((vd) => publicVideoIds.includes(vd.videoId))
    .map((vd) => toVideoDimension(vd));
};
