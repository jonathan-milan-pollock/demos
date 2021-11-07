/* eslint-disable @typescript-eslint/no-explicit-any */
import { ConflictException } from '@nestjs/common';

import * as faker from 'faker';

import {
  DUMMY_MONGODB_ID,
  EntityType,
  Image,
  ImageState,
} from '@dark-rush-photography/shared/types';
import { DocumentModel } from '../schema/document.schema';
import { validatePublishEntity } from './entity-publish-validation.functions';

jest.mock('./entity-field-validation.functions', () => ({
  ...jest.requireActual('./entity-field-validation.functions'),
}));
import * as entityFieldValidationFunctions from './entity-field-validation.functions';

jest.mock('../images/image-field-validation.functions', () => ({
  ...jest.requireActual('../images/image-field-validation.functions'),
}));
import * as imageFieldValidationFunctions from '../images/image-field-validation.functions';

describe('entity-public-validation.functions', () => {
  let mockedValidateEntityGroup: any;
  let mockedValidateEntitySlug: any;
  let mockedValidateEntityOrder: any;
  let mockedValidateEntityTitle: any;
  let mockedValidateEntityText: any;
  let mockedValidateEntityCreatedDate: any;
  let mockedValidateEntityPublishedDate: any;
  let mockedValidateEntitySeoDescription: any;
  let mockedValidateEntitySeoKeywords: any;
  let mockedValidateEntityLocation: any;
  let mockedValidateOnePublishImage: any;
  let mockedValidatePublishImagesHaveStorageIds: any;
  let mockedValidatePublishImagesHaveSlugs: any;
  let mockedValidatePublishThreeSixtyImages: any;
  let mockedValidatePublishImagesAreNotStarredAndLoved: any;
  let mockedValidatePublishStarredImage: any;
  let mockedValidatePublishLovedImages: any;
  let mockedValidatePublishImagesHaveTitles: any;
  let mockedValidatePublishImagesHaveSeoDescriptions: any;
  let mockedValidatePublishImagesHaveSeoKeywords: any;
  let mockedValidatePublishImagesHaveSmallDimensions: any;
  let mockedValidateEntityTileDimension: any;

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    const image = {
      id: faker.datatype.uuid(),
      entityId: DUMMY_MONGODB_ID,
      storageId: faker.datatype.uuid(),
      slug: faker.lorem.word(),
      order: faker.datatype.number(),
      state: faker.random.arrayElement(Object.values(ImageState)),
      isThreeSixtyImage: faker.datatype.boolean(),
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

    mockedValidateEntityGroup = jest
      .spyOn(entityFieldValidationFunctions, 'validateEntityGroup')
      .mockReturnValue(faker.lorem.word());

    mockedValidateEntitySlug = jest
      .spyOn(entityFieldValidationFunctions, 'validateEntitySlug')
      .mockReturnValue(faker.lorem.word());

    mockedValidateEntityOrder = jest
      .spyOn(entityFieldValidationFunctions, 'validateEntityOrder')
      .mockReturnValue(faker.datatype.number({ min: 0 }));

    mockedValidateEntityTitle = jest
      .spyOn(entityFieldValidationFunctions, 'validateEntityTitle')
      .mockReturnValue(faker.lorem.sentence());

    mockedValidateEntityText = jest
      .spyOn(entityFieldValidationFunctions, 'validateEntityText')
      .mockReturnValue(faker.lorem.paragraphs());

    mockedValidateEntityCreatedDate = jest
      .spyOn(entityFieldValidationFunctions, 'validateEntityCreatedDate')
      .mockReturnValue(faker.date.recent().toISOString());

    mockedValidateEntityPublishedDate = jest
      .spyOn(entityFieldValidationFunctions, 'validateEntityPublishedDate')
      .mockReturnValue(faker.date.recent().toISOString());

    mockedValidateEntitySeoDescription = jest
      .spyOn(entityFieldValidationFunctions, 'validateEntitySeoDescription')
      .mockReturnValue(faker.lorem.sentences());

    mockedValidateEntitySeoKeywords = jest
      .spyOn(entityFieldValidationFunctions, 'validateEntitySeoKeywords')
      .mockReturnValue([
        faker.lorem.word(),
        faker.lorem.word(),
        faker.lorem.word(),
      ]);

    mockedValidateEntityLocation = jest
      .spyOn(entityFieldValidationFunctions, 'validateEntityLocation')
      .mockReturnValue({
        place: faker.company.companyName(),
        city: faker.address.city(),
        stateOrProvince: faker.address.state(),
        country: faker.address.country(),
      });

    mockedValidateOnePublishImage = jest
      .spyOn(imageFieldValidationFunctions, 'validateOnePublishImage')
      .mockReturnValue(image);

    mockedValidatePublishImagesHaveStorageIds = jest
      .spyOn(
        imageFieldValidationFunctions,
        'validatePublishImagesHaveStorageIds'
      )
      .mockReturnValue([image] as Image[]);

    mockedValidatePublishImagesHaveSlugs = jest
      .spyOn(imageFieldValidationFunctions, 'validatePublishImagesHaveSlugs')
      .mockReturnValue([image] as Image[]);

    mockedValidatePublishThreeSixtyImages = jest
      .spyOn(imageFieldValidationFunctions, 'validatePublishThreeSixtyImages')
      .mockReturnValue([image] as Image[]);

    mockedValidatePublishImagesAreNotStarredAndLoved = jest
      .spyOn(
        imageFieldValidationFunctions,
        'validatePublishImagesAreNotStarredAndLoved'
      )
      .mockReturnValue([image] as Image[]);

    mockedValidatePublishStarredImage = jest
      .spyOn(imageFieldValidationFunctions, 'validatePublishStarredImage')
      .mockReturnValue(image);

    mockedValidatePublishLovedImages = jest
      .spyOn(imageFieldValidationFunctions, 'validatePublishLovedImages')
      .mockReturnValue([image] as Image[]);

    mockedValidatePublishImagesHaveTitles = jest
      .spyOn(imageFieldValidationFunctions, 'validatePublishImagesHaveTitles')
      .mockReturnValue([image] as Image[]);

    mockedValidatePublishImagesHaveSeoDescriptions = jest
      .spyOn(
        imageFieldValidationFunctions,
        'validatePublishImagesHaveSeoDescriptions'
      )
      .mockReturnValue([image] as Image[]);

    mockedValidatePublishImagesHaveSeoKeywords = jest
      .spyOn(
        imageFieldValidationFunctions,
        'validatePublishImagesHaveSeoKeywords'
      )
      .mockReturnValue([image] as Image[]);

    mockedValidatePublishImagesHaveSmallDimensions = jest
      .spyOn(
        imageFieldValidationFunctions,
        'validatePublishImagesHaveSmallDimensions'
      )
      .mockReturnValue([image] as Image[]);

    mockedValidateEntityTileDimension = jest
      .spyOn(entityFieldValidationFunctions, 'validateEntityTileDimension')
      .mockReturnValue({
        width: faker.datatype.number(),
        height: faker.datatype.number(),
      });
  });

  describe('validatePublishEntity', () => {
    it('should validate About', () => {
      const documentModel = { type: EntityType.About } as DocumentModel;
      const result = validatePublishEntity(documentModel);
      expect(result).toEqual(documentModel);
      expect(mockedValidateEntitySlug).toHaveBeenCalledTimes(1);
      expect(mockedValidateEntityOrder).toHaveBeenCalledTimes(1);
      expect(mockedValidateEntityTitle).toHaveBeenCalledTimes(1);
      expect(mockedValidateEntityText).toHaveBeenCalledTimes(1);
      expect(mockedValidatePublishImagesHaveStorageIds).toHaveBeenCalledTimes(
        1
      );
      expect(mockedValidatePublishImagesHaveSlugs).toHaveBeenCalledTimes(1);
      expect(
        mockedValidatePublishImagesHaveSmallDimensions
      ).toHaveBeenCalledTimes(1);
    });

    it('should validate BestOf', () => {
      const documentModel = { type: EntityType.BestOf } as DocumentModel;
      const result = validatePublishEntity(documentModel);
      expect(result).toEqual(documentModel);
      expect(mockedValidateEntitySlug).toHaveBeenCalledTimes(1);
      expect(mockedValidateEntityOrder).toHaveBeenCalledTimes(1);
      expect(mockedValidatePublishImagesHaveStorageIds).toHaveBeenCalledTimes(
        1
      );
      expect(mockedValidatePublishImagesHaveSlugs).toHaveBeenCalledTimes(1);
      expect(mockedValidatePublishThreeSixtyImages).toHaveBeenCalledTimes(1);
      expect(mockedValidatePublishImagesHaveTitles).toHaveBeenCalledTimes(1);
      expect(
        mockedValidatePublishImagesHaveSeoDescriptions
      ).toHaveBeenCalledTimes(1);
      expect(mockedValidatePublishImagesHaveSeoKeywords).toHaveBeenCalledTimes(
        1
      );
      expect(
        mockedValidatePublishImagesHaveSmallDimensions
      ).toHaveBeenCalledTimes(1);
    });

    it('should validate Destination', () => {
      const documentModel = { type: EntityType.Destination } as DocumentModel;
      const result = validatePublishEntity(documentModel);
      expect(result).toEqual(documentModel);
      expect(mockedValidateEntitySlug).toHaveBeenCalledTimes(1);
      expect(mockedValidateEntityOrder).toHaveBeenCalledTimes(1);
      expect(mockedValidatePublishImagesHaveStorageIds).toHaveBeenCalledTimes(
        1
      );
      expect(mockedValidatePublishImagesHaveSlugs).toHaveBeenCalledTimes(1);
      expect(mockedValidatePublishThreeSixtyImages).toHaveBeenCalledTimes(1);
      expect(mockedValidatePublishStarredImage).toHaveBeenCalledTimes(1);
      expect(
        mockedValidatePublishImagesHaveSmallDimensions
      ).toHaveBeenCalledTimes(1);
    });

    it('should validate Event', () => {
      const documentModel = { type: EntityType.Event } as DocumentModel;
      const result = validatePublishEntity(documentModel);
      expect(result).toEqual(documentModel);
      expect(mockedValidateEntityGroup).toHaveBeenCalledTimes(1);
      expect(mockedValidateEntitySlug).toHaveBeenCalledTimes(1);
      expect(mockedValidateEntityOrder).toHaveBeenCalledTimes(1);
      expect(mockedValidateEntityTitle).toHaveBeenCalledTimes(1);
      expect(mockedValidateEntityText).toHaveBeenCalledTimes(1);
      expect(mockedValidateEntityCreatedDate).toHaveBeenCalledTimes(1);
      expect(mockedValidateEntitySeoDescription).toHaveBeenCalledTimes(1);
      expect(mockedValidateEntitySeoKeywords).toHaveBeenCalledTimes(1);
      expect(mockedValidateEntityLocation).toHaveBeenCalledTimes(1);
      expect(mockedValidatePublishImagesHaveStorageIds).toHaveBeenCalledTimes(
        1
      );
      expect(mockedValidatePublishImagesHaveSlugs).toHaveBeenCalledTimes(1);
      expect(mockedValidatePublishThreeSixtyImages).toHaveBeenCalledTimes(1);
      expect(
        mockedValidatePublishImagesAreNotStarredAndLoved
      ).toHaveBeenCalledTimes(1);
      expect(mockedValidatePublishStarredImage).toHaveBeenCalledTimes(1);
      expect(mockedValidatePublishLovedImages).toHaveBeenCalledTimes(1);
      expect(
        mockedValidatePublishImagesHaveSmallDimensions
      ).toHaveBeenCalledTimes(1);
    });

    it('should validate Favorites', () => {
      const documentModel = { type: EntityType.Favorites } as DocumentModel;
      const result = validatePublishEntity(documentModel);
      expect(result).toEqual(documentModel);
      expect(mockedValidateEntitySlug).toHaveBeenCalledTimes(1);
      expect(mockedValidatePublishImagesHaveStorageIds).toHaveBeenCalledTimes(
        1
      );
      expect(mockedValidatePublishImagesHaveSlugs).toHaveBeenCalledTimes(1);
      expect(mockedValidatePublishThreeSixtyImages).toHaveBeenCalledTimes(1);
      expect(mockedValidatePublishImagesHaveTitles).toHaveBeenCalledTimes(1);
      expect(
        mockedValidatePublishImagesHaveSeoDescriptions
      ).toHaveBeenCalledTimes(1);
      expect(mockedValidatePublishImagesHaveSeoKeywords).toHaveBeenCalledTimes(
        1
      );
      expect(
        mockedValidatePublishImagesHaveSmallDimensions
      ).toHaveBeenCalledTimes(1);
    });

    it('should validate Image Post', () => {
      const documentModel = { type: EntityType.ImagePost } as DocumentModel;
      const result = validatePublishEntity(documentModel);
      expect(result).toEqual(documentModel);
      expect(mockedValidateEntitySlug).toHaveBeenCalledTimes(1);
      expect(mockedValidateEntityText).toHaveBeenCalledTimes(1);
      expect(mockedValidateOnePublishImage).toHaveBeenCalledTimes(1);
      expect(mockedValidatePublishImagesHaveStorageIds).toHaveBeenCalledTimes(
        1
      );
      expect(mockedValidatePublishImagesHaveSlugs).toHaveBeenCalledTimes(1);
    });

    it('should validate Image Video', () => {
      const documentModel = { type: EntityType.ImageVideo } as DocumentModel;
      const result = validatePublishEntity(documentModel);
      expect(result).toEqual(documentModel);
      expect(mockedValidateEntitySlug).toHaveBeenCalledTimes(1);
      expect(mockedValidateEntityTitle).toHaveBeenCalledTimes(1);
      expect(mockedValidateEntityText).toHaveBeenCalledTimes(1);
      expect(mockedValidatePublishImagesHaveStorageIds).toHaveBeenCalledTimes(
        1
      );
      expect(mockedValidatePublishImagesHaveSlugs).toHaveBeenCalledTimes(1);
      expect(
        mockedValidatePublishImagesAreNotStarredAndLoved
      ).toHaveBeenCalledTimes(1);
      expect(mockedValidatePublishStarredImage).toHaveBeenCalledTimes(1);
      expect(mockedValidatePublishLovedImages).toHaveBeenCalledTimes(1);
    });

    it('should validate Photo of the Week', () => {
      const documentModel = {
        type: EntityType.PhotoOfTheWeek,
      } as DocumentModel;
      const result = validatePublishEntity(documentModel);
      expect(result).toEqual(documentModel);
      expect(mockedValidateEntityGroup).toHaveBeenCalledTimes(1);
      expect(mockedValidateEntitySlug).toHaveBeenCalledTimes(1);
      expect(mockedValidateEntityOrder).toHaveBeenCalledTimes(1);
      expect(mockedValidateEntityTitle).toHaveBeenCalledTimes(1);
      expect(mockedValidateEntityText).toHaveBeenCalledTimes(1);
      expect(mockedValidateEntityPublishedDate).toHaveBeenCalledTimes(1);
      expect(mockedValidateEntitySeoDescription).toHaveBeenCalledTimes(1);
      expect(mockedValidateEntitySeoKeywords).toHaveBeenCalledTimes(1);
      expect(mockedValidateEntityLocation).toHaveBeenCalledTimes(1);
      expect(mockedValidateOnePublishImage).toHaveBeenCalledTimes(1);
      expect(mockedValidatePublishImagesHaveStorageIds).toHaveBeenCalledTimes(
        1
      );
      expect(mockedValidatePublishImagesHaveSlugs).toHaveBeenCalledTimes(1);
      expect(
        mockedValidatePublishImagesHaveSmallDimensions
      ).toHaveBeenCalledTimes(1);
    });

    it('should validate Review', () => {
      const documentModel = { type: EntityType.Review } as DocumentModel;
      const result = validatePublishEntity(documentModel);
      expect(result).toEqual(documentModel);
      expect(mockedValidateEntitySlug).toHaveBeenCalledTimes(1);
      expect(mockedValidateEntityOrder).toHaveBeenCalledTimes(1);
      expect(mockedValidateEntityTitle).toHaveBeenCalledTimes(1);
      expect(mockedValidateEntityText).toHaveBeenCalledTimes(1);
      expect(mockedValidateOnePublishImage).toHaveBeenCalledTimes(1);
      expect(mockedValidatePublishImagesHaveStorageIds).toHaveBeenCalledTimes(
        1
      );
      expect(mockedValidatePublishImagesHaveSlugs).toHaveBeenCalledTimes(1);
      expect(
        mockedValidatePublishImagesHaveSmallDimensions
      ).toHaveBeenCalledTimes(1);
      expect(mockedValidateEntityTileDimension).toHaveBeenCalledTimes(1);
    });

    it('should validate Review Media', () => {
      const documentModel = { type: EntityType.ReviewMedia } as DocumentModel;
      const result = validatePublishEntity(documentModel);
      expect(result).toEqual(documentModel);
      expect(mockedValidateEntitySlug).toHaveBeenCalledTimes(1);
      expect(mockedValidatePublishImagesHaveStorageIds).toHaveBeenCalledTimes(
        1
      );
      expect(mockedValidatePublishImagesHaveSlugs).toHaveBeenCalledTimes(1);
      expect(mockedValidatePublishThreeSixtyImages).toHaveBeenCalledTimes(1);
      expect(
        mockedValidatePublishImagesHaveSmallDimensions
      ).toHaveBeenCalledTimes(1);
    });

    it.each(
      Object.values(EntityType).filter(
        (entityType) => entityType !== EntityType.Test
      )
    )('should not throw for any entity type %s', (entityType) => {
      const result = () => {
        const documentModel = { type: entityType } as DocumentModel;
        validatePublishEntity(documentModel);
      };
      expect(result).not.toThrow();
    });

    it('should throw a conflict exception if cannot validate entity type', () => {
      const entityType = faker.lorem.word() as EntityType;
      const result = () => {
        const documentModel = { type: entityType } as DocumentModel;
        validatePublishEntity(documentModel);
      };
      expect(result).toThrow(ConflictException);
      expect(result).toThrow(`Could not validate entity type ${entityType}`);
    });
  });
});
