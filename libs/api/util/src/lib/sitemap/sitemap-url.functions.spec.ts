import * as faker from 'faker';

import {
  BestOfType,
  SitemapEntityType,
} from '@dark-rush-photography/shared/types';
import {
  loadDarkRushPhotographySitemapUrls,
  loadSitemapEventUrls,
  loadThirtySevenPhotosSitemapUrls,
} from './sitemap-url.functions';

jest.mock('@dark-rush-photography/shared/util', () => ({
  ...jest.requireActual('@dark-rush-photography/shared/util'),
}));
import * as sharedUtil from '@dark-rush-photography/shared/util';

jest.mock('./sitemap-date.functions', () => ({
  ...jest.requireActual('./sitemap-date.functions'),
}));
import * as sitemapDateFunctions from './sitemap-date.functions';

describe('sitemap-url.functions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getDarkRushPhotographySitemapUrls', () => {
    it('should load Dark Rush Photography sitemap urls', () => {
      const firstMaxPublishedDate = faker.date.recent().toISOString();
      const secondMaxPublishedDate = faker.date.recent().toISOString();
      const firstSitemapEntityType = faker.random.arrayElement(
        Object.values(SitemapEntityType)
      );
      const secondSitemapEntityType = faker.random.arrayElement(
        Object.values(SitemapEntityType)
      );

      const firstLocation = faker.internet.url();
      const secondLocation = faker.internet.url();
      const mockedGetSitemapEntityTypeLocation = jest
        .spyOn(sharedUtil, 'getSitemapEntityTypeLocation')
        .mockReturnValueOnce(firstLocation)
        .mockReturnValueOnce(secondLocation);

      const firstPriority = faker.datatype.number().toString();
      const secondPriority = faker.datatype.number().toString();
      const mockedGetSitemapEntityTypePriority = jest
        .spyOn(sharedUtil, 'getSitemapEntityTypePriority')
        .mockReturnValueOnce(firstPriority)
        .mockReturnValueOnce(secondPriority);

      const mockedGetSitemapDate = jest
        .spyOn(sitemapDateFunctions, 'getSitemapDate')
        .mockReturnValueOnce(
          firstMaxPublishedDate.substring(0, firstMaxPublishedDate.indexOf('T'))
        )
        .mockReturnValueOnce(
          secondMaxPublishedDate.substring(
            0,
            secondMaxPublishedDate.indexOf('T')
          )
        );

      const firstChangeFrequency = faker.random.arrayElement([
        'daily',
        'weekly',
        'monthly',
      ]);
      const secondChangeFrequency = faker.random.arrayElement([
        'daily',
        'weekly',
        'monthly',
      ]);
      const mockedGetSitemapEntityTypeChangeFrequency = jest
        .spyOn(sharedUtil, 'getSitemapEntityTypeChangeFrequency')
        .mockReturnValueOnce(firstChangeFrequency)
        .mockReturnValueOnce(secondChangeFrequency);

      const result = loadDarkRushPhotographySitemapUrls([
        {
          maxPublishedDate: firstMaxPublishedDate,
          sitemapEntityType: firstSitemapEntityType,
        },
        {
          maxPublishedDate: secondMaxPublishedDate,
          sitemapEntityType: secondSitemapEntityType,
        },
      ]);

      expect(mockedGetSitemapEntityTypeLocation).toBeCalledTimes(2);
      const [locationSitemapEntityType1] =
        mockedGetSitemapEntityTypeLocation.mock.calls[0];
      expect(locationSitemapEntityType1).toBe(firstSitemapEntityType);
      const [locationSitemapEntityType2] =
        mockedGetSitemapEntityTypeLocation.mock.calls[1];
      expect(locationSitemapEntityType2).toBe(secondSitemapEntityType);

      expect(mockedGetSitemapEntityTypePriority).toBeCalledTimes(2);
      const [prioritySitemapEntityType1] =
        mockedGetSitemapEntityTypePriority.mock.calls[0];
      expect(prioritySitemapEntityType1).toBe(firstSitemapEntityType);
      const [prioritySitemapEntityType2] =
        mockedGetSitemapEntityTypePriority.mock.calls[1];
      expect(prioritySitemapEntityType2).toBe(secondSitemapEntityType);

      expect(mockedGetSitemapDate).toBeCalledTimes(2);
      const [maxPublishedDate1] = mockedGetSitemapDate.mock.calls[0];
      expect(maxPublishedDate1).toBe(firstMaxPublishedDate);
      const [maxPublishedDate2] = mockedGetSitemapDate.mock.calls[1];
      expect(maxPublishedDate2).toBe(secondMaxPublishedDate);

      expect(mockedGetSitemapEntityTypeChangeFrequency).toBeCalledTimes(2);
      const [changeFrequencyEntityType1] =
        mockedGetSitemapEntityTypeChangeFrequency.mock.calls[0];
      expect(changeFrequencyEntityType1).toBe(firstSitemapEntityType);
      const [changeFrequencyEntityType2] =
        mockedGetSitemapEntityTypeChangeFrequency.mock.calls[1];
      expect(changeFrequencyEntityType2).toBe(secondSitemapEntityType);

      expect(result).toEqual([
        {
          loc: firstLocation,
          priority: firstPriority,
          lastmod: firstMaxPublishedDate.substring(
            0,
            firstMaxPublishedDate.indexOf('T')
          ),
          changefreq: firstChangeFrequency,
        },
        {
          loc: secondLocation,
          priority: secondPriority,
          lastmod: secondMaxPublishedDate.substring(
            0,
            secondMaxPublishedDate.indexOf('T')
          ),
          changefreq: secondChangeFrequency,
        },
      ]);
    });
  });

  describe('loadSitemapEventUrls', () => {
    it('should load event sitemap urls', () => {
      const firstPublishedDate = faker.date.recent().toISOString();
      const secondPublishedDate = faker.date.recent().toISOString();
      const firstSlug = faker.lorem.word();
      const secondSlug = faker.lorem.word();

      const mockedGetSitemapDate = jest
        .spyOn(sitemapDateFunctions, 'getSitemapDate')
        .mockReturnValueOnce(
          firstPublishedDate.substring(0, firstPublishedDate.indexOf('T'))
        )
        .mockReturnValueOnce(
          secondPublishedDate.substring(0, secondPublishedDate.indexOf('T'))
        );

      const result = loadSitemapEventUrls([
        {
          publishedDate: firstPublishedDate,
          slug: firstSlug,
        },
        {
          publishedDate: secondPublishedDate,
          slug: secondSlug,
        },
      ]);

      expect(mockedGetSitemapDate).toBeCalledTimes(2);
      const [maxPublishedDate1] = mockedGetSitemapDate.mock.calls[0];
      expect(maxPublishedDate1).toBe(firstPublishedDate);
      const [maxPublishedDate2] = mockedGetSitemapDate.mock.calls[1];
      expect(maxPublishedDate2).toBe(secondPublishedDate);

      expect(result).toEqual([
        {
          loc: `https://www.darkrushphotography.com/events/${firstSlug}`,
          priority: '0.8',
          lastmod: firstPublishedDate.substring(
            0,
            firstPublishedDate.indexOf('T')
          ),
          changefreq: 'monthly',
        },
        {
          loc: `https://www.darkrushphotography.com/events/${secondSlug}`,
          priority: '0.8',
          lastmod: secondPublishedDate.substring(
            0,
            secondPublishedDate.indexOf('T')
          ),
          changefreq: 'monthly',
        },
      ]);
    });
  });

  describe('loadThirtySevenPhotosSitemapUrls', () => {
    it('should load thirty seven photos sitemap urls', () => {
      const firstPublishedDate = faker.date.recent().toISOString();
      const secondPublishedDate = faker.date.recent().toISOString();
      const firstBestOfType = faker.random.arrayElement(
        Object.values(BestOfType)
      );
      const secondBestOfType = faker.random.arrayElement(
        Object.values(BestOfType)
      );

      const firstLocation = faker.internet.url();
      const secondLocation = faker.internet.url();
      const mockedGetBestOfTypeSitemapLocation = jest
        .spyOn(sharedUtil, 'getBestOfTypeSitemapLocation')
        .mockReturnValueOnce(firstLocation)
        .mockReturnValueOnce(secondLocation);

      const firstPriority = faker.datatype.number().toString();
      const secondPriority = faker.datatype.number().toString();
      const mockedGetSitemapEntityTypePriority = jest
        .spyOn(sharedUtil, 'getBestOfTypeSitemapPriority')
        .mockReturnValueOnce(firstPriority)
        .mockReturnValueOnce(secondPriority);

      const mockedGetSitemapDate = jest
        .spyOn(sitemapDateFunctions, 'getSitemapDate')
        .mockReturnValueOnce(
          firstPublishedDate.substring(0, firstPublishedDate.indexOf('T'))
        )
        .mockReturnValueOnce(
          secondPublishedDate.substring(0, secondPublishedDate.indexOf('T'))
        );

      const result = loadThirtySevenPhotosSitemapUrls([
        {
          publishedDate: firstPublishedDate,
          bestOfType: firstBestOfType,
        },
        {
          publishedDate: secondPublishedDate,
          bestOfType: secondBestOfType,
        },
      ]);

      expect(mockedGetBestOfTypeSitemapLocation).toBeCalledTimes(2);
      const [locationBestOfType1] =
        mockedGetBestOfTypeSitemapLocation.mock.calls[0];
      expect(locationBestOfType1).toBe(firstBestOfType);
      const [locationBestOfType2] =
        mockedGetBestOfTypeSitemapLocation.mock.calls[1];
      expect(locationBestOfType2).toBe(secondBestOfType);

      expect(mockedGetSitemapEntityTypePriority).toBeCalledTimes(2);
      const [priorityBestOfType1] =
        mockedGetSitemapEntityTypePriority.mock.calls[0];
      expect(priorityBestOfType1).toBe(firstBestOfType);
      const [priorityBestOfType2] =
        mockedGetSitemapEntityTypePriority.mock.calls[1];
      expect(priorityBestOfType2).toBe(secondBestOfType);

      expect(mockedGetSitemapDate).toBeCalledTimes(2);
      const [publishedDate1] = mockedGetSitemapDate.mock.calls[0];
      expect(publishedDate1).toBe(firstPublishedDate);
      const [publishedDate2] = mockedGetSitemapDate.mock.calls[1];
      expect(publishedDate2).toBe(secondPublishedDate);

      expect(result).toEqual([
        {
          loc: firstLocation,
          priority: firstPriority,
          lastmod: firstPublishedDate.substring(
            0,
            firstPublishedDate.indexOf('T')
          ),
          changefreq: 'monthly',
        },
        {
          loc: secondLocation,
          priority: secondPriority,
          lastmod: secondPublishedDate.substring(
            0,
            secondPublishedDate.indexOf('T')
          ),
          changefreq: 'monthly',
        },
      ]);
    });
  });
});
