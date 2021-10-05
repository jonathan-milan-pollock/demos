import { ImageDimensionType } from '@dark-rush-photography/shared/types';

export const getAzureStorageBlobPath = (
  storageId: string,
  fileName: string
): string => {
  return `${storageId}/${fileName}`;
};

export const getAzureStorageBlobPathWithImageDimension = (
  storageId: string,
  fileName: string,
  imageDimensionType: ImageDimensionType
): string => {
  return `${storageId}/${imageDimensionType.toLowerCase()}/${fileName}`;
};
