import { Image, MediaState } from '@dark-rush-photography/shared/types';

export const toImage = (image: Image): Image => {
  return {
    id: image.id,
    entityId: image.entityId,
    fileName: image.fileName,
    state: image.state,
    order: image.order,
    isStared: image.isStared,
    isLoved: image.isLoved,
    title: image.title,
    description: image.description,
    keywords: image.keywords,
    dateCreated: image.dateCreated,
    datePublished: image.datePublished,
    isGenerated: image.isGenerated,
    isProcessing: image.isProcessing,
  };
};

export const findPublicImages = (images: Image[]): Image[] => {
  return images
    .filter((i) => i.state == MediaState.Public)
    .map((i) => toImage(i));
};
