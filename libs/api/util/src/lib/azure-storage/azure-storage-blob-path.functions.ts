import { ImageDimensionType } from '@dark-rush-photography/shared/types';

export const getAzureStorageBlobPath = (
  storageId: string,
  slug: string,
  fileExtension: string
): string => `${storageId}/${slug}${fileExtension}`;

export const getAzureStorageBlobPathWithImageDimension = (
  storageId: string,
  slug: string,
  fileExtension: string,
  imageDimensionType: ImageDimensionType
): string =>
  `${storageId}/${imageDimensionType.toLowerCase()}/${slug}${fileExtension}`;
