import {
  Image,
  ImageAdmin,
  ImagePublic,
  ImageState,
} from '@dark-rush-photography/shared/types';

export const loadImageAdmin = (image: Image): ImageAdmin => ({
  id: image.id,
  entityId: image.entityId,
  storageId: image.storageId,
  slug: image.slug,
  order: image.order,
  state: image.state,
  isThreeSixtyImage: image.isThreeSixtyImage,
  threeSixtyImageStorageId: image.threeSixtyImageStorageId,
  isStarred: image.isStarred,
  isLoved: image.isLoved,
  title: image.title ?? '',
  seoDescription: image.seoDescription ?? '',
  seoKeywords: image.seoKeywords ? image.seoKeywords.split(',') : [],
});

export const loadImagePublic = (image: Image): ImagePublic => ({
  storageId: image.storageId,
  slug: image.slug,
  order: image.order,
  isThreeSixtyImage: image.isThreeSixtyImage,
  threeSixtyImageStorageId: image.threeSixtyImageStorageId,
  smallDimension: image.smallDimension ?? { width: 0, height: 0 },
});

export const findStarredPublishImage = (images: Image[]): Image | undefined =>
  images.find(
    (image) =>
      image.isStarred &&
      (image.state === ImageState.Selected || image.state === ImageState.Public)
  );

export const findFirstImage = (images: Image[]): Image | undefined =>
  images.length > 0 ? images[0] : undefined;
