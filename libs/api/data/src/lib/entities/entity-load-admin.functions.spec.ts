/* eslint-disable @typescript-eslint/no-explicit-any */
import * as faker from 'faker';

import {
  DUMMY_MONGODB_ID,
  EntityType,
  Image,
  ImageAdmin,
  Location,
  LocationDefined,
  Video,
  WatermarkedType,
} from '@dark-rush-photography/shared/types';
import { DocumentModel } from '../schema/document.schema';
import {
  loadEntityAdmin,
  loadEntityMinimalAdmin,
} from './entity-load-admin.functions';

jest.mock('../content/content-load.functions', () => ({
  ...jest.requireActual('../content/content-load.functions'),
}));
import * as contentLoadFunctions from '../content/content-load.functions';

describe('entity-load-admin.functions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

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
    location: {} as Location,
    starredImageIsCentered: faker.datatype.boolean(),
    text: [
      faker.lorem.paragraph(),
      faker.lorem.paragraph(),
      faker.lorem.paragraph(),
    ],
    images: [{} as Image],
    videos: [{} as Video],
    isPublic: faker.datatype.boolean(),
    isPublished: faker.datatype.boolean(),
    isProcessing: faker.datatype.boolean(),
  } as unknown as DocumentModel;

  describe('loadEntityMinimalAdmin', () => {
    it('should not contain an _id value', () => {
      const result = loadEntityMinimalAdmin(documentModel);
      expect('_id' in result).toBe(false);
    });

    it('should load input values', () => {
      const result = loadEntityMinimalAdmin(documentModel);

      expect(result.type).toBe(documentModel.type);
      expect(result.id).toBe(documentModel._id);
      expect(result.watermarkedType).toBe(documentModel.watermarkedType);
      expect(result.group).toBe(documentModel.group);
      expect(result.slug).toBe(documentModel.slug);
    });
  });

  describe('loadEntityAdmin', () => {
    let mockedLoadLocation: any;
    let mockedLoadImageAdmin: any;
    let mockedLoadVideo: any;

    beforeEach(() => {
      mockedLoadLocation = jest
        .spyOn(contentLoadFunctions, 'loadLocation')
        .mockReturnValue({} as LocationDefined);

      mockedLoadImageAdmin = jest
        .spyOn(contentLoadFunctions, 'loadImageAdmin')
        .mockReturnValue({} as ImageAdmin);

      mockedLoadVideo = jest
        .spyOn(contentLoadFunctions, 'loadVideo')
        .mockReturnValue({} as Video);
    });

    it('should not contain an _id value', () => {
      const result = loadEntityAdmin(documentModel);
      expect('_id' in result).toBe(false);
    });

    it('should load an entity with all values', () => {
      const result = loadEntityAdmin(documentModel);

      expect(mockedLoadLocation).toBeCalled();
      expect(mockedLoadImageAdmin).toBeCalled();
      expect(mockedLoadVideo).toBeCalled();

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
      expect(result.starredImageIsCentered).toBe(
        documentModel.starredImageIsCentered
      );
      expect(result.text).toEqual(documentModel.text);
      expect(result.isPublic).toBe(documentModel.isPublic);
      expect(result.isPublished).toBe(documentModel.isPublished);
      expect(result.isProcessing).toBe(documentModel.isProcessing);
    });

    it('should load empty string values when they are not provided', () => {
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
});
