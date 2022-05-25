import faker from '@faker-js/faker';

import { ImageDimensionType } from '@dark-rush-photography/shared/types';
import { getImageUrl } from './image-url.functions';

describe('image-url.functions', () => {
  describe('getImageUrl', () => {
    it('should correctly format a url for a dev image', () => {
      const storageId = faker.datatype.uuid();
      const pathname = faker.lorem.word();
      const imageDimensionType = faker.random.arrayElement(
        Object.values(ImageDimensionType)
      );
      const isProduction = false;

      const result = getImageUrl(
        storageId,
        pathname,
        imageDimensionType,
        isProduction
      );
      expect(result).toBe(
        `https://devpublicsa.blob.core.windows.net/devimages/${storageId}/${imageDimensionType.toLowerCase()}/${pathname}.jpg`
      );
    });

    it('should correctly format a url for a production image', () => {
      const storageId = faker.datatype.uuid();
      const pathname = faker.lorem.word();
      const imageDimensionType = faker.random.arrayElement(
        Object.values(ImageDimensionType)
      );
      const isProduction = true;

      const result = getImageUrl(
        storageId,
        pathname,
        imageDimensionType,
        isProduction
      );
      expect(result).toBe(
        `https://www.darkrushphotography.art/images/${storageId}/${imageDimensionType.toLowerCase()}/${pathname}.jpg`
      );
    });
  });
});
