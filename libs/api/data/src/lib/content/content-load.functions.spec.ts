import * as faker from 'faker';

import {
  DUMMY_MONGODB_ID,
  Image,
  ImageDimension,
  ImageDimensionType,
  ImageState,
  Location,
  Video,
} from '@dark-rush-photography/shared/types';
import {
  loadImageAdmin,
  loadLocation,
  reloadImageDimension,
  reloadVideo,
} from './content-load.functions';

describe('content-load.functions', () => {
  describe('loadLocation', () => {
    const location: Location = {
      place: faker.company.companyName(),
      street: faker.address.streetAddress(),
      city: faker.address.city(),
      stateOrProvince: faker.address.state(),
      zipCode: faker.address.zipCode(),
      country: faker.address.country(),
    };

    it('should not contain an _id value', () => {
      const locationWithMongoDbId = {
        ...location,
        _id: faker.datatype.uuid(),
      };
      const result = loadLocation(locationWithMongoDbId);
      expect('_id' in result).toBe(false);
    });

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
      const locationWithUndefinedValues: Location = {
        country: faker.address.country(),
      };

      const result = loadLocation(locationWithUndefinedValues);

      expect(result.place).toBe('');
      expect(result.street).toBe('');
      expect(result.city).toBe('');
      expect(result.stateOrProvince).toBe('');
      expect(result.zipCode).toBe('');
      expect(result.country).toBe(locationWithUndefinedValues.country);
    });
  });

  describe('loadImageAdmin', () => {
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
      expect(result.blobPathId).toBe(image.blobPathId);
      expect(result.fileName).toBe(image.fileName);
      expect(result.state).toBe(image.state);
      expect(result.order).toBe(image.order);
      expect(result.isStarred).toBe(image.isStarred);
      expect(result.isLoved).toBe(image.isLoved);
      expect(result.title).toBe(image.title);
      expect(result.seoDescription).toBe(image.seoDescription);
      expect(result.seoKeywords).toBe(image.seoKeywords);
      expect(result.dateCreated).toBe(image.dateCreated);
      expect(result.datePublished).toBe(image.datePublished);
      expect(result.isThreeSixty).toBe(image.isThreeSixty);
    });

    it('should load an admin image with empty string values when they are not provided', () => {
      const imageWithUndefinedValues: Image = {
        id: faker.datatype.uuid(),
        entityId: DUMMY_MONGODB_ID,
        blobPathId: faker.datatype.uuid(),
        fileName: faker.system.fileName(),
        state: faker.random.arrayElement(Object.values(ImageState)),
        order: faker.datatype.number(),
        isStarred: faker.datatype.boolean(),
        isLoved: faker.datatype.boolean(),
        isThreeSixty: faker.datatype.boolean(),
      };

      const result = loadImageAdmin(imageWithUndefinedValues);

      expect(result.id).toBe(imageWithUndefinedValues.id);
      expect(result.entityId).toBe(imageWithUndefinedValues.entityId);
      expect(result.blobPathId).toBe(imageWithUndefinedValues.blobPathId);
      expect(result.fileName).toBe(imageWithUndefinedValues.fileName);
      expect(result.state).toBe(imageWithUndefinedValues.state);
      expect(result.order).toBe(imageWithUndefinedValues.order);
      expect(result.isStarred).toBe(imageWithUndefinedValues.isStarred);
      expect(result.isLoved).toBe(imageWithUndefinedValues.isLoved);
      expect(result.title).toBe('');
      expect(result.seoDescription).toBe('');
      expect(result.seoKeywords).toBe('');
      expect(result.dateCreated).toBe('');
      expect(result.datePublished).toBe('');
      expect(result.isThreeSixty).toBe(imageWithUndefinedValues.isThreeSixty);
    });
  });
  describe('reloadImageDimension', () => {
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
        roll: faker.datatype.number(),
        yaw: faker.datatype.number(),
        hfov: faker.datatype.number(),
      },
    };

    it('should not contain an _id value', () => {
      const imageDimensionWithMongoDbId = {
        ...imageDimension,
        _id: faker.datatype.uuid(),
      };
      const result = reloadImageDimension(imageDimensionWithMongoDbId);
      expect('_id' in result).toBe(false);
    });

    it('should reload an image dimension with all values', () => {
      const result = reloadImageDimension(imageDimension);

      expect(result.id).toBe(imageDimension.id);
      expect(result.entityId).toBe(imageDimension.entityId);
      expect(result.imageId).toBe(imageDimension.imageId);
      expect(result.type).toBe(imageDimension.type);
      expect(result.resolution).toBe(imageDimension.resolution);
      expect(result.threeSixtySettings).toBe(imageDimension.threeSixtySettings);
    });
  });

  describe('reloadVideo', () => {
    const video: Video = {
      id: faker.datatype.uuid(),
      entityId: DUMMY_MONGODB_ID,
      blobPathId: faker.datatype.uuid(),
      fileName: faker.system.fileName(),
    };

    it('should not contain an _id value', () => {
      const videoWithMongoDbId = {
        ...video,
        _id: faker.datatype.uuid(),
      };
      const result = reloadVideo(videoWithMongoDbId);
      expect('_id' in result).toBe(false);
    });

    it('should reload a video with all values', () => {
      const result = reloadVideo(video);

      expect(result.id).toBe(video.id);
      expect(result.entityId).toBe(video.entityId);
      expect(result.blobPathId).toBe(video.blobPathId);
      expect(result.fileName).toBe(video.fileName);
    });
  });
});
