import { MediaState, Video } from '@dark-rush-photography/shared/types';

export const toVideo = (video: Video): Video => {
  return {
    id: video.id,
    entityId: video.entityId,
    fileName: video.fileName,
    state: video.state,
    order: video.order,
    isStared: video.isStared,
    title: video.title,
    description: video.description,
    keywords: video.keywords,
    dateCreated: video.dateCreated,
    datePublished: video.datePublished,
    coverImageId: video.coverImageId,
    hlsStreamingUrl: video.hlsStreamingUrl,
    isFlyOver: video.isFlyOver,
    isGenerated: video.isGenerated,
  };
};

export const findPublicVideos = (videos: Video[]): Video[] => {
  return videos
    .filter((v) => v.state == MediaState.Public)
    .map((v) => toVideo(v));
};
