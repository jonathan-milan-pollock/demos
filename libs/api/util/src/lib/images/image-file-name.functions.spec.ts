import faker from '@faker-js/faker';

import {
  IMAGE_FILE_EXTENSION,
  IMAGE_VIDEO_FILE_EXTENSION,
} from '@dark-rush-photography/shared/types';
import {
  getImageFileName,
  getImageVideoFileName,
} from './image-file-name.functions';

describe('image-file-name.functions', () => {
  describe('getImageFileName', () => {
    it('should return image file name', () => {
      const pathname = faker.lorem.word();
      const result = getImageFileName(pathname);
      expect(result).toBe(`${pathname}${IMAGE_FILE_EXTENSION}`);
    });
  });

  describe('getImageVideoFileName', () => {
    it('should return image video file name', () => {
      const pathname = faker.lorem.word();
      const result = getImageVideoFileName(pathname);
      expect(result).toBe(`${pathname}${IMAGE_VIDEO_FILE_EXTENSION}`);
    });
  });
});
