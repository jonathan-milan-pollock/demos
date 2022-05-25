import faker from '@faker-js/faker';

import {
  Entity,
  Image,
  ImageDimensionType,
  ImageState,
} from '@dark-rush-photography/shared/types';
import {
  loadJsonLdEventCreatedDate,
  loadJsonLdEventImageUrls,
} from './entity-load-json-ld.functions';

jest.mock('@dark-rush-photography/shared/util', () => ({
  ...jest.requireActual('@dark-rush-photography/shared/util'),
}));
import * as sharedUtil from '@dark-rush-photography/shared/util';

describe('entity-load-json-ld.functions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('loadJsonLdEventCreatedDate', () => {
    it('should use the event created date when one is provided', () => {
      const eventCreatedDate = faker.date.recent().toISOString();
      const date = faker.date.recent();

      const result = loadJsonLdEventCreatedDate(date, eventCreatedDate);
      expect(result).toBe(eventCreatedDate);
    });

    it('should should use iso string date when entity created date is not provided', () => {
      const eventCreatedDate = undefined;
      const date = faker.date.recent();

      const result = loadJsonLdEventCreatedDate(date, eventCreatedDate);
      expect(result).toBe(date.toISOString());
    });
  });

  describe('loadJsonLdEventImageUrls', () => {
    it('should contain urls entity seo keywords and image seo keywords', () => {
      const mockedGetImageUrl = jest
        .spyOn(sharedUtil, 'getImageUrl')
        .mockReturnValue(faker.internet.url());

      const publicStarredAndLovedImages = [
        {
          storageId: faker.datatype.uuid(),
          pathname: faker.lorem.word(),
          state: ImageState.Public,
          isStarred: true,
        } as Image,
        {
          storageId: faker.datatype.uuid(),
          pathname: faker.lorem.word(),
          state: ImageState.Public,
          isLoved: true,
        } as Image,
      ];
      const isProduction = faker.datatype.boolean();

      const result = loadJsonLdEventImageUrls(
        { images: publicStarredAndLovedImages } as Entity,
        isProduction
      );
      expect(mockedGetImageUrl).toBeCalledTimes(2);
      expect(result.length).toBe(2);

      const [
        firstStorageId,
        firstPathname,
        firstImageDimensionType,
        firstIsProduction,
      ] = mockedGetImageUrl.mock.calls[0];
      expect(firstStorageId).toBe(publicStarredAndLovedImages[0].storageId);
      expect(firstPathname).toBe(publicStarredAndLovedImages[0].pathname);
      expect(firstImageDimensionType).toBe(ImageDimensionType.JsonLd);
      expect(firstIsProduction).toBe(isProduction);

      const [
        secondStorageId,
        secondPathname,
        secondImageDimensionType,
        secondIsProduction,
      ] = mockedGetImageUrl.mock.calls[1];
      expect(secondStorageId).toBe(publicStarredAndLovedImages[1].storageId);
      expect(secondPathname).toBe(publicStarredAndLovedImages[1].pathname);
      expect(secondImageDimensionType).toBe(ImageDimensionType.JsonLd);
      expect(secondIsProduction).toBe(isProduction);
    });

    it('should return an empty array when the entity does not contain public images', () => {
      const mockedGetImageUrl = jest
        .spyOn(sharedUtil, 'getImageUrl')
        .mockReturnValue(faker.internet.url());

      const publicStarredAndLovedImages = [
        {
          storageId: faker.datatype.uuid(),
          pathname: faker.lorem.word(),
          state: ImageState.Selected,
          isStarred: true,
        } as Image,
        {
          storageId: faker.datatype.uuid(),
          pathname: faker.lorem.word(),
          state: ImageState.Archived,
          isLoved: true,
        } as Image,
      ];
      const isProduction = faker.datatype.boolean();

      const result = loadJsonLdEventImageUrls(
        { images: publicStarredAndLovedImages } as Entity,
        isProduction
      );
      expect(mockedGetImageUrl).not.toBeCalled();
      expect(result.length).toBe(0);
    });

    it('should return an empty array when the entity public images are not starred or loved', () => {
      const mockedGetImageUrl = jest
        .spyOn(sharedUtil, 'getImageUrl')
        .mockReturnValue(faker.internet.url());

      const publicStarredAndLovedImages = [
        {
          storageId: faker.datatype.uuid(),
          pathname: faker.lorem.word(),
          state: ImageState.Public,
          isStarred: false,
        } as Image,
        {
          storageId: faker.datatype.uuid(),
          pathname: faker.lorem.word(),
          state: ImageState.Public,
          isLoved: false,
        } as Image,
      ];
      const isProduction = faker.datatype.boolean();

      const result = loadJsonLdEventImageUrls(
        { images: publicStarredAndLovedImages } as Entity,
        isProduction
      );

      expect(mockedGetImageUrl).not.toBeCalled();
      expect(result.length).toBe(0);
    });
  });
});
