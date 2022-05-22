import {
  IMAGE_FILE_EXTENSION,
  IMAGE_VIDEO_FILE_EXTENSION,
} from '@dark-rush-photography/shared/types';

export const getImageFileName = (slug: string): string => {
  return `${slug}${IMAGE_FILE_EXTENSION}`;
};

export const getImageVideoFileName = (slug: string): string =>
  `${slug}${IMAGE_VIDEO_FILE_EXTENSION}`;
