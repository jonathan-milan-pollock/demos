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
    settings: videoDimension.settings,
  };
};

export const findPublicVideoDimensions = (
  publicVideoIds: string[],
  videoDimensions: VideoDimension[]
): VideoDimension[] => {
  return videoDimensions
    .filter((vd) => publicVideoIds.includes(vd.id))
    .map((vd) => toVideoDimension(vd));
};
