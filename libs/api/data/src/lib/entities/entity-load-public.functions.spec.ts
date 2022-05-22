import { ConflictException } from '@nestjs/common';

import faker from '@faker-js/faker';

import {
  Dimension,
  DUMMY_MONGODB_ID,
  EntityType,
  Image,
  ImagePublic,
  ImageState,
  Location,
} from '@dark-rush-photography/shared/types';
import { DocumentModel } from '../schema/document.schema';
import {
  loadEntityMinimalPublic,
  loadEntityPublic,
} from './entity-load-public.functions';

jest.mock('@dark-rush-photography/shared/util', () => ({
  ...jest.requireActual('@dark-rush-photography/shared/util'),
}));
import * as sharedUtil from '@dark-rush-photography/shared/util';

jest.mock('./entity-load.functions', () => ({
  ...jest.requireActual('./entity-load.functions'),
}));
import * as entityLoadFunctions from './entity-load.functions';

jest.mock('../images/image-field-validation.functions', () => ({
  ...jest.requireActual('../images/image-field-validation.functions'),
}));
import * as imageFieldValidationFunctions from '../images/image-field-validation.functions';

jest.mock('../images/image-load.functions', () => ({
  ...jest.requireActual('../images/image-load.functions'),
}));
import * as imageLoadFunctions from '../images/image-load.functions';

describe('entity-load-public.functions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('loadEntityMinimalPublic', () => {
    const documentModel = {
      _id: DUMMY_MONGODB_ID,
      type: faker.random.arrayElement(Object.values(EntityType)),
      group: faker.lorem.word(),
      slug: faker.lorem.word(),
      order: faker.datatype.number(),
      title: faker.lorem.sentence(),
      text: faker.lorem.paragraphs(),
      createdDate: faker.date.recent().toISOString(),
      publishedDate: faker.date.recent().toISOString(),
      starredImageIsCentered: faker.datatype.boolean(),
      tileDimension: {
        width: faker.datatype.number(),
        height: faker.datatype.number(),
      },
    } as unknown as DocumentModel;

    it('should not contain an _id value', () => {
      jest
        .spyOn(sharedUtil, 'getEntityTypeHasStarredImage')
        .mockReturnValue(true);

      jest
        .spyOn(imageFieldValidationFunctions, 'validatePublicStarredImage')
        .mockReturnValue({} as Image);

      jest
        .spyOn(imageLoadFunctions, 'loadImagePublic')
        .mockReturnValue({} as ImagePublic);

      jest
        .spyOn(entityLoadFunctions, 'loadTileDimension')
        .mockReturnValue({} as Dimension);

      const result = loadEntityMinimalPublic({
        _id: DUMMY_MONGODB_ID,
      } as DocumentModel);
      expect('_id' in result).toBe(false);
      expect(result.id).toBe(DUMMY_MONGODB_ID);
    });

    it('should load an entity with all values', () => {
      const mockedGetEntityTypeHasStarredImage = jest
        .spyOn(sharedUtil, 'getEntityTypeHasStarredImage')
        .mockReturnValue(true);

      const mockedValidatePublicStarredImage = jest
        .spyOn(imageFieldValidationFunctions, 'validatePublicStarredImage')
        .mockReturnValue({} as Image);

      const mockedLoadImagePublic = jest
        .spyOn(imageLoadFunctions, 'loadImagePublic')
        .mockReturnValue({} as ImagePublic);

      const mockedLoadTileDimension = jest
        .spyOn(entityLoadFunctions, 'loadTileDimension')
        .mockReturnValue({} as Dimension);

      const result = loadEntityMinimalPublic(documentModel);

      expect(mockedGetEntityTypeHasStarredImage).toBeCalledTimes(1);
      expect(mockedValidatePublicStarredImage).toBeCalledTimes(1);
      expect(mockedLoadImagePublic).toBeCalledTimes(1);
      expect(mockedLoadTileDimension).toBeCalledTimes(1);

      expect(result.type).toBe(documentModel.type);
      expect(result.id).toBe(documentModel._id);
      expect(result.group).toBe(documentModel.group);
      expect(result.slug).toBe(documentModel.slug);
      expect(result.order).toBe(documentModel.order);
      expect(result.title).toBe(documentModel.title);
      expect(result.text).toEqual(documentModel.text);
      expect(result.createdDate).toBe(documentModel.createdDate);
      expect(result.publishedDate).toBe(documentModel.publishedDate);
      expect(result.starredImageIsCentered).toBe(
        documentModel.starredImageIsCentered
      );
      expect(result.starredImage).toBeDefined();
      expect(result.tileDimension).toBeDefined();
    });

    it('should load an entity without starred image if entity does not have a starred image', () => {
      const mockedGetEntityTypeHasStarredImage = jest
        .spyOn(sharedUtil, 'getEntityTypeHasStarredImage')
        .mockReturnValue(false);

      const mockedValidatePublicStarredImage = jest.spyOn(
        imageFieldValidationFunctions,
        'validatePublicStarredImage'
      );

      const mockedLoadImagePublic = jest.spyOn(
        imageLoadFunctions,
        'loadImagePublic'
      );

      const mockedLoadTileDimension = jest
        .spyOn(entityLoadFunctions, 'loadTileDimension')
        .mockReturnValue({} as Dimension);

      const result = loadEntityMinimalPublic(documentModel);

      expect(mockedGetEntityTypeHasStarredImage).toBeCalledTimes(1);
      expect(mockedValidatePublicStarredImage).not.toBeCalled();
      expect(mockedLoadImagePublic).not.toBeCalled();
      expect(result.starredImage).toBeUndefined();
      expect(mockedLoadTileDimension).toBeCalledTimes(1);
    });

    it('should load undefined values', () => {
      const mockedGetEntityTypeHasStarredImage = jest
        .spyOn(sharedUtil, 'getEntityTypeHasStarredImage')
        .mockReturnValue(false);

      const mockedValidatePublicStarredImage = jest.spyOn(
        imageFieldValidationFunctions,
        'validatePublicStarredImage'
      );

      const mockedLoadImagePublic = jest.spyOn(
        imageLoadFunctions,
        'loadImagePublic'
      );

      const mockedLoadTileDimension = jest
        .spyOn(entityLoadFunctions, 'loadTileDimension')
        .mockReturnValue(undefined);

      const result = loadEntityMinimalPublic({
        ...documentModel,
        title: undefined,
        text: undefined,
        createdDate: undefined,
        publishedDate: undefined,
        tileDimension: undefined,
      } as DocumentModel);

      expect(mockedGetEntityTypeHasStarredImage).toBeCalledTimes(1);
      expect(mockedValidatePublicStarredImage).not.toBeCalled();
      expect(mockedLoadImagePublic).not.toBeCalled();
      expect(mockedLoadTileDimension).toBeCalledTimes(1);

      expect(result.title).toBe('');
      expect(result.text).toBe('');
      expect(result.createdDate).toBe('');
      expect(result.publishedDate).toBe('');
      expect(result.starredImage).toBeUndefined();
      expect(result.tileDimension).toBeUndefined();
    });

    it('should throw a conflict exception when starred image is not found', () => {
      const mockedGetEntityTypeHasStarredImage = jest
        .spyOn(sharedUtil, 'getEntityTypeHasStarredImage')
        .mockReturnValue(true);

      const mockedValidatePublicStarredImage = jest
        .spyOn(imageFieldValidationFunctions, 'validatePublicStarredImage')
        .mockImplementation(() => {
          throw new ConflictException();
        });

      const mockedLoadImagePublic = jest.spyOn(
        imageLoadFunctions,
        'loadImagePublic'
      );

      const mockedLoadTileDimension = jest.spyOn(
        entityLoadFunctions,
        'loadTileDimension'
      );

      const result = () => {
        return loadEntityMinimalPublic({
          ...documentModel,
          title: undefined,
          text: undefined,
          createdDate: undefined,
          publishedDate: undefined,
          tileDimension: undefined,
        } as DocumentModel);
      };

      expect(result).toThrow(ConflictException);
      expect(mockedGetEntityTypeHasStarredImage).toBeCalledTimes(1);
      expect(mockedValidatePublicStarredImage).toBeCalledTimes(1);
      expect(mockedLoadImagePublic).not.toBeCalled();
      expect(mockedLoadTileDimension).not.toBeCalled();
    });
  });

  describe('loadEntityPublic', () => {
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

    const documentModel = {
      _id: DUMMY_MONGODB_ID,
      type: faker.random.arrayElement(Object.values(EntityType)),
      group: faker.lorem.word(),
      slug: faker.lorem.word(),
      order: faker.datatype.number(),
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
      images: [{ ...image }, { ...image }, { ...image }],
    } as unknown as DocumentModel;

    it('should not contain an _id value', () => {
      jest
        .spyOn(entityLoadFunctions, 'loadLocation')
        .mockReturnValue({} as Location);

      jest
        .spyOn(imageLoadFunctions, 'loadImagePublic')
        .mockReturnValue({} as ImagePublic);

      const result = loadEntityPublic({
        ...documentModel,
        _id: DUMMY_MONGODB_ID,
      } as DocumentModel);
      expect('_id' in result).toBe(false);
      expect(result.id).toBe(DUMMY_MONGODB_ID);
    });

    it('should load an entity with all values', () => {
      const mockedLoadLocation = jest
        .spyOn(entityLoadFunctions, 'loadLocation')
        .mockReturnValue({} as Location);

      const mockedLoadImagePublic = jest
        .spyOn(imageLoadFunctions, 'loadImagePublic')
        .mockReturnValue({} as ImagePublic);

      const result = loadEntityPublic({
        ...documentModel,
        images: [
          { ...image, state: ImageState.Public },
          { ...image, state: ImageState.Public },
          { ...image, state: ImageState.Public },
        ],
      } as DocumentModel);

      expect(mockedLoadLocation).toBeCalledTimes(1);
      expect(mockedLoadImagePublic).toBeCalledTimes(3);

      expect(result.type).toBe(documentModel.type);
      expect(result.id).toBe(documentModel._id);
      expect(result.group).toBe(documentModel.group);
      expect(result.slug).toBe(documentModel.slug);
      expect(result.order).toBe(documentModel.order);
      expect(result.title).toBe(documentModel.title);
      expect(result.text).toEqual(documentModel.text);
      expect(result.createdDate).toBe(documentModel.createdDate);
      expect(result.publishedDate).toBe(documentModel.publishedDate);
      expect(result.seoDescription).toBe(documentModel.seoDescription);
      expect(result.seoKeywords).toBe(documentModel.seoKeywords);
      expect(result.location).toBeDefined();
      expect(result.images.length).toBe(3);
    });

    it('should load an entity with all values without images if none are public', () => {
      const mockedLoadLocation = jest
        .spyOn(entityLoadFunctions, 'loadLocation')
        .mockReturnValue({} as Location);

      const mockedLoadImagePublic = jest
        .spyOn(imageLoadFunctions, 'loadImagePublic')
        .mockReturnValue({} as ImagePublic);

      const result = loadEntityPublic({
        ...documentModel,
        images: [
          { ...image, state: ImageState.New },
          { ...image, state: ImageState.Selected },
          { ...image, state: ImageState.Archived },
        ],
      } as DocumentModel);

      expect(mockedLoadLocation).toBeCalledTimes(1);
      expect(mockedLoadImagePublic).not.toBeCalled();

      expect(result.type).toBe(documentModel.type);
      expect(result.id).toBe(documentModel._id);
      expect(result.group).toBe(documentModel.group);
      expect(result.slug).toBe(documentModel.slug);
      expect(result.order).toBe(documentModel.order);
      expect(result.title).toBe(documentModel.title);
      expect(result.text).toEqual(documentModel.text);
      expect(result.createdDate).toBe(documentModel.createdDate);
      expect(result.publishedDate).toBe(documentModel.publishedDate);
      expect(result.seoDescription).toBe(documentModel.seoDescription);
      expect(result.seoKeywords).toBe(documentModel.seoKeywords);
      expect(result.location).toBeDefined();
      expect(result.images.length).toBe(0);
    });

    it('should load undefined values', () => {
      const mockedLoadLocation = jest
        .spyOn(entityLoadFunctions, 'loadLocation')
        .mockReturnValue(undefined);

      jest
        .spyOn(imageLoadFunctions, 'loadImagePublic')
        .mockReturnValue({} as ImagePublic);

      const result = loadEntityPublic({
        ...documentModel,
        title: undefined,
        text: undefined,
        createdDate: undefined,
        publishedDate: undefined,
        seoDescription: undefined,
        location: undefined,
      } as DocumentModel);

      expect(mockedLoadLocation).toBeCalledTimes(1);

      expect(result.title).toBe('');
      expect(result.text).toBe('');
      expect(result.createdDate).toBe('');
      expect(result.publishedDate).toBe('');
      expect(result.seoDescription).toBe('');
      expect(result.location).toBeUndefined();
    });
  });
});
