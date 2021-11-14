/* eslint-disable @typescript-eslint/no-explicit-any */
import { Test } from '@nestjs/testing';
import { ConflictException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getModelToken } from '@nestjs/mongoose';

import * as faker from 'faker';
import { of } from 'rxjs';

import { BestOfType, Entity } from '@dark-rush-photography/shared/types';
import { Document, DocumentModel } from '../schema/document.schema';
import { SitemapPublishedDateProvider } from './sitemap-published-date.provider';

jest.mock('@dark-rush-photography/shared/util', () => ({
  ...jest.requireActual('@dark-rush-photography/shared/util'),
}));
import * as sharedUtil from '@dark-rush-photography/shared/util';

jest.mock('../entities/entity-repository.functions', () => ({
  ...jest.requireActual('../entities/entity-repository.functions'),
}));
import * as entityRepositoryFunctions from '../entities/entity-repository.functions';

describe('sitemap-published-date.provider', () => {
  let sitemapPublishedDateProvider: SitemapPublishedDateProvider;

  beforeEach(async () => {
    class MockDocumentModel {}

    const moduleRef = await Test.createTestingModule({
      providers: [
        ConfigService,
        {
          provide: getModelToken(Document.name),
          useClass: MockDocumentModel,
        },
        SitemapPublishedDateProvider,
      ],
    }).compile();
    sitemapPublishedDateProvider = moduleRef.get<SitemapPublishedDateProvider>(
      SitemapPublishedDateProvider
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('loadEventPublishedDates$', () => {
    it('should load event publish dates', (done: any) => {
      const firstPublishedDate = faker.date.recent().toISOString();
      const secondPublishedDate = faker.date.recent().toISOString();

      const firstSlug = faker.lorem.word();
      const secondSlug = faker.lorem.word();

      const mockedFindAllPublicEntities$ = jest
        .spyOn(entityRepositoryFunctions, 'findAllPublicEntities$')
        .mockReturnValue(
          of([
            {
              publishedDate: firstPublishedDate,
              slug: firstSlug,
            } as DocumentModel,
            {
              publishedDate: secondPublishedDate,
              slug: secondSlug,
            } as DocumentModel,
          ])
        );

      sitemapPublishedDateProvider
        .loadEventPublishedDates$()
        .subscribe((result) => {
          expect(mockedFindAllPublicEntities$).toBeCalledTimes(1);
          expect(result).toEqual([
            {
              publishedDate: firstPublishedDate,
              slug: firstSlug,
            },
            {
              publishedDate: secondPublishedDate,
              slug: secondSlug,
            },
          ]);
          done();
        });
    });

    it('should return an empty array when events are not found', (done: any) => {
      const mockedFindAllPublicEntities$ = jest
        .spyOn(entityRepositoryFunctions, 'findAllPublicEntities$')
        .mockReturnValue(of([] as DocumentModel[]));

      sitemapPublishedDateProvider
        .loadEventPublishedDates$()
        .subscribe((result) => {
          expect(mockedFindAllPublicEntities$).toBeCalledTimes(1);
          expect(result).toEqual([]);
          done();
        });
    });

    it('should throw a conflict exception when an event has a undefined published date', (done: any) => {
      const firstGroup = faker.lorem.word();
      const firstSlug = faker.lorem.word();

      const mockedFindAllPublicEntities$ = jest
        .spyOn(entityRepositoryFunctions, 'findAllPublicEntities$')
        .mockReturnValue(
          of([
            {
              group: firstGroup,
              slug: firstSlug,
              publishedDate: undefined,
            } as DocumentModel,
            {
              publishedDate: faker.date.recent().toISOString(),
            } as DocumentModel,
          ] as DocumentModel[])
        );

      sitemapPublishedDateProvider.loadEventPublishedDates$().subscribe({
        next: () => {
          done();
        },
        error: (error) => {
          expect(mockedFindAllPublicEntities$).toBeCalledTimes(1);
          expect(error).toBeInstanceOf(ConflictException);
          expect(error.message).toBe(
            `Public event ${firstGroup} ${firstSlug} has an undefined published date`
          );
          done();
        },
        complete: () => {
          done();
        },
      });
    });
  });

  describe('loadBestOfPublishDates', () => {
    it('should load best of published dates', () => {
      const firstPublishedDate = faker.date.recent().toISOString();
      const secondPublishedDate = faker.date.recent().toISOString();

      const firstBestOfType = faker.random.arrayElement(
        Object.values(BestOfType)
      );
      const secondBestOfType = faker.random.arrayElement(
        Object.values(BestOfType)
      );

      const mockedGetBestOfTypeFromSlug = jest
        .spyOn(sharedUtil, 'getBestOfTypeFromSlug')
        .mockReturnValueOnce(firstBestOfType)
        .mockReturnValueOnce(secondBestOfType);

      const result = sitemapPublishedDateProvider.loadBestOfPublishedDates([
        { publishedDate: firstPublishedDate } as DocumentModel,
        { publishedDate: secondPublishedDate } as DocumentModel,
      ]);

      expect(mockedGetBestOfTypeFromSlug).toBeCalledTimes(2);
      expect(result).toEqual([
        { publishedDate: firstPublishedDate, bestOfType: firstBestOfType },
        { publishedDate: secondPublishedDate, bestOfType: secondBestOfType },
      ]);
    });

    it('should return an empty array when best of entities is empty', () => {
      const mockedGetBestOfTypeFromSlug = jest.spyOn(
        sharedUtil,
        'getBestOfTypeFromSlug'
      );

      const result = sitemapPublishedDateProvider.loadBestOfPublishedDates([]);

      expect(mockedGetBestOfTypeFromSlug).not.toBeCalled();
      expect(result).toEqual([]);
    });

    it('should throw a conflict exception when a best of type entity has an undefined published date', () => {
      const secondSlug = faker.lorem.word();

      const mockedGetBestOfTypeFromSlug = jest
        .spyOn(sharedUtil, 'getBestOfTypeFromSlug')
        .mockReturnValue(faker.random.arrayElement(Object.values(BestOfType)));

      const result = () => {
        sitemapPublishedDateProvider.loadBestOfPublishedDates([
          {
            slug: faker.lorem.word(),
            publishedDate: faker.date.recent().toISOString(),
          } as Entity,
          {
            slug: secondSlug,
            publishedDate: undefined,
          } as Entity,
        ] as Entity[]);
      };
      expect(mockedGetBestOfTypeFromSlug).not.toBeCalledTimes(1);
      expect(result).toThrow(ConflictException);
      expect(result).toThrow(
        `Best of type entity ${secondSlug} has an undefined published date`
      );
    });
  });
});