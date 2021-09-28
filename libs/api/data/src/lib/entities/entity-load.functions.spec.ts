import * as faker from 'faker';

import {
  DUMMY_MONGODB_ID,
  EntityType,
  Image,
  ImageDimension,
  ImageDimensionType,
  ImageState,
  Video,
  WatermarkedType,
} from '@dark-rush-photography/shared/types';
import { DocumentModel } from '../schema/document.schema';
import {
  loadDocumentModelsArray,
  loadEntityAdmin,
  loadEntityMinimal,
  loadNewEntity,
} from './entity-load.functions';

describe('entity-load.functions', () => {
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

  const video: Video = {
    id: faker.datatype.uuid(),
    entityId: DUMMY_MONGODB_ID,
    blobPathId: faker.datatype.uuid(),
    fileName: faker.system.fileName(),
  };

  const documentModel: DocumentModel = {
    _id: DUMMY_MONGODB_ID,
    type: faker.random.arrayElement(Object.values(EntityType)),
    watermarkedType: faker.random.arrayElement(Object.values(WatermarkedType)),
    group: faker.lorem.word(),
    slug: faker.lorem.word(),
    order: faker.datatype.number(),
    title: faker.lorem.sentence(),
    seoDescription: faker.lorem.sentences(),
    seoKeywords: [faker.lorem.word(), faker.lorem.word(), faker.lorem.word()],
    dateCreated: faker.date.recent().toISOString(),
    datePublished: faker.date.recent().toISOString(),
    location: {
      place: faker.company.companyName(),
      street: faker.address.streetAddress(),
      city: faker.address.city(),
      stateOrProvince: faker.address.state(),
      zipCode: faker.address.zipCode(),
      country: faker.address.country(),
    },
    starredImageIsCentered: faker.datatype.boolean(),
    text: [
      faker.lorem.paragraph(),
      faker.lorem.paragraph(),
      faker.lorem.paragraph(),
    ],
    images: [{ ...image }, { ...image }],
    imageDimensions: [
      { ...imageDimension },
      { ...imageDimension },
      { ...imageDimension },
      { ...imageDimension },
    ],
    videos: [{ ...video }],
    isPublic: faker.datatype.boolean(),
    isPublishing: faker.datatype.boolean(),
    isPublished: faker.datatype.boolean(),
  } as DocumentModel;

  describe('loadNewEntity', () => {
    it('should load input values', () => {
      const result = loadNewEntity(
        documentModel.type,
        documentModel.watermarkedType,
        documentModel.group,
        documentModel.slug
      );

      expect(result.type).toBe(documentModel.type);
      expect(result.googleDriveFolderId).toBeUndefined();
      expect(result.watermarkedType).toBe(documentModel.watermarkedType);
      expect(result.group).toBe(documentModel.group);
      expect(result.slug).toBe(documentModel.slug);
    });

    it('should load input values with google drive folder id', () => {
      const googleDriveFolderId = faker.datatype.uuid();

      const result = loadNewEntity(
        documentModel.type,
        documentModel.watermarkedType,
        documentModel.group,
        documentModel.slug,
        googleDriveFolderId
      );

      expect(result.googleDriveFolderId).toBe(googleDriveFolderId);
    });
  });

  describe('loadEntityMinimal', () => {
    it('should not contain an _id value', () => {
      const result = loadEntityMinimal(documentModel);
      expect('_id' in result).toBe(false);
    });

    it('should load a minimal entity', () => {
      const result = loadEntityMinimal(documentModel);

      expect(result.type).toBe(documentModel.type);
      expect(result.id).toBe(documentModel._id);
      expect(result.watermarkedType).toBe(documentModel.watermarkedType);
      expect(result.group).toBe(documentModel.group);
      expect(result.slug).toBe(documentModel.slug);
    });
  });

  describe('loadEntityAdmin', () => {
    it('should not contain an _id value', () => {
      const result = loadEntityAdmin(documentModel);
      expect('_id' in result).toBe(false);
    });

    it('should load an entity with all values', () => {
      const result = loadEntityAdmin(documentModel);

      expect(result.type).toBe(documentModel.type);
      expect(result.id).toBe(documentModel._id);
      expect(result.watermarkedType).toBe(documentModel.watermarkedType);
      expect(result.group).toBe(documentModel.group);
      expect(result.slug).toBe(documentModel.slug);
      expect(result.order).toBe(documentModel.order);
      expect(result.title).toBe(documentModel.title);
      expect(result.seoDescription).toBe(documentModel.seoDescription);
      expect(result.seoKeywords).toEqual(documentModel.seoKeywords);
      expect(result.dateCreated).toBe(documentModel.dateCreated);
      expect(result.datePublished).toBe(documentModel.datePublished);
      expect(result.location).toEqual(documentModel.location);
      expect(result.starredImageIsCentered).toBe(
        documentModel.starredImageIsCentered
      );
      expect(result.text).toEqual(documentModel.text);
      expect(result.images).toEqual(documentModel.images);
      expect(result.imageDimensions).toEqual(documentModel.imageDimensions);
      expect(result.videos).toEqual(documentModel.videos);
      expect(result.isPublic).toBe(documentModel.isPublic);
      expect(result.isPublishing).toBe(documentModel.isPublishing);
      expect(result.isPublished).toBe(documentModel.isPublished);
    });

    it('should load a location with empty string values when they are not provided', () => {
      const result = loadEntityAdmin({
        ...documentModel,
        title: undefined,
        seoDescription: undefined,
        dateCreated: undefined,
        datePublished: undefined,
      } as DocumentModel);

      expect(result.title).toBe('');
      expect(result.seoDescription).toBe('');
      expect(result.dateCreated).toBe('');
      expect(result.datePublished).toBe('');
    });
  });

  describe('loadDocumentModelsArray', () => {
    it('should load array when document model array is provided', () => {
      const result = loadDocumentModelsArray([
        {} as DocumentModel,
        {} as DocumentModel,
      ]);
      expect(result).toHaveLength(2);
    });

    it('should load array when document model provided', () => {
      const result = loadDocumentModelsArray({} as DocumentModel);
      expect(result).toHaveLength(1);
    });
  });
});
