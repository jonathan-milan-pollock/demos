/* eslint-disable @typescript-eslint/no-explicit-any */
import * as faker from 'faker';

import {
  DUMMY_MONGODB_ID,
  EntityType,
  Image,
  ImageAdmin,
  Location,
  LocationDefined,
  ImageVideo,
  WatermarkedType,
} from '@dark-rush-photography/shared/types';
import { DocumentModel } from '../schema/document.schema';
import {
  loadEntityAdmin,
  loadEntityMinimalAdmin,
} from './entity-load-admin.functions';

jest.mock('../images/image-load.functions', () => ({
  ...jest.requireActual('../images/image-load.functions'),
}));
import * as imageLoadFunctions from '../images/image-load.functions';

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
    createdDate: faker.date.recent().toISOString(),
    publishedDate: faker.date.recent().toISOString(),
    location: {} as Location,
    starredImageIsCentered: faker.datatype.boolean(),
    text: [
      faker.lorem.paragraph(),
      faker.lorem.paragraph(),
      faker.lorem.paragraph(),
    ],
    images: [{} as Image],
    videos: [{} as ImageVideo],
    isPublic: faker.datatype.boolean(),
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
        .spyOn(imageLoadFunctions, 'loadLocation')
        .mockReturnValue({} as LocationDefined);

      mockedLoadImageAdmin = jest
        .spyOn(imageLoadFunctions, 'loadImageAdmin')
        .mockReturnValue({} as ImageAdmin);

      mockedLoadVideo = jest
        .spyOn(imageLoadFunctions, 'loadVideo')
        .mockReturnValue({} as ImageVideo);
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
      expect(result.createdDate).toBe(documentModel.createdDate);
      expect(result.publishedDate).toBe(documentModel.publishedDate);
      expect(result.starredImageIsCentered).toBe(
        documentModel.starredImageIsCentered
      );
      expect(result.text).toEqual(documentModel.text);
      expect(result.isPublic).toBe(documentModel.isPublic);
    });

    it('should load empty string values when they are not provided', () => {
      const result = loadEntityAdmin({
        ...documentModel,
        title: undefined,
        seoDescription: undefined,
        createdDate: undefined,
        publishedDate: undefined,
      } as DocumentModel);

      expect(result.title).toBe('');
      expect(result.seoDescription).toBe('');
      expect(result.createdDate).toBe('');
      expect(result.publishedDate).toBe('');
    });
  });
});
