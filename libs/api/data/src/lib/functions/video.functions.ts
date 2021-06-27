import { PostState, Video } from '@dark-rush-photography/shared-types';

export const toVideo = (video: Video): Video => {
  return {
    id: video.id,
    entityId: video.entityId,
    fileName: video.fileName,
    postState: video.postState,
    order: video.order,
    isStared: video.isStared,
    title: video.title,
    description: video.description,
    keywords: video.keywords,
    dateCreated: video.dateCreated,
    datePublished: video.datePublished,
    imageId: video.imageId,
    hasTrack: video.hasTrack,
    isFlyOver: video.isFlyOver,
  };
};

export const findPublicVideos = (videos: Video[]): Video[] => {
  return videos
    .filter((v) => v.postState === PostState.Public)
    .map((v) => toVideo(v));
};
