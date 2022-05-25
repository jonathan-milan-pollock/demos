/* eslint-disable @typescript-eslint/no-explicit-any */
import { Test } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getModelToken } from '@nestjs/mongoose';

import faker from '@faker-js/faker';
import { of } from 'rxjs';

import {
  BestOfType,
  MaxPublishedDateSitemapEntityType,
  PublishedDateBestOfType,
  PublishedDatePathname,
  SitemapEntityType,
} from '@dark-rush-photography/shared/types';
import { Document, DocumentModel } from '../schema/document.schema';
import { SitemapLoadProvider } from './sitemap-load.provider';
import { SitemapMaxPublishedDateProvider } from './sitemap-max-published-date.provider';
import { SitemapPublishedDateProvider } from './sitemap-published-date.provider';
import { SitemapXmlProvider } from './sitemap-xml.provider';

jest.mock('../entities/entity-repository.functions', () => ({
  ...jest.requireActual('../entities/entity-repository.functions'),
}));
import * as entityRepositoryFunctions from '../entities/entity-repository.functions';

jest.mock('../entities/entity-validation.functions', () => ({
  ...jest.requireActual('../entities/entity-validation.functions'),
}));
import * as entityValidationFunctions from '../entities/entity-validation.functions';

describe('sitemap-load.provider', () => {
  let sitemapLoadProvider: SitemapLoadProvider;
  let sitemapMaxPublishedDateProvider: SitemapMaxPublishedDateProvider;
  let sitemapPublishedDateProvider: SitemapPublishedDateProvider;
  let sitemapXmlProvider: SitemapXmlProvider;

  beforeEach(async () => {
    class MockDocumentModel {}

    const moduleRef = await Test.createTestingModule({
      providers: [
        ConfigService,
        {
          provide: getModelToken(Document.name),
          useClass: MockDocumentModel,
        },
        SitemapLoadProvider,
        SitemapMaxPublishedDateProvider,
        SitemapPublishedDateProvider,
        SitemapXmlProvider,
      ],
    }).compile();
    sitemapLoadProvider =
      moduleRef.get<SitemapLoadProvider>(SitemapLoadProvider);
    sitemapMaxPublishedDateProvider =
      moduleRef.get<SitemapMaxPublishedDateProvider>(
        SitemapMaxPublishedDateProvider
      );
    sitemapPublishedDateProvider = moduleRef.get<SitemapPublishedDateProvider>(
      SitemapPublishedDateProvider
    );
    sitemapXmlProvider = moduleRef.get<SitemapXmlProvider>(SitemapXmlProvider);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('loadDarkRushPhotographySitemap$', () => {
    it('should load Dark Rush Photography sitemap', (done: any) => {
      const mockedFindMaxPublishedDate$ = jest
        .spyOn(sitemapMaxPublishedDateProvider, 'findMaxPublishedDate$')
        .mockReturnValue(of({} as MaxPublishedDateSitemapEntityType));

      const mockedLoadEventPublishedDates$ = jest
        .spyOn(sitemapPublishedDateProvider, 'loadEventPublishedDates$')
        .mockReturnValue(of([] as PublishedDatePathname[]));

      const mockedLoadDarkRushPhotographySitemapXml = jest
        .spyOn(sitemapXmlProvider, 'loadDarkRushPhotographySitemapXml')
        .mockReturnValue(faker.lorem.lines());

      sitemapLoadProvider.loadDarkRushPhotographySitemap$().subscribe(() => {
        expect(mockedFindMaxPublishedDate$).toBeCalledTimes(
          Object.values(SitemapEntityType).length
        );
        const calledSitemapEntityTypes =
          mockedFindMaxPublishedDate$.mock.calls.map((call) => call[0]);
        Object.values(SitemapEntityType).forEach((sitemapEntityType) =>
          expect(calledSitemapEntityTypes.includes(sitemapEntityType))
        );
        const orderedSitemapEntityTypes = [
          SitemapEntityType.Favorites,
          SitemapEntityType.Event,
          SitemapEntityType.About,
          SitemapEntityType.Review,
          SitemapEntityType.PhotoOfTheWeek,
          SitemapEntityType.Destination,
          SitemapEntityType.ReviewMedia,
        ];
        expect(calledSitemapEntityTypes).toEqual(orderedSitemapEntityTypes);
        expect(mockedLoadEventPublishedDates$).toBeCalledTimes(1);
        expect(mockedLoadDarkRushPhotographySitemapXml).toBeCalledTimes(1);
        done();
      });
    });
  });

  describe('loadThirtySevenPhotosSitemap$', () => {
    it('should load thirty seven photos sitemap', (done: any) => {
      const mockedFindOnePublicEntityForPathname$ = jest
        .spyOn(entityRepositoryFunctions, 'findOnePublicEntityForPathname$')
        .mockReturnValue(of({} as DocumentModel));

      const mockedValidateEntityFound = jest
        .spyOn(entityValidationFunctions, 'validateEntityFound')
        .mockImplementation((documentModel) => documentModel as DocumentModel);

      const mockedLoadBestOfPublishedDates = jest
        .spyOn(sitemapPublishedDateProvider, 'loadBestOfPublishedDates')
        .mockReturnValue([] as PublishedDateBestOfType[]);

      const mockedLoadThirtySevenPhotosSitemapXml = jest
        .spyOn(sitemapXmlProvider, 'loadThirtySevenPhotosSitemapXml')
        .mockReturnValue(faker.lorem.lines());

      sitemapLoadProvider.loadThirtySevenPhotosSitemap$().subscribe(() => {
        expect(mockedFindOnePublicEntityForPathname$).toBeCalledTimes(
          Object.values(BestOfType).length
        );
        const calledFindOneBestOfTypes =
          mockedFindOnePublicEntityForPathname$.mock.calls.map(
            (call) => call[1]
          );
        Object.values(BestOfType).forEach((bestOfType) =>
          expect(calledFindOneBestOfTypes.includes(bestOfType.toLowerCase()))
        );
        const orderedBestOfTypes = [
          BestOfType.Events.toLowerCase(),
          BestOfType.RealEstate.toLowerCase(),
          BestOfType.Nature.toLowerCase(),
          BestOfType.Landscapes.toLowerCase(),
          BestOfType.Children.toLowerCase(),
        ];
        expect(calledFindOneBestOfTypes).toEqual(orderedBestOfTypes);
        expect(mockedValidateEntityFound).toBeCalledTimes(
          Object.values(BestOfType).length
        );
        expect(mockedLoadBestOfPublishedDates).toBeCalledTimes(1);
        expect(mockedLoadThirtySevenPhotosSitemapXml).toBeCalledTimes(1);
        done();
      });
    });

    it('should not load thirty seven photos sitemap when best of entity does not exist', (done: any) => {
      const mockedFindOnePublicEntityForPathname$ = jest
        .spyOn(entityRepositoryFunctions, 'findOnePublicEntityForPathname$')
        .mockReturnValue(of(null));

      const mockedValidateEntityFound = jest
        .spyOn(entityValidationFunctions, 'validateEntityFound')
        .mockImplementation(() => {
          throw new NotFoundException();
        });

      const mockedLoadBestOfPublishedDates = jest.spyOn(
        sitemapPublishedDateProvider,
        'loadBestOfPublishedDates'
      );

      const mockedLoadThirtySevenPhotosSitemapXml = jest.spyOn(
        sitemapXmlProvider,
        'loadThirtySevenPhotosSitemapXml'
      );

      sitemapLoadProvider.loadThirtySevenPhotosSitemap$().subscribe({
        next: () => {
          done();
        },
        error: (error) => {
          expect(mockedFindOnePublicEntityForPathname$).toBeCalledTimes(5);
          expect(mockedValidateEntityFound).toBeCalled();
          expect(mockedLoadBestOfPublishedDates).not.toBeCalled();
          expect(mockedLoadThirtySevenPhotosSitemapXml).not.toBeCalled();
          expect(error).toBeInstanceOf(NotFoundException);
          done();
        },
        complete: () => {
          done();
        },
      });
    });
  });
});
