import { ConflictException } from '@nestjs/common';

import faker from '@faker-js/faker';

import { BestOfType } from '@dark-rush-photography/shared/types';
import {
  getBestOfTypeFromPathname,
  getBestOfTypeSitemapLocation,
  getBestOfTypeSitemapPriority,
} from './best-of-type.functions';

describe('best-of-type.functions', () => {
  describe('getBestOfTypeFromPathname', () => {
    const bestOfTypePathnames: {
      bestOfType: BestOfType;
      pathname: string;
    }[] = [
      {
        bestOfType: BestOfType.Children,
        pathname: 'children',
      },
      {
        bestOfType: BestOfType.Events,
        pathname: 'events',
      },
      {
        bestOfType: BestOfType.Landscapes,
        pathname: 'landscapes',
      },
      {
        bestOfType: BestOfType.Nature,
        pathname: 'nature',
      },
      {
        bestOfType: BestOfType.RealEstate,
        pathname: 'real-estate',
      },
    ];
    it.each(bestOfTypePathnames)(
      'should return best of type %s',
      ({ bestOfType, pathname }) => {
        expect(getBestOfTypeFromPathname(pathname)).toBe(bestOfType);
      }
    );

    it('should throw a conflict exception if cannot get the best of type', () => {
      const pathname = faker.lorem.word();
      const result = () => {
        getBestOfTypeFromPathname(pathname);
      };
      expect(result).toThrow(ConflictException);
      expect(result).toThrow(
        `Could not get best of type for pathname ${pathname}`
      );
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
