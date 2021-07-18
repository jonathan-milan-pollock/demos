import { PublicContent } from '@dark-rush-photography/api/types';
import {
  MediaState,
  Video,
  VideoDto,
  VideoMinimalDto,
} from '@dark-rush-photography/shared/types';
import { findMediaComments } from './comment.functions';
import { findMediaEmotions } from './emotion.functions';

export const findPublicVideos = (videos: Video[]): Video[] => {
  return videos
    .filter((video) => video.state == MediaState.Public)
    .map(loadVideo);
};

export const loadVideo = (video: Video): Video => {
  return {
    id: video.id,
    entityId: video.entityId,
    fileName: video.fileName,
    state: video.state,
    order: video.order,
    isStarred: video.isStarred,
    title: video.title,
    description: video.description,
    keywords: video.keywords,
    dateCreated: video.dateCreated,
    datePublished: video.datePublished,
    isThreeSixty: video.isThreeSixty,
    threeSixtySettings: video.threeSixtySettings,
    coverImageId: video.coverImageId,
    hlsUrl: video.hlsUrl,
    isFlyOver: video.isFlyOver,
    isUploaded: video.isUploaded,
    isGenerated: video.isGenerated,
    isProcessing: video.isProcessing,
  };
};

export const loadMinimalPublicVideo = (video: Video): VideoMinimalDto => {
  return {
    id: video.id,
    entityId: video.entityId,
    fileName: video.fileName,
    order: video.order,
    title: video.title,
    isThreeSixty: video.isThreeSixty,
    hlsUrl: video.hlsUrl,
    isFlyOver: video.isFlyOver,
  };
};

export const loadPublicVideo = (
  video: Video,
  publicContent: PublicContent
): VideoDto => {
  const videoComments = findMediaComments(publicContent.comments, video.id);
  const videoEmotions = findMediaEmotions(
    publicContent.emotions,
    video.id,
    videoComments
  );

  return {
    id: video.id,
    entityId: video.entityId,
    fileName: video.fileName,
    order: video.order,
    title: video.title,
    description: video.description,
    keywords: video.keywords,
    isThreeSixty: video.isThreeSixty,
    threeSixtySettings: video.threeSixtySettings,
    hlsUrl: video.hlsUrl,
    isFlyOver: video.isFlyOver,
    comments: videoComments,
    emotions: videoEmotions,
  };
};
