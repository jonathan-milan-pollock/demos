import {
  MaxPublishedDateSitemapEntityType,
  PublishedDateBestOfType,
  PublishedDatePathname,
  SitemapUrl,
} from '@dark-rush-photography/shared/types';
import {
  getBestOfTypeSitemapLocation,
  getBestOfTypeSitemapPriority,
  getSitemapEntityTypeChangeFrequency,
  getSitemapEntityTypeLocation,
  getSitemapEntityTypePriority,
} from '@dark-rush-photography/shared/util';
import { getSitemapDate } from './sitemap-date.functions';

export const loadDarkRushPhotographySitemapUrls = (
  maxPublishedDateSitemapEntityTypes: MaxPublishedDateSitemapEntityType[]
): SitemapUrl[] =>
  maxPublishedDateSitemapEntityTypes.reduce(
    (
      sitemapUrls: SitemapUrl[],
      maxPublishedDateSitemapEntityType: MaxPublishedDateSitemapEntityType
    ) => {
      const { maxPublishedDate, sitemapEntityType } =
        maxPublishedDateSitemapEntityType;
      return [
        ...sitemapUrls,
        {
          loc: getSitemapEntityTypeLocation(sitemapEntityType),
          priority: getSitemapEntityTypePriority(sitemapEntityType),
          lastmod: getSitemapDate(maxPublishedDate),
          changefreq: getSitemapEntityTypeChangeFrequency(sitemapEntityType),
        },
      ];
    },
    []
  );

export const loadSitemapEventUrls = (
  publishedDatePathnames: PublishedDatePathname[]
): SitemapUrl[] =>
  publishedDatePathnames.reduce(
    (sitemapUrls: SitemapUrl[], publishDatePathname: PublishedDatePathname) => [
      ...sitemapUrls,
      {
        loc: `https://darkrushphotography.com/events/${publishDatePathname.pathname}`,
        priority: '0.8',
        lastmod: getSitemapDate(publishDatePathname.publishedDate),
        changefreq: 'monthly',
      },
    ],
    []
  );

export const loadThirtySevenPhotosSitemapUrls = (
  publishedDateBestOfTypes: PublishedDateBestOfType[]
): SitemapUrl[] =>
  publishedDateBestOfTypes.reduce(
    (
      sitemapUrls: SitemapUrl[],
      publishedDateBestOfType: PublishedDateBestOfType
    ) => {
      const { publishedDate, bestOfType } = publishedDateBestOfType;
      return [
        ...sitemapUrls,
        {
          loc: getBestOfTypeSitemapLocation(bestOfType),
          priority: getBestOfTypeSitemapPriority(bestOfType),
          lastmod: getSitemapDate(publishedDate),
          changefreq: 'monthly',
        },
      ];
    },
    []
  );
