import * as path from 'path';

import * as faker from 'faker';

import {
  getPublishImageFileName,
  getPublishImageVideoFileName,
} from './image-publish-file-name.functions';

describe('image-publish-file-name.functions', () => {
  describe('getPublishImageFileName', () => {
    it('should return publish image file name with slug', () => {
      const slug = faker.lorem.word();
      const extension = '.jpg';
      const currentImageFileName = `${
        path.parse(faker.system.fileName()).name
      }${extension}`;

      const result = getPublishImageFileName(slug, currentImageFileName);
      expect(result).toBe(`${slug}${extension}`);
    });
  });

  describe('getPublishImageVideoFileName', () => {
    it('should return public image video file name with slug', () => {
      const slug = faker.lorem.word();
      const extension = '.mp4';

      const result = getPublishImageVideoFileName(slug);
      expect(result).toBe(`${slug}${extension}`);
    });
  });
});
