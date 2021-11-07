/* eslint-disable @typescript-eslint/no-explicit-any */
import * as faker from 'faker';

import {
  DUMMY_MONGODB_ID,
  EntityType,
  Image,
  ImageAdmin,
} from '@dark-rush-photography/shared/types';
import { DocumentModel } from '../schema/document.schema';
import { loadEntityAdmin } from './entity-load-admin.functions';

jest.mock('@dark-rush-photography/shared/util', () => ({
  ...jest.requireActual('@dark-rush-photography/shared/util'),
}));
import * as sharedUtil from '@dark-rush-photography/shared/util';

jest.mock('../images/image-load.functions', () => ({
  ...jest.requireActual('../images/image-load.functions'),
}));
import * as imageLoadFunctions from '../images/image-load.functions';

describe('entity-load-admin.functions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('loadEntityAdmin', () => {
    const documentModel = {
      _id: DUMMY_MONGODB_ID,
      type: faker.random.arrayElement(Object.values(EntityType)),
      group: faker.lorem.word(),
      slug: faker.lorem.word(),
      order: faker.datatype.number(),
      isPublic: faker.datatype.boolean(),
      title: faker.lorem.sentence(),
      text: faker.lorem.paragraphs(),
      createdDate: faker.date.recent().toISOString(),
      publishedDate: faker.date.recent().toISOString(),
      seoDescription: faker.lorem.sentences(),
      seoKeywords: [faker.lorem.word(), faker.lorem.word(), faker.lorem.word()],
      location: {
        place: faker.company.companyName(),
        city: faker.address.city(),
        stateOrProvince: faker.address.state(),
        country: faker.address.country(),
      },
      starredImageIsCentered: faker.datatype.boolean(),
      imageVideo: {
        storageId: faker.datatype.uuid(),
        slug: faker.lorem.word(),
      },
      tileDimension: {
        width: faker.datatype.number(),
        height: faker.datatype.number(),
      },
    } as unknown as DocumentModel;

    it('should not contain an _id value', () => {
      jest
        .spyOn(imageLoadFunctions, 'findStarredPublishImage')
        .mockReturnValue({} as Image);

      jest
        .spyOn(sharedUtil, 'getEntityTypeHasStarredImage')
        .mockReturnValue(true);

      jest
        .spyOn(imageLoadFunctions, 'loadImageAdmin')
        .mockReturnValue({} as ImageAdmin);

      const result = loadEntityAdmin({
        _id: DUMMY_MONGODB_ID,
      } as DocumentModel);
      expect('_id' in result).toBe(false);
      expect(result.id).toBe(DUMMY_MONGODB_ID);
    });

    it('should load an entity with all values', () => {
      const mockedFindStarredPublishImage = jest
        .spyOn(imageLoadFunctions, 'findStarredPublishImage')
        .mockReturnValue({} as Image);

      jest
        .spyOn(sharedUtil, 'getEntityTypeHasStarredImage')
        .mockReturnValue(true);

      const mockedLoadImageAdmin = jest
        .spyOn(imageLoadFunctions, 'loadImageAdmin')
        .mockReturnValue({} as ImageAdmin);

      const result = loadEntityAdmin(documentModel);

      expect(mockedFindStarredPublishImage).toBeCalledTimes(1);
      expect(mockedLoadImageAdmin).toBeCalledTimes(1);

      expect(result.type).toBe(documentModel.type);
      expect(result.id).toBe(documentModel._id);
      expect(result.group).toBe(documentModel.group);
      expect(result.slug).toBe(documentModel.slug);
      expect(result.order).toBe(documentModel.order);
      expect(result.isPublic).toBe(documentModel.isPublic);
      expect(result.title).toBe(documentModel.title);
      expect(result.text).toEqual(documentModel.text);
      expect(result.createdDate).toBe(documentModel.createdDate);
      expect(result.publishedDate).toBe(documentModel.publishedDate);
      expect(result.seoDescription).toBe(documentModel.seoDescription);
      expect(result.seoKeywords).toEqual(documentModel.seoKeywords);
      expect(result.location).toEqual(documentModel.location);
      expect(result.starredImageIsCentered).toBe(
        documentModel.starredImageIsCentered
      );
      expect(result.starredPublishOrFirstImage).toBeDefined();
      expect(result.imageVideo).toEqual(documentModel.imageVideo);
      expect(result.tileDimension).toEqual(documentModel.tileDimension);
    });

    it('should load an entity with first image if starred image is not available', () => {
      const mockedFindStarredPublishImage = jest
        .spyOn(imageLoadFunctions, 'findStarredPublishImage')
        .mockReturnValue(undefined);

      jest
        .spyOn(sharedUtil, 'getEntityTypeHasStarredImage')
        .mockReturnValue(faker.datatype.boolean());

      const mockedFindFirstImage = jest
        .spyOn(imageLoadFunctions, 'findFirstImage')
        .mockReturnValue({} as Image);

      const mockedLoadImageAdmin = jest.spyOn(
        imageLoadFunctions,
        'loadImageAdmin'
      );

      const result = loadEntityAdmin(documentModel);

      expect(mockedFindStarredPublishImage).toBeCalledTimes(1);
      expect(mockedFindFirstImage).toBeCalledTimes(1);
      expect(mockedLoadImageAdmin).toBeCalledTimes(1);
      expect(result.starredPublishOrFirstImage).toBeDefined();
    });

    it('should load an entity without starred or first image if not available', () => {
      const mockedFindStarredPublishImage = jest
        .spyOn(imageLoadFunctions, 'findStarredPublishImage')
        .mockReturnValue(undefined);

      jest
        .spyOn(sharedUtil, 'getEntityTypeHasStarredImage')
        .mockReturnValue(true);

      const mockedFindFirstImage = jest
        .spyOn(imageLoadFunctions, 'findFirstImage')
        .mockReturnValue(undefined);

      const mockedLoadImageAdmin = jest.spyOn(
        imageLoadFunctions,
        'loadImageAdmin'
      );

      const result = loadEntityAdmin(documentModel);

      expect(mockedFindStarredPublishImage).toBeCalledTimes(1);
      expect(mockedFindFirstImage).toBeCalledTimes(1);
      expect(mockedLoadImageAdmin).not.toBeCalled();
      expect(result.starredPublishOrFirstImage).not.toBeDefined();
    });

    it('should load undefined values', () => {
      const result = loadEntityAdmin({
        ...documentModel,
        title: undefined,
        text: undefined,
        createdDate: undefined,
        publishedDate: undefined,
        seoDescription: undefined,
        location: undefined,
        imageVideo: undefined,
        tileDimension: undefined,
      } as DocumentModel);

      expect(result.title).toBeUndefined();
      expect(result.text).toBeUndefined();
      expect(result.createdDate).toBeUndefined();
      expect(result.publishedDate).toBeUndefined();
      expect(result.seoDescription).toBeUndefined();
      expect(result.location).toBeUndefined();
      expect(result.imageVideo).toBeUndefined();
      expect(result.tileDimension).toBeUndefined();
    });
  });
});
