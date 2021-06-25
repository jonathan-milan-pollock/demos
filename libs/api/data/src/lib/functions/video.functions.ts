import { PostedState, Video } from '@dark-rush-photography/shared-types';

export const toVideo = (video: Video): Video => {
  return {
    id: video.id,
    entityId: video.entityId,
    slug: video.slug,
    state: video.state,
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
    .filter((v) => v.state === PostedState.Public)
    .map((v) => toVideo(v));
};
