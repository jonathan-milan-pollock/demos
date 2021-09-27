import * as faker from 'faker';

import {
  ImageDimension,
  ImageDimensionType,
} from '@dark-rush-photography/shared/types';
import { DUMMY_MONGODB_ID } from '@dark-rush-photography/shared/types';
import {
  findPublicImageDimensions,
  loadImageDimension,
} from './image-dimension.functions';

describe('image-dimension.functions', () => {
  const imageDimension: ImageDimension = {
    id: faker.datatype.uuid(),
    entityId: DUMMY_MONGODB_ID,
    imageId: faker.datatype.uuid(),
    type: faker.random.arrayElement(Object.values(ImageDimensionType)),
    resolution: {
      width: faker.datatype.number(),
      height: faker.datatype.number(),
    },
    threeSixtySettings: {
      pitch: faker.datatype.number(),
      yaw: faker.datatype.number(),
      roll: faker.datatype.number(),
      hfov: faker.datatype.number(),
    },
  };

  describe('toImageDimension', () => {
    it('should return all fields of an image dimension', () => {
      const result = loadImageDimension({ ...imageDimension });
      expect(result).toEqual(imageDimension);
    });

    it('should no longer have an _id', () => {
      const imageDimensionWithId = {
        _id: 'id',
        ...imageDimension,
      };
      const result = loadImageDimension(imageDimensionWithId);
      expect('_id' in result).toBe(false);
    });

    /*
    it('should have an undefined three sixty image settings if not provided', () => {
      const result = toImageDimension({
        ...imageDimension,
        threeSixtySettings: undefined,
      });
      expect(result.threeSixtySettings).toBeUndefined();
    });*/
  });

  describe('findPublicImageDimensions', () => {
    it('should include image dimensions if their images are public', () => {
      const imageDimensions = [
        { ...imageDimension, imageId: '0001' },
        { ...imageDimension, imageId: '0002' },
      ];

      const publicImageIds = ['0001', '0002'];
      const result = findPublicImageDimensions(imageDimensions, publicImageIds);
      expect(result).toEqual(imageDimensions);
    });

    it('should exclude image dimensions if their images are not public', () => {
      const imageDimensions = [
        { ...imageDimension, imageId: '0001' },
        { ...imageDimension, imageId: '0002' },
      ];

      const publicImageIds = ['0001'];
      const result = findPublicImageDimensions(imageDimensions, publicImageIds);
      expect(result.length).toBe(1);
    });

    it('should exclude all image dimensions if there are no public images', () => {
      const imageDimensions = [
        { ...imageDimension, mediaId: '0001' },
        { ...imageDimension, mediaId: '0002' },
      ];

      const publicImageIds: string[] = [];

      const result = findPublicImageDimensions(imageDimensions, publicImageIds);
      expect(result.length).toBe(0);
    });
  });
});
