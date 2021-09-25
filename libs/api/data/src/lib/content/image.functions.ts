import {
  Image,
  MediaState,
  PublicContent,
} from '@dark-rush-photography/shared/types';
import { ImageDto, ImageMinimalDto } from '@dark-rush-photography/api/types';

import { findMediaComments } from './comment.functions';
import { findMediaEmotions } from './emotion.functions';

export const findPublicImages = (images: Image[]): Image[] => {
  return images
    .filter((image) => image.state === MediaState.Published)
    .map(loadImage);
};

export const loadImage = (image: Image): Image => ({
  id: image.id,
  entityId: image.entityId,
  state: image.state,
  blobPathId: image.blobPathId,
  fileName: image.fileName,
  order: image.order,
  isStarred: image.isStarred,
  isLoved: image.isLoved,
  title: image.title,
  seoDescription: image.seoDescription,
  seoKeywords: image.seoKeywords,
  dateCreated: image.dateCreated,
  datePublished: image.datePublished,
  isThreeSixty: image.isThreeSixty,
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

export const loadPublicImage = (image: Image): ImageDto => {
  return {
    id: image.id,
    entityId: image.entityId,
    fileName: image.fileName,
    order: image.order,
    title: image.title,
    seoDescription: image.seoDescription,
    seoKeywords: image.seoKeywords,
    isThreeSixty: image.isThreeSixty,
  };
};
