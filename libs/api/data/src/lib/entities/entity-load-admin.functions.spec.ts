/* eslint-disable @typescript-eslint/no-explicit-any */
import faker from '@faker-js/faker';

import {
  Dimension,
  DUMMY_MONGODB_ID,
  EntityType,
  Image,
  ImageAdmin,
  ImageVideo,
  Location,
} from '@dark-rush-photography/shared/types';
import { DocumentModel } from '../schema/document.schema';
import { loadEntityAdmin } from './entity-load-admin.functions';

jest.mock('@dark-rush-photography/shared/util', () => ({
  ...jest.requireActual('@dark-rush-photography/shared/util'),
}));
import * as sharedUtil from '@dark-rush-photography/shared/util';

jest.mock('./entity-load.functions', () => ({
  ...jest.requireActual('./entity-load.functions'),
}));
import * as entityLoadFunctions from './entity-load.functions';

jest.mock('../images/image-load.functions', () => ({
  ...jest.requireActual('../images/image-load.functions'),
}));
import * as imageLoadFunctions from '../images/image-load.functions';

jest.mock('../images/image-video-load.functions', () => ({
  ...jest.requireActual('../images/image-video-load.functions'),
}));
import * as imageVideoLoadFunctions from '../images/image-video-load.functions';

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
        _id: DUMMY_MONGODB_ID,
        place: faker.company.companyName(),
        city: faker.address.city(),
        stateOrProvince: faker.address.state(),
        country: faker.address.country(),
      },
      starredImageIsCentered: faker.datatype.boolean(),
      imageVideo: {
        _id: DUMMY_MONGODB_ID,
        storageId: faker.datatype.uuid(),
        slug: faker.lorem.word(),
      },
      tileDimension: {
        _id: DUMMY_MONGODB_ID,
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

      const mockedFindFirstImage = jest.spyOn(
        imageLoadFunctions,
        'findFirstImage'
      );

      jest
        .spyOn(entityLoadFunctions, 'loadLocation')
        .mockReturnValue({} as Location);

      jest
        .spyOn(imageLoadFunctions, 'loadImageAdmin')
        .mockReturnValue({} as ImageAdmin);

      jest
        .spyOn(imageVideoLoadFunctions, 'loadImageVideo')
        .mockReturnValue({} as ImageVideo);

      jest
        .spyOn(entityLoadFunctions, 'loadTileDimension')
        .mockReturnValue({} as Dimension);

      expect(mockedFindFirstImage).not.toBeCalled();

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

      const mockedGetEntityTypeHasStarredImage = jest
        .spyOn(sharedUtil, 'getEntityTypeHasStarredImage')
        .mockReturnValue(true);

      const mockedFindFirstImage = jest.spyOn(
        imageLoadFunctions,
        'findFirstImage'
      );

      const mockedLoadLocation = jest
        .spyOn(entityLoadFunctions, 'loadLocation')
        .mockReturnValue({} as Location);

      const mockedLoadImageAdmin = jest
        .spyOn(imageLoadFunctions, 'loadImageAdmin')
        .mockReturnValue({} as ImageAdmin);

      const mockedLoadImageVideo = jest
        .spyOn(imageVideoLoadFunctions, 'loadImageVideo')
        .mockReturnValue({} as ImageVideo);

      const mockedLoadTileDimension = jest
        .spyOn(entityLoadFunctions, 'loadTileDimension')
        .mockReturnValue({} as Dimension);

      const result = loadEntityAdmin(documentModel);

      expect(mockedFindStarredPublishImage).toBeCalledTimes(1);
      expect(mockedGetEntityTypeHasStarredImage).toBeCalledTimes(1);
      expect(mockedFindFirstImage).not.toBeCalled();
      expect(mockedLoadLocation).toBeCalledTimes(1);
      expect(mockedLoadImageAdmin).toBeCalledTimes(1);
      expect(mockedLoadImageVideo).toBeCalledTimes(1);
      expect(mockedLoadTileDimension).toBeCalledTimes(1);

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
      expect(result.location).toBeDefined();
      expect(result.starredImageIsCentered).toBe(
        documentModel.starredImageIsCentered
      );
      expect(result.starredPublishOrFirstImage).toBeDefined();
      expect(result.imageVideo).toBeDefined();
      expect(result.tileDimension).toBeDefined();
    });

    it('should load an entity with first image if starred image is not available', () => {
      const mockedFindStarredPublishImage = jest
        .spyOn(imageLoadFunctions, 'findStarredPublishImage')
        .mockReturnValue(undefined);

      const mockedGetEntityTypeHasStarredImage = jest.spyOn(
        sharedUtil,
        'getEntityTypeHasStarredImage'
      );

      const mockedFindFirstImage = jest
        .spyOn(imageLoadFunctions, 'findFirstImage')
        .mockReturnValue({} as Image);

      jest
        .spyOn(entityLoadFunctions, 'loadLocation')
        .mockReturnValue({} as Location);

      const mockedLoadImageAdmin = jest.spyOn(
        imageLoadFunctions,
        'loadImageAdmin'
      );

      jest
        .spyOn(imageVideoLoadFunctions, 'loadImageVideo')
        .mockReturnValue({} as ImageVideo);

      jest
        .spyOn(entityLoadFunctions, 'loadTileDimension')
        .mockReturnValue({} as Dimension);

      const result = loadEntityAdmin(documentModel);

      expect(mockedFindStarredPublishImage).toBeCalledTimes(1);
      expect(mockedGetEntityTypeHasStarredImage).not.toBeCalled();
      expect(mockedFindFirstImage).toBeCalledTimes(1);
      expect(mockedLoadImageAdmin).toBeCalledTimes(1);
      expect(result.starredPublishOrFirstImage).toBeDefined();
    });

    it('should load an entity without starred or first image if not available', () => {
      const mockedFindStarredPublishImage = jest
        .spyOn(imageLoadFunctions, 'findStarredPublishImage')
        .mockReturnValue(undefined);

      const mockedGetEntityTypeHasStarredImage = jest.spyOn(
        sharedUtil,
        'getEntityTypeHasStarredImage'
      );

      const mockedFindFirstImage = jest
        .spyOn(imageLoadFunctions, 'findFirstImage')
        .mockReturnValue(undefined);

      jest
        .spyOn(entityLoadFunctions, 'loadLocation')
        .mockReturnValue({} as Location);

      const mockedLoadImageAdmin = jest.spyOn(
        imageLoadFunctions,
        'loadImageAdmin'
      );

      jest
        .spyOn(imageVideoLoadFunctions, 'loadImageVideo')
        .mockReturnValue({} as ImageVideo);

      jest
        .spyOn(entityLoadFunctions, 'loadTileDimension')
        .mockReturnValue({} as Dimension);

      const result = loadEntityAdmin(documentModel);

      expect(mockedFindStarredPublishImage).toBeCalledTimes(1);
      expect(mockedGetEntityTypeHasStarredImage).not.toBeCalled();
      expect(mockedFindFirstImage).toBeCalledTimes(1);
      expect(mockedLoadImageAdmin).not.toBeCalled();
      expect(result.starredPublishOrFirstImage).toBeUndefined();
    });

    it('should load undefined values', () => {
      const mockedFindStarredPublishImage = jest
        .spyOn(imageLoadFunctions, 'findStarredPublishImage')
        .mockReturnValue(undefined);

      const mockedGetEntityTypeHasStarredImage = jest.spyOn(
        sharedUtil,
        'getEntityTypeHasStarredImage'
      );

      const mockedFindFirstImage = jest
        .spyOn(imageLoadFunctions, 'findFirstImage')
        .mockReturnValue(undefined);

      const mockedLoadLocation = jest
        .spyOn(entityLoadFunctions, 'loadLocation')
        .mockReturnValue(undefined);

      const mockedLoadImageAdmin = jest.spyOn(
        imageLoadFunctions,
        'loadImageAdmin'
      );

      const mockedLoadImageVideo = jest
        .spyOn(imageVideoLoadFunctions, 'loadImageVideo')
        .mockReturnValue(undefined);

      const mockedLoadTileDimension = jest
        .spyOn(entityLoadFunctions, 'loadTileDimension')
        .mockReturnValue(undefined);

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

      expect(mockedFindStarredPublishImage).toBeCalledTimes(1);
      expect(mockedGetEntityTypeHasStarredImage).not.toBeCalled();
      expect(mockedFindFirstImage).toBeCalledTimes(1);
      expect(mockedLoadLocation).toBeCalledTimes(1);
      expect(mockedLoadImageAdmin).not.toBeCalled();
      expect(mockedLoadImageVideo).toBeCalledTimes(1);
      expect(mockedLoadTileDimension).toBeCalledTimes(1);

      expect(result.title).toBeUndefined();
      expect(result.text).toBeUndefined();
      expect(result.createdDate).toBeUndefined();
      expect(result.publishedDate).toBeUndefined();
      expect(result.seoDescription).toBeUndefined();
      expect(result.location).toBeUndefined();
      expect(result.starredPublishOrFirstImage).toBeUndefined();
      expect(result.imageVideo).toBeUndefined();
      expect(result.tileDimension).toBeUndefined();
    });
  });
});
