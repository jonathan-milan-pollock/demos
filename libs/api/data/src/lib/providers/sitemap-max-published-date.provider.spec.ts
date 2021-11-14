/* eslint-disable @typescript-eslint/no-explicit-any */
import { Test } from '@nestjs/testing';
import { ConflictException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';

import * as faker from 'faker';
import { of } from 'rxjs';

import {
  EntityType,
  SitemapEntityType,
} from '@dark-rush-photography/shared/types';
import { Document, DocumentModel } from '../schema/document.schema';
import { SitemapMaxPublishedDateProvider } from './sitemap-max-published-date.provider';

jest.mock('@dark-rush-photography/shared/util', () => ({
  ...jest.requireActual('@dark-rush-photography/shared/util'),
}));
import * as sharedUtil from '@dark-rush-photography/shared/util';

jest.mock('../entities/entity-repository.functions', () => ({
  ...jest.requireActual('../entities/entity-repository.functions'),
}));
import * as entityRepositoryFunctions from '../entities/entity-repository.functions';

describe('sitemap-max-published-date.provider', () => {
  let sitemapMaxPublishedDateProvider: SitemapMaxPublishedDateProvider;

  beforeEach(async () => {
    class MockDocumentModel {}

    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: getModelToken(Document.name),
          useClass: MockDocumentModel,
        },
        SitemapMaxPublishedDateProvider,
      ],
    }).compile();
    sitemapMaxPublishedDateProvider =
      moduleRef.get<SitemapMaxPublishedDateProvider>(
        SitemapMaxPublishedDateProvider
      );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findMaxPublishedDate$', () => {
    it('should find the max published date', (done: any) => {
      const minPublishedDate = '2012-10-08T18:48:00.000Z';
      const maxPublishedDate = '2014-09-02T18:48:00.000Z';

      const mockedGetEntityTypeFromSitemapEntityType = jest
        .spyOn(sharedUtil, 'getEntityTypeFromSitemapEntityType')
        .mockReturnValue(faker.random.arrayElement(Object.values(EntityType)));

      const mockedFindAllPublicEntities$ = jest
        .spyOn(entityRepositoryFunctions, 'findAllPublicEntities$')
        .mockReturnValue(
          of([
            {
              publishedDate: minPublishedDate,
            } as DocumentModel,
            {
              publishedDate: maxPublishedDate,
            } as DocumentModel,
          ] as DocumentModel[])
        );

      const sitemapEntityType = faker.random.arrayElement(
        Object.values(SitemapEntityType)
      );
      sitemapMaxPublishedDateProvider
        .findMaxPublishedDate$(sitemapEntityType)
        .subscribe((result) => {
          expect(mockedGetEntityTypeFromSitemapEntityType).toBeCalledTimes(1);
          expect(mockedFindAllPublicEntities$).toBeCalledTimes(1);
          expect(result.maxPublishedDate).toBe(maxPublishedDate);
          expect(result.sitemapEntityType).toBe(sitemapEntityType);
          done();
        });
    });

    it('should throw a conflict exception when entities of sitemap entity type are not found', (done: any) => {
      const mockedGetEntityTypeFromSitemapEntityType = jest
        .spyOn(sharedUtil, 'getEntityTypeFromSitemapEntityType')
        .mockReturnValue(faker.random.arrayElement(Object.values(EntityType)));

      const mockedFindAllPublicEntities$ = jest
        .spyOn(entityRepositoryFunctions, 'findAllPublicEntities$')
        .mockReturnValue(of([] as DocumentModel[]));

      const sitemapEntityType = faker.random.arrayElement(
        Object.values(SitemapEntityType)
      );
      sitemapMaxPublishedDateProvider
        .findMaxPublishedDate$(sitemapEntityType)
        .subscribe({
          next: () => {
            done();
          },
          error: (error) => {
            expect(mockedGetEntityTypeFromSitemapEntityType).toBeCalledTimes(1);
            expect(mockedFindAllPublicEntities$).toBeCalledTimes(1);
            expect(error).toBeInstanceOf(ConflictException);
            expect(error.message).toBe(
              `Can not find entities of sitemap entity type ${sitemapEntityType}`
            );
            done();
          },
          complete: () => {
            done();
          },
        });
    });

    it('should throw a conflict exception when entities of sitemap entity type have undefined published dates', (done: any) => {
      const mockedGetEntityTypeFromSitemapEntityType = jest
        .spyOn(sharedUtil, 'getEntityTypeFromSitemapEntityType')
        .mockReturnValue(faker.random.arrayElement(Object.values(EntityType)));

      const mockedFindAllPublicEntities$ = jest
        .spyOn(entityRepositoryFunctions, 'findAllPublicEntities$')
        .mockReturnValue(
          of([
            {} as DocumentModel,
            { publishedDate: faker.date.recent().toISOString() },
          ] as DocumentModel[])
        );

      const sitemapEntityType = faker.random.arrayElement(
        Object.values(SitemapEntityType)
      );
      sitemapMaxPublishedDateProvider
        .findMaxPublishedDate$(sitemapEntityType)
        .subscribe({
          next: () => {
            done();
          },
          error: (error) => {
            expect(mockedGetEntityTypeFromSitemapEntityType).toBeCalledTimes(1);
            expect(mockedFindAllPublicEntities$).toBeCalledTimes(1);
            expect(error).toBeInstanceOf(ConflictException);
            expect(error.message).toBe(
              `Entities of sitemap entity type ${sitemapEntityType} have undefined published dates`
            );
            done();
          },
          complete: () => {
            done();
          },
        });
    });
  });
});
