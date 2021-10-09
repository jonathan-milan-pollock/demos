import { Injectable } from '@nestjs/common';

import * as xmlbuilder from 'xmlbuilder';

import {
  getBestOfTypeSitemapLocation,
  getBestOfTypeSitemapPriority,
  getSitemapDate,
  getSitemapEntityTypeChangeFrequency,
  getSitemapEntityTypeLocation,
  getSitemapEntityTypePriority,
} from '@dark-rush-photography/api/util';
import {
  SitemapUrl,
  DatePublishedBestOfType,
  DatePublishedSitemapEntityType,
  Entity,
  Event,
} from '@dark-rush-photography/shared/types';

@Injectable()
export class SitemapLoadXmlProvider {
  loadDarkRushPhotographySitemapXml(
    datePublishedEntityTypes: DatePublishedSitemapEntityType[],
    eventEntities: Entity[]
  ): string {
    const sitemapEntityUrls = datePublishedEntityTypes.reduce(
      (
        sitemapUrls: SitemapUrl[],
        datePublishedSitemapEntityType: DatePublishedSitemapEntityType
      ) => {
        const { datePublished, sitemapEntityType } =
          datePublishedSitemapEntityType;
        return [
          ...sitemapUrls,
          {
            loc: getSitemapEntityTypeLocation(sitemapEntityType),
            priority: getSitemapEntityTypePriority(sitemapEntityType),
            lastmod: datePublished
              ? getSitemapDate(datePublished)
              : getSitemapDate(new Date().toISOString()),
            changefreq: getSitemapEntityTypeChangeFrequency(sitemapEntityType),
          },
        ];
      },
      []
    );

    const sitemapEventUrls = eventEntities.reduce(
      (sitemapUrls: SitemapUrl[], event: Event) => {
        const { datePublished, slug } = event;
        return [
          ...sitemapUrls,
          {
            loc: `https://www.darkrushphotography.com/events/${slug}`,
            priority: '0.8',
            lastmod: datePublished
              ? getSitemapDate(datePublished)
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
    datePublishedBestOfTypes: DatePublishedBestOfType[]
  ): string {
    const sitemapUrls = datePublishedBestOfTypes.reduce(
      (
        sitemapUrls: SitemapUrl[],
        datePublishedBestOfType: DatePublishedBestOfType
      ) => {
        const { datePublished, bestOfType } = datePublishedBestOfType;
        return [
          ...sitemapUrls,
          {
            loc: getBestOfTypeSitemapLocation(bestOfType),
            priority: getBestOfTypeSitemapPriority(bestOfType),
            lastmod: datePublished
              ? getSitemapDate(datePublished)
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
