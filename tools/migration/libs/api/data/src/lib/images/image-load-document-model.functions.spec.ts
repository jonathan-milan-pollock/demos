import * as faker from 'faker';

import {
  DUMMY_MONGODB_ID,
  Image,
  ImageState,
  ImageUpdate,
} from '@dark-rush-photography/shared/types';
import {
  loadAddImagePostImage,
  loadAddImageVideo,
  loadAddTestImage,
  loadNewImage,
  loadUpdateImage,
  loadUpdateImageCreatedDate,
  loadUpdateImageOrder,
  loadUpdateImageSmallDimension,
  loadUpdateImageState,
} from './image-load-document-model.functions';

describe('image-load-document-model.functions', () => {
  const image: Image = {
    id: faker.datatype.uuid(),
    entityId: DUMMY_MONGODB_ID,
    storageId: faker.datatype.uuid(),
    slug: faker.lorem.word(),
    order: faker.datatype.number(),
    state: faker.random.arrayElement(Object.values(ImageState)),
    threeSixtyImageStorageId: faker.datatype.uuid(),
    isStarred: faker.datatype.boolean(),
    isLoved: faker.datatype.boolean(),
    title: faker.lorem.sentence(),
    createdDate: faker.date.recent().toISOString(),
    seoDescription: faker.lorem.paragraph(),
    seoKeywords: [
      faker.lorem.word(),
      faker.lorem.word(),
      faker.lorem.word(),
    ].join(','),
    smallDimension: {
      width: faker.datatype.number(),
      height: faker.datatype.number(),
    },
  };

  describe('loadNewImage', () => {
    it('should load values', () => {
      const entityId = DUMMY_MONGODB_ID;
      const slug = faker.lorem.word();
      const order = faker.datatype.number();

      const result = loadNewImage(entityId, slug, order);

      expect(result.id).toBeDefined();
      expect(result.entityId).toBe(entityId);
      expect(result.storageId).toBeDefined();
      expect(result.slug).toBe(slug);
      expect(result.order).toBe(order);
      expect(result.state).toBe(ImageState.New);
      expect(result.isStarred).toBe(false);
      expect(result.isLoved).toBe(false);
    });
  });

  describe('loadAddImagePostImage', () => {
    it('should load values', () => {
      const entityId = DUMMY_MONGODB_ID;
      const slug = faker.lorem.word();

      const result = loadAddImagePostImage(entityId, slug);

      expect(result.id).toBeDefined();
      expect(result.entityId).toBe(entityId);
      expect(result.storageId).toBeDefined();
      expect(result.slug).toBe(slug);
      expect(result.order).toBe(0);
      expect(result.state).toBe(ImageState.Selected);
      expect(result.isStarred).toBe(false);
      expect(result.isLoved).toBe(false);
    });
  });

  describe('loadAddTestImage', () => {
    it('should load values', () => {
      const entityId = DUMMY_MONGODB_ID;
      const slug = faker.lorem.word();

      const result = loadAddTestImage(entityId, slug);

      expect(result.id).toBeDefined();
      expect(result.entityId).toBe(entityId);
      expect(result.storageId).toBeDefined();
      expect(result.slug).toBe(slug);
      expect(result.order).toBe(0);
      expect(result.state).toBe(ImageState.New);
      expect(result.isStarred).toBe(false);
      expect(result.isLoved).toBe(false);
    });
  });

  describe('loadUpdateImage', () => {
    it('should load values', () => {
      const imageUpdate: ImageUpdate = {
        threeSixtyImageStorageId: faker.datatype.uuid(),
        isStarred: faker.datatype.boolean(),
        isLoved: faker.datatype.boolean(),
        title: faker.lorem.sentence(),
        seoDescription: faker.lorem.paragraph(),
        seoKeywords: [
          faker.lorem.word(),
          faker.lorem.word(),
          faker.lorem.word(),
        ],
      };

      const result = loadUpdateImage(image, imageUpdate);

      expect(result.id).toBe(image.id);
      expect(result.entityId).toBe(image.entityId);
      expect(result.storageId).toBe(image.storageId);
      expect(result.slug).toBe(image.slug);
      expect(result.order).toBe(image.order);
      expect(result.threeSixtyImageStorageId).toBe(
        imageUpdate.threeSixtyImageStorageId
      );
      expect(result.isStarred).toBe(imageUpdate.isStarred);
      expect(result.isLoved).toBe(imageUpdate.isLoved);
      expect(result.title).toBe(imageUpdate.title);
      expect(result.createdDate).toBe(image.createdDate);
      expect(result.seoDescription).toBe(imageUpdate.seoDescription);
      expect(result.seoKeywords).toBe(imageUpdate.seoKeywords.join(','));
      expect(result.smallDimension).toEqual(image.smallDimension);
    });
  });

  describe('loadUpdateImageOrder', () => {
    it('should load values', () => {
      const order = faker.datatype.number();
      const result = loadUpdateImageOrder(image, order);

      expect(result.id).toBe(image.id);
      expect(result.entityId).toBe(image.entityId);
      expect(result.storageId).toBe(image.storageId);
      expect(result.slug).toBe(image.slug);
      expect(result.order).toBe(order);
      expect(result.state).toBe(image.state);
      expect(result.threeSixtyImageStorageId).toBe(
        image.threeSixtyImageStorageId
      );
      expect(result.isStarred).toBe(image.isStarred);
      expect(result.isLoved).toBe(image.isLoved);
      expect(result.title).toBe(image.title);
      expect(result.createdDate).toBe(image.createdDate);
      expect(result.seoDescription).toBe(image.seoDescription);
      expect(result.seoKeywords).toBe(image.seoKeywords);
      expect(result.smallDimension).toEqual(image.smallDimension);
    });
  });

  describe('loadUpdateImageState', () => {
    it('should load values', () => {
      const state = faker.random.arrayElement(Object.values(ImageState));
      const result = loadUpdateImageState(image, state);

      expect(result.id).toBe(image.id);
      expect(result.entityId).toBe(image.entityId);
      expect(result.storageId).toBe(image.storageId);
      expect(result.slug).toBe(image.slug);
      expect(result.order).toBe(image.order);
      expect(result.state).toBe(state);
      expect(result.threeSixtyImageStorageId).toBe(
        image.threeSixtyImageStorageId
      );
      expect(result.isStarred).toBe(image.isStarred);
      expect(result.isLoved).toBe(image.isLoved);
      expect(result.title).toBe(image.title);
      expect(result.createdDate).toBe(image.createdDate);
      expect(result.seoDescription).toBe(image.seoDescription);
      expect(result.seoKeywords).toBe(image.seoKeywords);
      expect(result.smallDimension).toEqual(image.smallDimension);
    });
  });

  describe('loadUpdateImageCreatedDate', () => {
    it('should load values', () => {
      const createdDate = faker.date.recent().toISOString();
      const result = loadUpdateImageCreatedDate(image, createdDate);

      expect(result.id).toBe(image.id);
      expect(result.entityId).toBe(image.entityId);
      expect(result.storageId).toBe(image.storageId);
      expect(result.slug).toBe(image.slug);
      expect(result.order).toBe(image.order);
      expect(result.state).toBe(image.state);
      expect(result.threeSixtyImageStorageId).toBe(
        image.threeSixtyImageStorageId
      );
      expect(result.isStarred).toBe(image.isStarred);
      expect(result.isLoved).toBe(image.isLoved);
      expect(result.title).toBe(image.title);
      expect(result.createdDate).toBe(createdDate);
      expect(result.seoDescription).toBe(image.seoDescription);
      expect(result.seoKeywords).toBe(image.seoKeywords);
      expect(result.smallDimension).toEqual(image.smallDimension);
    });
  });

  describe('loadUpdateImageSmallDimension', () => {
    it('should load values', () => {
      const smallDimension = {
        width: faker.datatype.number(),
        height: faker.datatype.number(),
      };
      const result = loadUpdateImageSmallDimension(image, smallDimension);

      expect(result.id).toBe(image.id);
      expect(result.entityId).toBe(image.entityId);
      expect(result.storageId).toBe(image.storageId);
      expect(result.slug).toBe(image.slug);
      expect(result.order).toBe(image.order);
      expect(result.state).toBe(image.state);
      expect(result.threeSixtyImageStorageId).toBe(
        image.threeSixtyImageStorageId
      );
      expect(result.isStarred).toBe(image.isStarred);
      expect(result.isLoved).toBe(image.isLoved);
      expect(result.title).toBe(image.title);
      expect(result.createdDate).toBe(image.createdDate);
      expect(result.seoDescription).toBe(image.seoDescription);
      expect(result.seoKeywords).toBe(image.seoKeywords);
      expect(result.smallDimension).toEqual(smallDimension);
    });
  });

  describe('loadAddImageVideo', () => {
    it('should load values', () => {
      const slug = faker.lorem.word();

      const result = loadAddImageVideo(slug);

      expect(result.storageId).toBeDefined();
      expect(result.slug).toBe(slug);
    });
  });
});
