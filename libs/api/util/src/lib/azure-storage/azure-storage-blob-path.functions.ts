import {
  ImageDimensionType,
  VideoDimensionType,
} from '@dark-rush-photography/shared/types';

export const getAzureStorageBlobPath = (
  entityBlobPathId: string,
  fileName: string
): string => {
  return `${entityBlobPathId}/${fileName}`;
};

export const getAzureStorageBlobPathWithDimension = (
  entityBlobPathId: string,
  fileName: string,
  mediaDimensionType: ImageDimensionType | VideoDimensionType
): string => {
  return `${entityBlobPathId}/${mediaDimensionType.toLowerCase()}/${fileName}`;
};
