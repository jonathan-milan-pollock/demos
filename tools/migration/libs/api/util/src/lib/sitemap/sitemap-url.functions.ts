import {
  MaxPublishedDateSitemapEntityType,
  PublishedDateBestOfType,
  PublishedDateSlug,
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
  publishedDateSlugs: PublishedDateSlug[]
): SitemapUrl[] =>
  publishedDateSlugs.reduce(
    (sitemapUrls: SitemapUrl[], publishDateSlug: PublishedDateSlug) => [
      ...sitemapUrls,
      {
        loc: `https://darkrushphotography.com/events/${publishDateSlug.slug}`,
        priority: '0.8',
        lastmod: getSitemapDate(publishDateSlug.publishedDate),
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
