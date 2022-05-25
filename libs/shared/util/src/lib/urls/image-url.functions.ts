import {
  ImageDimensionType,
  IMAGE_FILE_EXTENSION,
  IMAGE_URL_PREFIX_DEV,
  IMAGE_URL_PREFIX_PROD,
} from '@dark-rush-photography/shared/types';

export const getImageUrl = (
  storageId: string,
  pathname: string,
  imageDimensionType: ImageDimensionType,
  isProduction: boolean
): string =>
  isProduction
    ? `${IMAGE_URL_PREFIX_PROD}/${storageId}/${imageDimensionType.toLowerCase()}/${pathname}${IMAGE_FILE_EXTENSION}`
    : `${IMAGE_URL_PREFIX_DEV}/${storageId}/${imageDimensionType.toLowerCase()}/${pathname}${IMAGE_FILE_EXTENSION}`;

export const getAddThreeSixtyUrl = (
  apiPrefix: string,
  entityId: string
): string => {
  return `${apiPrefix}/api/v1/admin/images/three-sixty-image?entityId=${entityId}`;
};

export const getLoadImagesUrl = (
  apiPrefix: string,
  entityId: string
): string => {
  return `${apiPrefix}/api/v1/admin/images/load?entityId=${entityId}`;
};

export const getUpdateNewImagesUrl = (
  apiPrefix: string,
  entityId: string
): string => {
  return `${apiPrefix}/api/v1/admin/images/update-new-images?entityId=${entityId}`;
};

export const getOrderImagesUrl = (
  apiPrefix: string,
  entityId: string
): string => {
  return `${apiPrefix}/api/v1/admin/images/order-images?entityId=${entityId}`;
};

export const getSelectNewImagesUrl = (
  apiPrefix: string,
  entityId: string
): string => {
  return `${apiPrefix}/api/v1/admin/images/select-new-images?entityId=${entityId}`;
};

export const getUpdatePublishImageUrl = (
  apiPrefix: string,
  imageId: string,
  entityId: string
): string => {
  return `${apiPrefix}/api/v1/admin/images/${imageId}/update-publish-image?entityId=${entityId}`;
};

export const getArchiveImageUrl = (
  apiPrefix: string,
  imageId: string,
  entityId: string
): string => {
  return `${apiPrefix}/api/v1/admin/images/${imageId}/archive?entityId=${entityId}`;
};

export const getUnarchiveImageUrl = (
  apiPrefix: string,
  imageId: string,
  entityId: string
): string => {
  return `${apiPrefix}/api/v1/admin/images/${imageId}/unarchive?entityId=${entityId}`;
};

export const getRemovePublishImageUrl = (
  apiPrefix: string,
  imageId: string,
  entityId: string
): string => {
  return `${apiPrefix}/api/v1/admin/images/${imageId}/publish-image?entityId=${entityId}`;
};

export const getSmallImageUrl = (
  imageUrlPrefix: string,
  storageId: string,
  pathname: string
): string => {
  return `${imageUrlPrefix}/${storageId}/ipadsmall/${encodeURI(pathname)}.jpg`;
};

export const getMediumImageUrl = (
  imageUrlPrefix: string,
  storageId: string,
  pathname: string
): string => {
  return `${imageUrlPrefix}/${storageId}/ipadmedium/${encodeURI(pathname)}.jpg`;
};

export const getLargeImageUrl = (
  imageUrlPrefix: string,
  storageId: string,
  pathname: string
): string => {
  return `${imageUrlPrefix}/${storageId}/ipadlarge/${encodeURI(pathname)}.jpg`;
};
