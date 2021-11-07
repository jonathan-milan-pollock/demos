import { ConflictException } from '@nestjs/common';

import * as faker from 'faker';

import { BestOfType } from '@dark-rush-photography/shared/types';
import {
  getBestOfTypeFromSlug,
  getBestOfTypeSitemapLocation,
  getBestOfTypeSitemapPriority,
} from './best-of-type.functions';

describe('best-of-type.functions', () => {
  describe('getBestOfTypeFromSlug', () => {
    const bestOfTypeSlugs: {
      bestOfType: BestOfType;
      slug: string;
    }[] = [
      {
        bestOfType: BestOfType.Children,
        slug: 'children',
      },
      {
        bestOfType: BestOfType.Events,
        slug: 'events',
      },
      {
        bestOfType: BestOfType.Landscapes,
        slug: 'landscapes',
      },
      {
        bestOfType: BestOfType.Nature,
        slug: 'nature',
      },
      {
        bestOfType: BestOfType.RealEstate,
        slug: 'real-estate',
      },
    ];
    it.each(bestOfTypeSlugs)(
      'should return best of type %s',
      ({ bestOfType, slug }) => {
        expect(getBestOfTypeFromSlug(slug)).toBe(bestOfType);
      }
    );

    it('should throw a conflict exception if cannot get the best of type', () => {
      const slug = faker.lorem.word();
      const result = () => {
        getBestOfTypeFromSlug(slug);
      };
      expect(result).toThrow(ConflictException);
      expect(result).toThrow(`Could not get best of type for slug ${slug}`);
    });
  });

  describe('getBestOfTypeSitemapLocation', () => {
    const bestOfTypeSitemapLocations: {
      bestOfType: BestOfType;
      sitemapLocation: string;
    }[] = [
      {
        bestOfType: BestOfType.Children,
        sitemapLocation: 'https://37.photos/children',
      },
      {
        bestOfType: BestOfType.Events,
        sitemapLocation: 'https://37.photos/events',
      },
      {
        bestOfType: BestOfType.Landscapes,
        sitemapLocation: 'https://37.photos/landscapes',
      },
      {
        bestOfType: BestOfType.Nature,
        sitemapLocation: 'https://37.photos/nature',
      },
      {
        bestOfType: BestOfType.RealEstate,
        sitemapLocation: 'https://37.photos/real-estate',
      },
    ];
    it.each(bestOfTypeSitemapLocations)(
      'should return sitemap location %s',
      ({ bestOfType, sitemapLocation }) => {
        expect(getBestOfTypeSitemapLocation(bestOfType)).toBe(sitemapLocation);
      }
    );

    it('should throw a conflict exception if cannot get sitemap location', () => {
      const bestOfType = faker.lorem.word() as BestOfType;
      const result = () => {
        getBestOfTypeSitemapLocation(bestOfType);
      };
      expect(result).toThrow(ConflictException);
      expect(result).toThrow(
        `Could not get sitemap location for best of type ${bestOfType}`
      );
    });
  });

  describe('getBestOfTypeSitemapPriority', () => {
    const bestOfTypeSitemapPriorities: {
      bestOfType: BestOfType;
      sitemapPriority: string;
    }[] = [
      {
        bestOfType: BestOfType.Children,
        sitemapPriority: '0.8',
      },
      {
        bestOfType: BestOfType.Events,
        sitemapPriority: '1.0',
      },
      {
        bestOfType: BestOfType.Landscapes,
        sitemapPriority: '0.8',
      },
      {
        bestOfType: BestOfType.Nature,
        sitemapPriority: '0.9',
      },
      {
        bestOfType: BestOfType.RealEstate,
        sitemapPriority: '0.9',
      },
    ];
    it.each(bestOfTypeSitemapPriorities)(
      'should return sitemap priority %s',
      ({ bestOfType, sitemapPriority }) => {
        expect(getBestOfTypeSitemapPriority(bestOfType)).toBe(sitemapPriority);
      }
    );

    it('should throw a conflict exception if cannot get sitemap priority', () => {
      const bestOfType = faker.lorem.word() as BestOfType;
      const result = () => {
        getBestOfTypeSitemapPriority(bestOfType);
      };
      expect(result).toThrow(ConflictException);
      expect(result).toThrow(
        `Could not get sitemap priority for best of type ${bestOfType}`
      );
    });
  });
});
