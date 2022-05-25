import { ImageDimensionType } from '@dark-rush-photography/shared/types';

export const getAzureStorageBlobPath = (
  storageId: string,
  pathname: string,
  fileExtension: string
): string => `${storageId}/${pathname}${fileExtension}`;

export const getAzureStorageBlobPathWithImageDimension = (
  storageId: string,
  pathname: string,
  fileExtension: string,
  imageDimensionType: ImageDimensionType
): string =>
  `${storageId}/${imageDimensionType.toLowerCase()}/${pathname}${fileExtension}`;
