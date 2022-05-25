import { Test } from '@nestjs/testing';

import faker from '@faker-js/faker';

import {
  MaxPublishedDateSitemapEntityType,
  PublishedDateBestOfType,
  PublishedDatePathname,
  SitemapUrl,
} from '@dark-rush-photography/shared/types';
import { SitemapXmlProvider } from './sitemap-xml.provider';

jest.mock('xmlbuilder', () => ({
  ...jest.requireActual('xmlbuilder'),
}));
import * as xmlbuilder from 'xmlbuilder';

jest.mock('@dark-rush-photography/api/util', () => ({
  ...jest.requireActual('@dark-rush-photography/api/util'),
}));
import * as apiUtil from '@dark-rush-photography/api/util';

/*
<?xml version="1.0" encoding="utf-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://darkrushphotography.com</loc>
    <priority>1.0</priority>
    <lastmod>2020-04-01</lastmod>
    <changefreq>weekly</changefreq>
  </url>
  <url>
    <loc>https://darkrushphotography.com/about</loc>
    <priority>0.9</priority>
     <lastmod>2020-04-01</lastmod>
    <changefreq>monthly</changefreq>
  </url>
  <url>
    <loc>https://darkrushphotography.com/reviews</loc>
    <priority>0.9</priority>
     <lastmod>2020-04-01</lastmod>
    <changefreq>weekly</changefreq>
  </url>
  <url>
    <loc>https://darkrushphotography.com/reviews/review</loc>
    <priority>0.8</priority>
     <lastmod>2020-04-01</lastmod>
    <changefreq>monthly</changefreq>
  </url>
  <url>
    <loc>https://darkrushphotography.com/events</loc>
    <priority>0.8</priority>
    <lastmod>2020-04-01</lastmod>
    <changefreq>weekly</changefreq>
  </url>
  <url>
    <loc>https://darkrushphotography.com/photo-of-the-week</loc>
    <priority>0.8</priority>
    <lastmod>2020-04-01</lastmod>
    <changefreq>weekly</changefreq>
  </url>
  <url>
    <loc>https://darkrushphotography.com/destinations</loc>
    <priority>0.8</priority>
    <lastmod>2020-04-01</lastmod>
    <changefreq>weekly</changefreq>
  </url>
  <url>
    <loc>https://darkrushphotography.com/events/len-foote-hike-inn-amicalola-falls-2017</loc>
    <priority>0.7</priority>
     <lastmod>2020-03-10</lastmod>
    <changefreq>weekly</changefreq>
  </url>
  <url>
    <loc>https://darkrushphotography.com/events/sandy-springs-festival-2017</loc>
    <priority>0.7</priority>
     <lastmod>2020-03-10</lastmod>
    <changefreq>weekly</changefreq>
  </url>
  <url>
    <loc>https://darkrushphotography.com/events/south-cobb-arts-alliance-storytelling-festival-2017</loc>
    <priority>0.7</priority>
     <lastmod>2020-03-10</lastmod>
    <changefreq>weekly</changefreq>
  </url>
  <url>
    <loc>https://darkrushphotography.com/events/classic-cars-1952-pontiac</loc>
    <priority>0.7</priority>
     <lastmod>2020-03-10</lastmod>
    <changefreq>weekly</changefreq>
  </url>
  <url>
    <loc>https://darkrushphotography.com/events/sarasota-florida-vacation-2019</loc>
    <priority>0.7</priority>
     <lastmod>2020-03-10</lastmod>
    <changefreq>weekly</changefreq>
  </url>
  <url>
    <loc>https://darkrushphotography.com/events/macon-international-cherry-blossom-festival-2019</loc>
    <priority>0.7</priority>
     <lastmod>2020-03-10</lastmod>
    <changefreq>weekly</changefreq>
  </url>
  <url>
    <loc>https://darkrushphotography.com/events/midtown-alliance-spring-crawl-2019</loc>
    <priority>0.7</priority>
     <lastmod>2020-03-10</lastmod>
    <changefreq>weekly</changefreq>
  </url>
  <url>
    <loc>https://darkrushphotography.com/events/food-that-rocks-a-celebration-of-sandy-springs-2019</loc>
    <priority>0.7</priority>
     <lastmod>2020-03-10</lastmod>
    <changefreq>weekly</changefreq>
  </url>
</urlset>
*/

describe('sitemap-xml.provider', () => {
  let sitemapXmlProvider: SitemapXmlProvider;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [SitemapXmlProvider],
    }).compile();
    sitemapXmlProvider = moduleRef.get<SitemapXmlProvider>(SitemapXmlProvider);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('loadDarkRushPhotographySitemapXml', () => {
    it('should load xml sitemap for Dark Rush Photography', () => {
      const mockedLoadDarkRushPhotographySitemapUrls = jest
        .spyOn(apiUtil, 'loadDarkRushPhotographySitemapUrls')
        .mockReturnValue([] as SitemapUrl[]);

      const mockedLoadSitemapEventUrls = jest
        .spyOn(apiUtil, 'loadSitemapEventUrls')
        .mockReturnValue([] as SitemapUrl[]);

      const mockedEnd = jest.fn().mockReturnValue(faker.lorem.lines());
      const xmlElement = {
        end: mockedEnd,
      } as unknown as xmlbuilder.XMLElement;

      const mockedCreate = jest
        .spyOn(xmlbuilder, 'create')
        .mockReturnValue(xmlElement);

      const result = sitemapXmlProvider.loadDarkRushPhotographySitemapXml(
        [] as MaxPublishedDateSitemapEntityType[],
        [] as PublishedDatePathname[]
      );

      expect(mockedLoadDarkRushPhotographySitemapUrls).toBeCalledTimes(1);
      expect(mockedLoadSitemapEventUrls).toBeCalledTimes(1);
      expect(mockedCreate).toBeCalledTimes(1);
      expect(mockedEnd).toBeCalledTimes(1);
      expect(result).toBeDefined();
    });
  });

  describe('loadThirtySevenPhotosSitemapXml', () => {
    it('should load xml sitemap for thirty seven photos', () => {
      const mockedLoadThirtySevenPhotosSitemapUrls = jest
        .spyOn(apiUtil, 'loadThirtySevenPhotosSitemapUrls')
        .mockReturnValue([] as SitemapUrl[]);

      const mockedEnd = jest.fn().mockReturnValue(faker.lorem.lines());
      const xmlElement = {
        end: mockedEnd,
      } as unknown as xmlbuilder.XMLElement;

      const mockedCreate = jest
        .spyOn(xmlbuilder, 'create')
        .mockReturnValue(xmlElement);

      const result = sitemapXmlProvider.loadThirtySevenPhotosSitemapXml(
        [] as PublishedDateBestOfType[]
      );

      expect(mockedLoadThirtySevenPhotosSitemapUrls).toBeCalledTimes(1);
      expect(mockedCreate).toBeCalledTimes(1);
      expect(mockedEnd).toBeCalledTimes(1);
      expect(result).toBeDefined();
    });
  });
});
