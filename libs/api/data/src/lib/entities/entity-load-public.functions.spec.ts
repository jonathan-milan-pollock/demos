import * as faker from 'faker';

import {
  DUMMY_MONGODB_ID,
  EntityType,
  Image,
  ImagePublic,
  ImageState,
  Location,
  LocationDefined,
  Video,
  WatermarkedType,
} from '@dark-rush-photography/shared/types';
import { DocumentModel } from '../schema/document.schema';
import {
  loadEntityMinimalPublic,
  loadEntityPublic,
} from './entity-load-public.functions';

jest.mock('../content/content-load.functions', () => ({
  ...jest.requireActual('../content/content-load.functions'),
}));
import * as contentLoadFunctions from '../content/content-load.functions';

describe('entity-load-public.functions', () => {
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
    dateCreated: faker.date.recent().toISOString(),
    datePublished: faker.date.recent().toISOString(),
    smallResolution: {
      width: faker.datatype.number(),
      height: faker.datatype.number(),
    },
    isThreeSixty: faker.datatype.boolean(),
  };

  const imagePublic: ImagePublic = {
    fileName: faker.system.fileName(),
    storageId: faker.datatype.uuid(),
    order: faker.datatype.number(),
    title: faker.lorem.sentence(),
    seoDescription: faker.lorem.paragraph(),
    seoKeywords: [
      faker.lorem.word().toLowerCase(),
      faker.lorem.word().toLowerCase(),
      faker.lorem.word().toLowerCase(),
    ],
    dateCreated: faker.date.recent().toISOString(),
    datePublished: faker.date.recent().toISOString(),
    smallResolution: {
      width: faker.datatype.number(),
      height: faker.datatype.number(),
    },
    isThreeSixty: faker.datatype.boolean(),
  };

  const video: Video = {
    id: faker.datatype.uuid(),
    entityId: DUMMY_MONGODB_ID,
    storageId: faker.datatype.uuid(),
    fileName: faker.system.fileName(),
  };

  const location: Location = {
    place: faker.company.companyName(),
    street: faker.address.streetAddress(),
    city: faker.address.city(),
    stateOrProvince: faker.address.state(),
    zipCode: faker.address.zipCode(),
    country: faker.address.country(),
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
    location,
    starredImageIsCentered: faker.datatype.boolean(),
    text: [
      faker.lorem.paragraph(),
      faker.lorem.paragraph(),
      faker.lorem.paragraph(),
    ],
    images: [{ ...image }, { ...image }],
    videos: [{ ...video }],
    isPublic: faker.datatype.boolean(),
    isPublished: faker.datatype.boolean(),
    isProcessing: faker.datatype.boolean(),
  } as DocumentModel;

  describe('loadEntityMinimalPublic', () => {
    it('should not contain an _id value', () => {
      //const result = loadEntityMinimalPublic(documentModel);
      //expect('_id' in result).toBe(false);
    });

    it('should load input values', () => {
      //const result = loadEntityMinimalPublic(documentModel);
      //expect(result.type).toBe(documentModel.type);
      //expect(result.group).toBe(documentModel.group);
      //expect(result.order).toBe(documentModel.order);
      //expect(result.title).toBe(documentModel.title);
      //expect(result.dateCreated).toBe(documentModel.dateCreated);
      //expect(result.hasStarredImage).toBe(true);
      //expect(result.starredImageIsCentered).toBe(
      //  documentModel.starredImageIsCentered
      //);
      //expect(result.starredImage).toEqual({});
    });
  });

  describe('loadEntityPublic', () => {
    beforeEach(() => {
      jest
        .spyOn(contentLoadFunctions, 'loadLocation')
        .mockReturnValue({ ...location } as LocationDefined);

      jest
        .spyOn(contentLoadFunctions, 'loadImagePublic')
        .mockReturnValue({ ...imagePublic } as ImagePublic);
    });

    it('should not contain an _id value', () => {
      const result = loadEntityPublic(documentModel);
      expect('_id' in result).toBe(false);
    });

    it('should load an entity with all values', () => {
      const result = loadEntityPublic(documentModel);

      expect(result.type).toBe(documentModel.type);
      expect(result.group).toBe(documentModel.group);
      expect(result.slug).toBe(documentModel.slug);
      expect(result.order).toBe(documentModel.order);
      expect(result.title).toBe(documentModel.title);
      expect(result.seoDescription).toBe(documentModel.seoDescription);
      expect(result.seoKeywords).toEqual(documentModel.seoKeywords);
      expect(result.dateCreated).toBe(documentModel.dateCreated);
      expect(result.datePublished).toBe(documentModel.datePublished);
      expect(result.location).toEqual(documentModel.location);
      expect(result.text).toEqual(documentModel.text);
      //expect(result.images).toEqual(documentModel.images);
    });

    it('should load empty string values when they are not provided', () => {
      const result = loadEntityPublic({
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
});
