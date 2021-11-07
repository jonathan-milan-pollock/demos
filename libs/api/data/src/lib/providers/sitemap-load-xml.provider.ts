import { Injectable } from '@nestjs/common';

import * as xmlbuilder from 'xmlbuilder';

import {
  SitemapUrl,
  PublishedDateBestOfType,
  PublishedDateSitemapEntityType,
  Entity,
} from '@dark-rush-photography/shared/types';
import {
  getBestOfTypeSitemapLocation,
  getBestOfTypeSitemapPriority,
  getSitemapEntityTypeChangeFrequency,
  getSitemapEntityTypeLocation,
  getSitemapEntityTypePriority,
} from '@dark-rush-photography/shared/util';
import { getSitemapDate } from '@dark-rush-photography/api/util';

@Injectable()
export class SitemapLoadXmlProvider {
  loadDarkRushPhotographySitemapXml(
    publishedDateEntityTypes: PublishedDateSitemapEntityType[],
    eventEntities: Entity[]
  ): string {
    const sitemapEntityUrls = publishedDateEntityTypes.reduce(
      (
        sitemapUrls: SitemapUrl[],
        publishedDateSitemapEntityType: PublishedDateSitemapEntityType
      ) => {
        const { publishedDate, sitemapEntityType } =
          publishedDateSitemapEntityType;
        return [
          ...sitemapUrls,
          {
            loc: getSitemapEntityTypeLocation(sitemapEntityType),
            priority: getSitemapEntityTypePriority(sitemapEntityType),
            lastmod: publishedDate
              ? getSitemapDate(publishedDate)
              : getSitemapDate(new Date().toISOString()),
            changefreq: getSitemapEntityTypeChangeFrequency(sitemapEntityType),
          },
        ];
      },
      []
    );

    const sitemapEventUrls = eventEntities.reduce(
      (sitemapUrls: SitemapUrl[], event: Entity) => {
        const { publishedDate, slug } = event;
        return [
          ...sitemapUrls,
          {
            loc: `https://www.darkrushphotography.com/events/${slug}`,
            priority: '0.8',
            lastmod: publishedDate
              ? getSitemapDate(publishedDate)
              : getSitemapDate(new Date().toISOString()),
            changefreq: 'monthly',
          },
        ];
      },
      []
    );

    const sitemapJson = {
      urlset: {
        '@xmlns': 'http://www.sitemaps.org/schemas/sitemap/0.9',
        url: [...sitemapEntityUrls, ...sitemapEventUrls],
      },
    };

    const sitemapXml = xmlbuilder.create(sitemapJson, { encoding: 'utf-8' });
    return sitemapXml.end({ pretty: true });
  }

  loadThirtySevenPhotosSitemapXml(
    publishedDateBestOfTypes: PublishedDateBestOfType[]
  ): string {
    const sitemapUrls = publishedDateBestOfTypes.reduce(
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
            lastmod: publishedDate
              ? getSitemapDate(publishedDate)
              : getSitemapDate(new Date().toISOString()),
            changefreq: 'monthly',
          },
        ];
      },
      []
    );

    const sitemapJson = {
      urlset: {
        '@xmlns': 'http://www.sitemaps.org/schemas/sitemap/0.9',
        url: [...sitemapUrls],
      },
    };

    const sitemapXml = xmlbuilder.create(sitemapJson, { encoding: 'utf-8' });
    return sitemapXml.end({ pretty: true });
  }
}
