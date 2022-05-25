import {
  IMAGE_FILE_EXTENSION,
  IMAGE_VIDEO_FILE_EXTENSION,
} from '@dark-rush-photography/shared/types';

export const getImageFileName = (pathname: string): string => {
  return `${pathname}${IMAGE_FILE_EXTENSION}`;
};

export const getImageVideoFileName = (pathname: string): string =>
  `${pathname}${IMAGE_VIDEO_FILE_EXTENSION}`;
