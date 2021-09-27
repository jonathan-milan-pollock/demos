import * as faker from 'faker';

import {
  DUMMY_MONGODB_ID,
  Image,
  ImageState,
} from '@dark-rush-photography/shared/types';
import { findPublicImages, loadImage } from './image.functions';

describe('image.functions', () => {
  const image: Image = {
    id: faker.datatype.uuid(),
    entityId: DUMMY_MONGODB_ID,
    blobPathId: faker.datatype.uuid(),
    fileName: faker.system.fileName(),
    state: faker.random.arrayElement(Object.values(ImageState)),
    order: faker.datatype.number(),
    isStarred: faker.datatype.boolean(),
    isLoved: faker.datatype.boolean(),
    title: faker.lorem.sentence(),
    seoDescription: faker.lorem.paragraph(),
    seoKeywords: [
      faker.lorem.word().toLowerCase(),
      faker.lorem.word().toLowerCase(),
      faker.lorem.word().toLowerCase(),
    ].join(','),
    dateCreated: faker.date.recent().toISOString(),
    datePublished: faker.date.recent().toISOString(),
    isThreeSixty: faker.datatype.boolean(),
  };

  describe('findPublicImages', () => {
    it('should include images that are public', () => {
      const images = [
        { ...image, state: ImageState.New },
        { ...image, state: ImageState.Selected },
        { ...image, state: ImageState.Public },
        { ...image, state: ImageState.Archived },
      ];

      const result = findPublicImages(images);
      expect(result.length).toBe(1);
    });

    it('should not include any images if none are public', () => {
      const images = [
        { ...image, state: ImageState.New },
        { ...image, state: ImageState.Selected },
        { ...image, state: ImageState.Archived },
      ];

      const result = findPublicImages(images);
      expect(result.length).toBe(0);
    });
  });

  describe('loadImage', () => {
    it('should return all fields of an image', () => {
      const result = loadImage({ ...image });
      expect(result).toEqual(image);
    });

    it('should no longer have an _id', () => {
      const imageWithId = {
        _id: 'id',
        ...image,
      };
      const result = loadImage(imageWithId);
      expect('_id' in result).toBe(false);
    });
  });
});
