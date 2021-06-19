import { Image, PostedState } from '@dark-rush-photography/shared-types';

export const toImage = (image: Image): Image => {
  return {
    id: image.id,
    entityId: image.entityId,
    slug: image.slug,
    state: image.state,
    order: image.order,
    isStared: image.isStared,
    isLoved: image.isLoved,
    isLiked: image.isLiked,
    title: image.title,
    description: image.description,
    keywords: image.keywords,
    dateCreated: image.dateCreated,
    datePublished: image.datePublished,
  };
};

export const findPublicImages = (images: Image[]): Image[] => {
  return images
    .filter((i) => i.state === PostedState.Public)
    .map((i) => toImage(i));
};
