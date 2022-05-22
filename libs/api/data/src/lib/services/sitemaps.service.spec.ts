/* eslint-disable @typescript-eslint/no-explicit-any */
import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

import faker from '@faker-js/faker';
import { of } from 'rxjs';

import { Document } from '../schema/document.schema';
import { SitemapLoadProvider } from '../providers/sitemap-load.provider';
import { SitemapMaxPublishedDateProvider } from '../providers/sitemap-max-published-date.provider';
import { SitemapPublishedDateProvider } from '../providers/sitemap-published-date.provider';
import { SitemapXmlProvider } from '../providers/sitemap-xml.provider';
import { SitemapsService } from './sitemaps.service';

describe('sitemaps.service', () => {
  let sitemapsService: SitemapsService;
  let sitemapLoadProvider: SitemapLoadProvider;

  beforeEach(async () => {
    class MockDocumentModel {}

    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: getModelToken(Document.name),
          useClass: MockDocumentModel,
        },
        SitemapsService,
        SitemapLoadProvider,
        SitemapMaxPublishedDateProvider,
        SitemapPublishedDateProvider,
        SitemapXmlProvider,
      ],
    }).compile();

    sitemapsService = moduleRef.get<SitemapsService>(SitemapsService);
    sitemapLoadProvider =
      moduleRef.get<SitemapLoadProvider>(SitemapLoadProvider);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('loadDarkRushPhotographySitemap$', () => {
    it('should load a sitemap for Dark Rush Photography', (done: any) => {
      const mockedLoadDarkRushPhotographySitemap$ = jest
        .spyOn(sitemapLoadProvider, 'loadDarkRushPhotographySitemap$')
        .mockReturnValue(of(faker.lorem.lines()));

      sitemapsService.loadDarkRushPhotographySitemap$().subscribe(() => {
        expect(mockedLoadDarkRushPhotographySitemap$).toBeCalledTimes(1);
        done();
      });
    });
  });

  describe('load37PhotosSitemap$', () => {
    it('should load a sitemap for 37.photos', (done: any) => {
      const mockedLoadThirtySevenPhotosSitemap$ = jest
        .spyOn(sitemapLoadProvider, 'loadThirtySevenPhotosSitemap$')
        .mockReturnValue(of(faker.lorem.lines()));

      sitemapsService.loadThirtySevenPhotosSitemap$().subscribe(() => {
        expect(mockedLoadThirtySevenPhotosSitemap$).toBeCalledTimes(1);
        done();
      });
    });
  });
});
