import * as faker from 'faker';

import {
  DUMMY_MONGODB_ID,
  Image,
  MediaState,
} from '@dark-rush-photography/shared/types';
import { findPublicImages, toImage } from './image.functions';

describe('image.functions', () => {
  const image: Image = {
    id: faker.datatype.uuid(),
    entityId: DUMMY_MONGODB_ID,
    fileName: faker.lorem.word().toLowerCase(),
    state: faker.random.arrayElement(Object.values(MediaState)),
    order: faker.datatype.number(),
    isStarred: faker.datatype.boolean(),
    isLoved: faker.datatype.boolean(),
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraph(),
    keywords: `${faker.lorem.word().toLowerCase()}, ${faker.lorem
      .word()
      .toLowerCase()}, ${faker.lorem.word().toLowerCase()}`,
    dateCreated: faker.date.recent().toISOString(),
    datePublished: faker.date.recent().toISOString(),
    isThreeSixty: faker.datatype.boolean(),
    skipExif: faker.datatype.boolean(),
    isGenerated: faker.datatype.boolean(),
    isProcessing: faker.datatype.boolean(),
  };

  describe('toImage', () => {
    it('should return all fields of an image', () => {
      const result = toImage({ ...image });
      expect(result).toEqual(image);
    });

    it('should no longer have an _id', () => {
      const imageWithId = {
        _id: 'id',
        ...image,
      };
      const result = toImage(imageWithId);
      expect('_id' in result).toBe(false);
    });

    /*
    TODO: Test other undefined properties like this
    it('should have an undefined title if not provided', () => {
      const result = toImage({
        ...image,
        title: undefined,
      });
      expect(result.title).toBeUndefined();
    });*/
  });

  describe('findPublicImages', () => {
    it('should include images that are public', () => {
      const images = [
        { ...image, state: MediaState.New },
        { ...image, state: MediaState.Public },
      ];

      const result = findPublicImages(images);
      expect(result.length).toBe(1);
    });

    it('should not include any images if none are public', () => {
      const images = [
        { ...image, state: MediaState.New },
        { ...image, state: MediaState.New },
      ];

      const result = findPublicImages(images);
      expect(result.length).toBe(0);
    });
  });
});
