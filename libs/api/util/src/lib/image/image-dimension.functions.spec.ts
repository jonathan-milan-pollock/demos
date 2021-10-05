import { BadRequestException } from '@nestjs/common';

import * as faker from 'faker';

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
  });

  describe('getImageDimension', () => {
    it.each(Object.values(ImageDimensionType))(
      'should get an image dimension for type %s',
      (imageDimensionType) => {
        const result = getImageDimension(imageDimensionType);
        expect(result).toBeDefined();
      }
    );

    it('should throw a bad request exception if the image dimension type is invalid', () => {
      const imageDimensionType = faker.lorem.word();
      const result = () => {
        getImageDimension(imageDimensionType as ImageDimensionType);
      };
      expect(result).toThrow(BadRequestException);
      expect(result).toThrow(
        `Could not get image dimension for type ${imageDimensionType}`
      );
    });
  });
});
