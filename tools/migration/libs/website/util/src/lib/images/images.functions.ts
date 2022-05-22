import {
  ImageDimensionType,
  IMAGE_FILE_EXTENSION,
  IMAGE_URL_PREFIX_DEV,
  IMAGE_URL_PREFIX_PROD,
} from '@dark-rush-photography/shared/types';

export const getImageUrlForWebsite = (
  storageId: string,
  slug: string,
  imageDimensionType: ImageDimensionType,
  isProduction: boolean
): string =>
  isProduction
    ? `${IMAGE_URL_PREFIX_PROD}/${storageId}/${imageDimensionType.toLowerCase()}/${slug}${IMAGE_FILE_EXTENSION}`
    : `${IMAGE_URL_PREFIX_DEV}/${storageId}/${imageDimensionType.toLowerCase()}/${slug}${IMAGE_FILE_EXTENSION}`;
