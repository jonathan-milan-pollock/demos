import * as faker from 'faker';

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
      const slug = faker.lorem.word();
      const result = getImageFileName(slug);
      expect(result).toBe(`${slug}${IMAGE_FILE_EXTENSION}`);
    });
  });

  describe('getImageVideoFileName', () => {
    it('should return image video file name', () => {
      const slug = faker.lorem.word();
      const result = getImageVideoFileName(slug);
      expect(result).toBe(`${slug}${IMAGE_VIDEO_FILE_EXTENSION}`);
    });
  });
});
