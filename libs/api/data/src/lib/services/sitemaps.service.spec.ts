/* eslint-disable @typescript-eslint/no-explicit-any */
import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

import * as faker from 'faker';
import { of } from 'rxjs';

import { Document } from '../schema/document.schema';
import { SitemapLoadProvider } from '../providers/sitemap-load.provider';
import { SitemapsService } from './sitemaps.service';
import { SitemapLoadXmlProvider } from '../providers/sitemap-load-xml.provider';
import { SitemapLoadMaxPublishedDateProvider } from '../providers/sitemap-load-max-date-published.provider';

describe('sitemaps.service', () => {
  let sitemapsService: SitemapsService;
  let sitemapLoadProvider: SitemapLoadProvider;

  beforeEach(async () => {
    class MockDocumentModel {}

    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: getModelToken(Document.name),
          useValue: new MockDocumentModel(),
        },
        SitemapsService,
        SitemapLoadProvider,
        SitemapLoadMaxPublishedDateProvider,
        SitemapLoadXmlProvider,
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
        expect(mockedLoadDarkRushPhotographySitemap$).toBeCalled();
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
        expect(mockedLoadThirtySevenPhotosSitemap$).toBeCalled();
        done();
      });
    });
  });
});
