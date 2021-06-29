import { Image, PostState } from '@dark-rush-photography/shared-types';

export const toImage = (image: Image): Image => {
  return {
    id: image.id,
    entityId: image.entityId,
    fileName: image.fileName,
    postState: image.postState,
    order: image.order,
    isStared: image.isStared,
    isLoved: image.isLoved,
    isLiked: image.isLiked,
    title: image.title,
    description: image.description,
    keywords: image.keywords,
    dateCreated: image.dateCreated,
    datePublished: image.datePublished,
    isProcessed: image.isProcessed,
    isLocked: image.isLocked,
  };
};

export const findPublicImages = (images: Image[]): Image[] => {
  return images
    .filter((i) => i.postState === PostState.Public)
    .map((i) => toImage(i));
};
