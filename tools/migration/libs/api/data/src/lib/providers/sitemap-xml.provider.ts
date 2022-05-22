import { Injectable } from '@nestjs/common';

import * as xmlbuilder from 'xmlbuilder';

import {
  MaxPublishedDateSitemapEntityType,
  PublishedDateBestOfType,
  PublishedDateSlug,
} from '@dark-rush-photography/shared/types';
import {
  loadDarkRushPhotographySitemapUrls,
  loadSitemapEventUrls,
  loadThirtySevenPhotosSitemapUrls,
} from '@dark-rush-photography/api/util';

@Injectable()
export class SitemapXmlProvider {
  loadDarkRushPhotographySitemapXml(
    maxPublishedDateSitemapEntityTypes: MaxPublishedDateSitemapEntityType[],
    eventPublishDateSlugs: PublishedDateSlug[]
  ): string {
    return xmlbuilder
      .create(
        {
          urlset: {
            '@xmlns': 'http://www.sitemaps.org/schemas/sitemap/0.9',
            url: [
              ...loadDarkRushPhotographySitemapUrls(
                maxPublishedDateSitemapEntityTypes
              ),
              ...loadSitemapEventUrls(eventPublishDateSlugs),
            ],
          },
        },
        { encoding: 'utf-8' }
      )
      .end({ pretty: true });
  }

  loadThirtySevenPhotosSitemapXml(
    publishedDateBestOfTypes: PublishedDateBestOfType[]
  ): string {
    return xmlbuilder
      .create(
        {
          urlset: {
            '@xmlns': 'http://www.sitemaps.org/schemas/sitemap/0.9',
            url: [
              ...loadThirtySevenPhotosSitemapUrls(publishedDateBestOfTypes),
            ],
          },
        },
        { encoding: 'utf-8' }
      )
      .end({ pretty: true });
  }
}
