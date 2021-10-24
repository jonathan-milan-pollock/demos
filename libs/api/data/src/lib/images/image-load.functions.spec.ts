import * as faker from 'faker';

import {
  DUMMY_MONGODB_ID,
  Image,
  ImageState,
  Location,
  ImageVideo,
} from '@dark-rush-photography/shared/types';
import {
  loadImageAdmin,
  loadImagePublic,
  loadLocation,
} from './image-load.functions';

describe('image-load.functions', () => {
  describe('loadLocation', () => {
    const location: Location = {
      place: faker.company.companyName(),
      street: faker.address.streetAddress(),
      city: faker.address.city(),
      stateOrProvince: faker.address.state(),
      zipCode: faker.address.zipCode(),
      country: faker.address.country(),
    };

    it('should load a location with all values', () => {
      const result = loadLocation(location);

      expect(result.place).toBe(location.place);
      expect(result.street).toBe(location.street);
      expect(result.city).toBe(location.city);
      expect(result.stateOrProvince).toBe(location.stateOrProvince);
      expect(result.zipCode).toBe(location.zipCode);
      expect(result.country).toBe(location.country);
    });

    it('should load a location with empty string values when they are not provided', () => {
      const country = faker.address.country();

      const result = loadLocation({
        country,
      });

      expect(result.place).toBe('');
      expect(result.street).toBe('');
      expect(result.city).toBe('');
      expect(result.stateOrProvince).toBe('');
      expect(result.zipCode).toBe('');
      expect(result.country).toBe(country);
    });
  });

  describe('loadImageAdmin', () => {
    const image: Image = {
      id: faker.datatype.uuid(),
      entityId: DUMMY_MONGODB_ID,
      storageId: faker.datatype.uuid(),
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
      createdDate: faker.date.recent().toISOString(),
      publishedDate: faker.date.recent().toISOString(),
      smallResolution: {
        width: faker.datatype.number(),
        height: faker.datatype.number(),
      },
      isThreeSixty: faker.datatype.boolean(),
    };

    it('should not contain an _id value', () => {
      const imageWithMongoDbId = {
        ...image,
        _id: faker.datatype.uuid(),
      };
      const result = loadImageAdmin(imageWithMongoDbId);
      expect('_id' in result).toBe(false);
    });

    it('should load an admin image with all values', () => {
      const result = loadImageAdmin(image);

      expect(result.id).toBe(image.id);
      expect(result.entityId).toBe(image.entityId);
      expect(result.storageId).toBe(image.storageId);
      expect(result.fileName).toBe(image.fileName);
      expect(result.state).toBe(image.state);
      expect(result.order).toBe(image.order);
      expect(result.isStarred).toBe(image.isStarred);
      expect(result.isLoved).toBe(image.isLoved);
      expect(result.title).toBe(image.title);
      expect(result.seoDescription).toBe(image.seoDescription);
      expect(result.seoKeywords).toEqual(image.seoKeywords?.split(','));
      expect(result.createdDate).toBe(image.createdDate);
      expect(result.publishedDate).toBe(image.publishedDate);
      expect(result.smallResolution).toEqual(image.smallResolution);
      expect(result.isThreeSixty).toBe(image.isThreeSixty);
    });

    it('should load an admin image with values when they are not provided', () => {
      const result = loadImageAdmin({
        id: faker.datatype.uuid(),
        entityId: DUMMY_MONGODB_ID,
        storageId: faker.datatype.uuid(),
        fileName: faker.system.fileName(),
        state: faker.random.arrayElement(Object.values(ImageState)),
        order: faker.datatype.number(),
        isStarred: faker.datatype.boolean(),
        isLoved: faker.datatype.boolean(),
        smallResolution: {
          width: faker.datatype.number(),
          height: faker.datatype.number(),
        },
        isThreeSixty: faker.datatype.boolean(),
      });
      expect(result.title).toBe('');
      expect(result.seoDescription).toBe('');
      expect(result.seoKeywords).toEqual([]);
      expect(result.createdDate).toBe('');
      expect(result.publishedDate).toBe('');
    });
  });

  describe('loadImagePublic', () => {
    const image: Image = {
      id: faker.datatype.uuid(),
      entityId: DUMMY_MONGODB_ID,
      storageId: faker.datatype.uuid(),
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
      createdDate: faker.date.recent().toISOString(),
      publishedDate: faker.date.recent().toISOString(),
      smallResolution: {
        width: faker.datatype.number(),
        height: faker.datatype.number(),
      },
      isThreeSixty: faker.datatype.boolean(),
    };

    it('should not contain an _id value', () => {
      const imageWithMongoDbId = {
        ...image,
        _id: faker.datatype.uuid(),
      };
      const result = loadImagePublic(imageWithMongoDbId);
      expect('_id' in result).toBe(false);
    });

    it('should load a public image with all values', () => {
      const result = loadImagePublic(image);

      expect(result.fileName).toBe(image.fileName);
      expect(result.order).toBe(image.order);
      expect(result.title).toBe(image.title);
      expect(result.seoDescription).toBe(image.seoDescription);
      expect(result.seoKeywords).toEqual(image.seoKeywords?.split(','));
      expect(result.createdDate).toBe(image.createdDate);
      expect(result.publishedDate).toBe(image.publishedDate);
      expect(result.smallResolution).toEqual(image.smallResolution);
      expect(result.isThreeSixty).toBe(image.isThreeSixty);
    });

    it('should load a public image with values when they are not provided', () => {
      const result = loadImagePublic({
        id: faker.datatype.uuid(),
        entityId: DUMMY_MONGODB_ID,
        storageId: faker.datatype.uuid(),
        fileName: faker.system.fileName(),
        state: faker.random.arrayElement(Object.values(ImageState)),
        order: faker.datatype.number(),
        isStarred: faker.datatype.boolean(),
        isLoved: faker.datatype.boolean(),
        smallResolution: {
          width: faker.datatype.number(),
          height: faker.datatype.number(),
        },
        isThreeSixty: faker.datatype.boolean(),
      });
      expect(result.title).toBe('');
      expect(result.seoDescription).toBe('');
      expect(result.seoKeywords).toEqual([]);
      expect(result.createdDate).toBe('');
      expect(result.publishedDate).toBe('');
    });
  });

  describe('loadVideo', () => {
    const video: ImageVideo = {
      id: faker.datatype.uuid(),
      entityId: DUMMY_MONGODB_ID,
      storageId: faker.datatype.uuid(),
      fileName: faker.system.fileName(),
    };

    it('should not contain an _id value', () => {
      const videoWithMongoDbId = {
        ...video,
        _id: faker.datatype.uuid(),
      };
      const result = loadVideo(videoWithMongoDbId);
      expect('_id' in result).toBe(false);
    });

    it('should reload a video with all values', () => {
      const result = loadVideo(video);

      expect(result.id).toBe(video.id);
      expect(result.entityId).toBe(video.entityId);
      expect(result.storageId).toBe(video.storageId);
      expect(result.fileName).toBe(video.fileName);
    });
  });
});
