import {
  Image,
  ImageAdmin,
  ImagePublic,
} from '@dark-rush-photography/shared/types';

export const loadImageAdmin = (image: Image): ImageAdmin => ({
  id: image.id,
  entityId: image.entityId,
  storageId: image.storageId,
  fileName: image.fileName,
  state: image.state,
  isThreeSixty: image.isThreeSixty,
  order: image.order,
  isStarred: image.isStarred,
  isLoved: image.isLoved,
  title: image.title ?? '',
  seoDescription: image.seoDescription ?? '',
  seoKeywords: image.seoKeywords ? image.seoKeywords.split(',') : [],
});

export const loadImagePublic = (image: Image): ImagePublic => {
  return {
    storageId: image.storageId,
    fileName: image.fileName,
    isThreeSixty: image.isThreeSixty,
    order: image.order,
    smallResolution: image.smallResolution ?? { width: 0, height: 0 },
  };
};
