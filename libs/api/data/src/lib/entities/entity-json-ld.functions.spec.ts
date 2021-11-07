/* eslint-disable @typescript-eslint/no-unused-vars */
import * as faker from 'faker';

import { Entity, JsonLdListItem } from '@dark-rush-photography/shared/types';
import {
  loadEventJsonLdNewsArticle,
  loadEventsJsonLdList,
} from './entity-json-ld.functions';

jest.mock('@dark-rush-photography/shared/util', () => ({
  ...jest.requireActual('@dark-rush-photography/shared/util'),
}));
import * as sharedUtil from '@dark-rush-photography/shared/util';

jest.mock('./entity-load-json-ld.functions', () => ({
  ...jest.requireActual('./entity-load-json-ld.functions'),
}));
import * as entityLoadJsonLdFunctions from './entity-load-json-ld.functions';

describe('entity-json-ld.functions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('loadEventsJsonLdList', () => {
    it('should load a json ld list with all values', () => {
      const events = [
        { slug: faker.lorem.word() } as Entity,
        { slug: faker.lorem.word() } as Entity,
        { slug: faker.lorem.word() } as Entity,
      ];

      const listItems: JsonLdListItem[] = [
        {
          '@type': 'ListItem',
          position: 1,
          url: `https://darkrushphotography.com/events/${events[0].slug}`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          url: `https://darkrushphotography.com/events/${events[1].slug}`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          url: `https://darkrushphotography.com/events/${events[2].slug}`,
        },
      ];

      const mockedGetSitemapEntityTypeLocation = jest
        .spyOn(sharedUtil, 'getSitemapEntityTypeLocation')
        .mockReturnValue('https://darkrushphotography.com/events');

      const result = loadEventsJsonLdList(events);

      expect(mockedGetSitemapEntityTypeLocation).toBeCalledTimes(3);
      expect(result['@context']).toBe('https://schema.org');
      expect(result['@type']).toBe('ItemList');
      expect(result.itemListElement).toEqual(listItems);
    });
  });

  describe('loadEventJsonLdNewsArticle', () => {
    it('should load a json ld news article with all values', () => {
      const event = {
        slug: faker.lorem.word(),
        title: faker.lorem.sentence(),
        text: faker.lorem.paragraphs(),
        createdDate: faker.date.recent().toISOString(),
      } as Entity;
      const isProduction = faker.datatype.boolean();

      const mockedLoadJsonLdEventImageUrls = jest
        .spyOn(entityLoadJsonLdFunctions, 'loadJsonLdEventImageUrls')
        .mockReturnValue([] as string[]);

      const mockedLoadJsonLdEventCreatedDate = jest
        .spyOn(entityLoadJsonLdFunctions, 'loadJsonLdEventCreatedDate')
        .mockReturnValue(faker.date.recent().toISOString());

      const result = loadEventJsonLdNewsArticle(event, isProduction);

      expect(mockedLoadJsonLdEventImageUrls).toBeCalledTimes(1);
      const [_event, isProductionInCall] =
        mockedLoadJsonLdEventImageUrls.mock.calls[0];
      expect(isProductionInCall).toBe(isProduction);
      expect(mockedLoadJsonLdEventCreatedDate).toBeCalledTimes(1);

      expect(result['@context']).toBe('https://schema.org');
      expect(result['@type']).toBe('NewsArticle');
      expect(result.mainEntityOfPage['@type']).toBe('WebPage');
      expect(result.mainEntityOfPage['@id']).toBe(
        `https://darkrushphotography.com/${event.slug}`
      );
      expect(result.headline).toBe(event.title);
      expect(result.description).toBe(event.text);
      expect(result.image).toBeDefined();
      expect(result.publishedDate).toBeDefined();
      expect(result.author['@type']).toBe('Person');
      expect(result.author.name).toBe('Dark Rush');
      expect(result.publisher['@type']).toBe('Organization');
      expect(result.publisher.name).toBe('Dark Rush Photography');
      expect(result.publisher.logo['@type']).toBe('ImageObject');
      expect(result.publisher.logo.url).toBe(
        'https://darkrushphotography.com/dark-rush-photography.png'
      );
    });

    it('should load a json ld news article with values for undefined entity values', () => {
      const event = {
        slug: faker.lorem.word(),
        title: undefined,
        text: undefined,
        createdDate: faker.date.recent().toISOString(),
      } as Entity;

      const result = loadEventJsonLdNewsArticle(
        event,
        faker.datatype.boolean()
      );

      expect(result.headline).toBe('');
      expect(result.description).toBe('');
    });
  });
});
