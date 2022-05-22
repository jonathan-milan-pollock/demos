import { ConflictException } from '@nestjs/common';

import faker from '@faker-js/faker';

import { ImageDimensionType } from '@dark-rush-photography/shared/types';
import {
  getImageDimension,
  getImageDimensions,
} from './image-dimension.functions';

describe('image-dimension.functions', () => {
  describe('getImageDimensions', () => {
    it.each(Object.values(ImageDimensionType))(
      'should include an image dimension for type %s',
      (imageDimensionType) => {
        const result = getImageDimensions().find(
          (imageDimension) => imageDimension.type === imageDimensionType
        );
        expect(result).toBeDefined();
      }
    );

    it('should have the same number of image dimensions as image dimension types', () => {
      expect(getImageDimensions().length).toBe(
        Object.values(ImageDimensionType).length
      );
    });
  });

  describe('getImageDimension', () => {
    it.each(Object.values(ImageDimensionType))(
      'should get an image dimension for type %s',
      (imageDimensionType) => {
        expect(getImageDimension(imageDimensionType)).toBeDefined();
      }
    );

    it('should throw a conflict exception if the image dimension type is invalid', () => {
      const imageDimensionType = faker.lorem.word() as ImageDimensionType;
      const result = () => {
        getImageDimension(imageDimensionType);
      };
      expect(result).toThrow(ConflictException);
      expect(result).toThrow(
        `Could not get image dimension for type ${imageDimensionType}`
      );
    });
  });
});
