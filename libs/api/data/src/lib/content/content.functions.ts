import { Content } from '@dark-rush-photography/api/types';
import { DocumentModel } from '../schema/document.schema';
import { findPublicImageDimensions } from './image-dimension.functions';
import { findPublicImages } from './image.functions';
import { findPublicVideoDimensions } from './video-dimension.functions';
import { findPublicVideos } from './video.functions';
import { findPublicComments } from './comment.functions';
import { findPublicEmotions } from './emotion.functions';
import { ContentType } from '@dark-rush-photography/shared/types';

export const getContentIds = (
  contentType: ContentType,
  documentModel: DocumentModel
): string[] => {
  switch (contentType) {
    case ContentType.Image:
      return documentModel.images.map((v) => v.id);
    case ContentType.ImageDimension:
      return documentModel.imageDimensions.map((v) => v.id);
    case ContentType.Video:
      return documentModel.videos.map((v) => v.id);
    case ContentType.VideoDimension:
      return documentModel.videoDimensions.map((vd) => vd.id);
    case ContentType.Comment:
      return documentModel.comments.map((c) => c.id);
    case ContentType.Emotion:
      return documentModel.emotions.map((e) => e.id);
  }
};

export const findPublicContent = (documentModel: DocumentModel): Content => {
  const publicImages = findPublicImages(documentModel.images);
  const publicImageIds = publicImages.map((i) => i.id);
  const publicImageDimensions = findPublicImageDimensions(
    documentModel.imageDimensions,
    publicImageIds
  );
  const publicVideos = findPublicVideos(documentModel.videos);
  const publicVideoIds = publicVideos.map((v) => v.id);
  const publicVideoDimensions = findPublicVideoDimensions(
    documentModel.videoDimensions,
    publicVideoIds
  );
  const publicComments = findPublicComments(documentModel.comments, [
    ...publicImageIds,
    ...publicVideoIds,
  ]);
  const publicEmotions = findPublicEmotions(
    documentModel.emotions,
    [...publicImageIds, ...publicVideoIds],
    publicComments.map((c) => c.id)
  );

  return {
    images: publicImages,
    imageDimensions: publicImageDimensions,
    videos: publicVideos,
    videoDimensions: publicVideoDimensions,
    comments: publicComments,
    emotions: publicEmotions,
  };
};
