import { PublicContent } from '@dark-rush-photography/api/types';
import {
  Image,
  ImageDto,
  ImageMinimalDto,
  MediaState,
} from '@dark-rush-photography/shared/types';
import { findMediaComments } from './comment.functions';
import { findMediaEmotions } from './emotion.functions';

export const findPublicImages = (images: Image[]): Image[] => {
  return images
    .filter((image) => image.state == MediaState.Public)
    .map(loadImage);
};

export const loadImage = (image: Image): Image => ({
  id: image.id,
  entityId: image.entityId,
  fileName: image.fileName,
  state: image.state,
  order: image.order,
  isStarred: image.isStarred,
  isLoved: image.isLoved,
  title: image.title,
  description: image.description,
  keywords: image.keywords,
  dateCreated: image.dateCreated,
  datePublished: image.datePublished,
  isThreeSixty: image.isThreeSixty,
  skipExif: image.skipExif,
  isGenerated: image.isGenerated,
  isProcessing: image.isProcessing,
});

export const loadMinimalPublicImage = (image: Image): ImageMinimalDto => {
  return {
    id: image.id,
    entityId: image.entityId,
    fileName: image.fileName,
    order: image.order,
    title: image.title,
    isThreeSixty: image.isThreeSixty,
  };
};

export const loadPublicImage = (
  image: Image,
  publicContent: PublicContent
): ImageDto => {
  const imageComments = findMediaComments(publicContent.comments, image.id);
  const imageEmotions = findMediaEmotions(
    publicContent.emotions,
    image.id,
    imageComments
  );

  return {
    id: image.id,
    entityId: image.entityId,
    fileName: image.fileName,
    order: image.order,
    title: image.title,
    description: image.description,
    keywords: image.keywords,
    isThreeSixty: image.isThreeSixty,
    comments: imageComments,
    emotions: imageEmotions,
  };
};
