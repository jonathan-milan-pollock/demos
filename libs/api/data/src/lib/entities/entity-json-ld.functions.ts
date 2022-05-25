import {
  Entity,
  JsonLdList,
  JsonLdNewsArticle,
  SitemapEntityType,
} from '@dark-rush-photography/shared/types';
import { getSitemapEntityTypeLocation } from '@dark-rush-photography/shared/util';
import {
  loadJsonLdEventCreatedDate,
  loadJsonLdEventImageUrls,
} from './entity-load-json-ld.functions';

export const loadEventsJsonLdList = (events: Entity[]): JsonLdList => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: events.map((event, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    url: `${getSitemapEntityTypeLocation(SitemapEntityType.Event)}/${
      event.pathname
    }`,
  })),
});

export const loadEventJsonLdNewsArticle = (
  event: Entity,
  isProduction: boolean
): JsonLdNewsArticle => ({
  '@context': 'https://schema.org',
  '@type': 'NewsArticle',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': `https://darkrushphotography.com/${event.pathname}`,
  },
  headline: event.title ?? '',
  description: event.text ?? '',
  image: loadJsonLdEventImageUrls(event, isProduction),
  publishedDate: loadJsonLdEventCreatedDate(new Date(), event.createdDate),
  author: {
    '@type': 'Person',
    name: 'Dark Rush',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Dark Rush Photography',
    logo: {
      '@type': 'ImageObject',
      url: 'https://darkrushphotography.com/dark-rush-photography.png',
    },
  },
});
