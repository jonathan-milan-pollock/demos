import { ConflictException } from '@nestjs/common';

import faker from '@faker-js/faker';

import {
  EntityType,
  SitemapEntityType,
} from '@dark-rush-photography/shared/types';
import {
  getEntityTypeFromSitemapEntityType,
  getSitemapEntityTypeChangeFrequency,
  getSitemapEntityTypeLocation,
  getSitemapEntityTypePriority,
} from './sitemap-entity-type.functions';

describe('sitemap-entity-type.functions', () => {
  describe('getEntityTypeFromSitemapEntityType', () => {
    const entityTypeWithSitemapType: {
      entityType: EntityType;
      sitemapEntityType: SitemapEntityType;
    }[] = [
      {
        entityType: EntityType.About,
        sitemapEntityType: SitemapEntityType.About,
      },
      {
        entityType: EntityType.Destination,
        sitemapEntityType: SitemapEntityType.Destination,
      },
      {
        entityType: EntityType.Event,
        sitemapEntityType: SitemapEntityType.Event,
      },
      {
        entityType: EntityType.Favorites,
        sitemapEntityType: SitemapEntityType.Favorites,
      },
      {
        entityType: EntityType.PhotoOfTheWeek,
        sitemapEntityType: SitemapEntityType.PhotoOfTheWeek,
      },
      {
        entityType: EntityType.Review,
        sitemapEntityType: SitemapEntityType.Review,
      },
      {
        entityType: EntityType.ReviewMedia,
        sitemapEntityType: SitemapEntityType.ReviewMedia,
      },
    ];

    it.each(entityTypeWithSitemapType)(
      'should return entity type %s',
      ({ entityType, sitemapEntityType }) => {
        expect(getEntityTypeFromSitemapEntityType(sitemapEntityType)).toBe(
          entityType
        );
      }
    );

    it('should throw a conflict exception if cannot get entity type', () => {
      const sitemapEntityType = faker.lorem.word() as SitemapEntityType;
      const result = () => {
        getEntityTypeFromSitemapEntityType(sitemapEntityType);
      };
      expect(result).toThrow(ConflictException);
      expect(result).toThrow(
        `Could not get entity type for sitemap entity type ${sitemapEntityType}`
      );
    });

    it.each(Object.values(SitemapEntityType))(
      'should not throw for any sitemap entity type %s',
      (sitemapEntityType) => {
        const result = () => {
          getEntityTypeFromSitemapEntityType(sitemapEntityType);
        };
        expect(result).not.toThrow();
      }
    );
  });

  describe('getSitemapEntityTypeLocation', () => {
    const sitemapEntityTypeLocations: {
      sitemapEntityType: SitemapEntityType;
      location: string;
    }[] = [
      {
        sitemapEntityType: SitemapEntityType.About,
        location: 'https://darkrushphotography.com/about',
      },
      {
        sitemapEntityType: SitemapEntityType.Destination,
        location: 'https://darkrushphotography.com/destinations',
      },
      {
        sitemapEntityType: SitemapEntityType.Event,
        location: 'https://darkrushphotography.com/events',
      },
      {
        sitemapEntityType: SitemapEntityType.Favorites,
        location: 'https://darkrushphotography.com',
      },
      {
        sitemapEntityType: SitemapEntityType.PhotoOfTheWeek,
        location: 'https://darkrushphotography.com/photo-of-the-week',
      },
      {
        sitemapEntityType: SitemapEntityType.Review,
        location: 'https://darkrushphotography.com/reviews',
      },
      {
        sitemapEntityType: SitemapEntityType.ReviewMedia,
        location: 'https://darkrushphotography.com/reviews/review',
      },
    ];

    it.each(sitemapEntityTypeLocations)(
      'should return location %s',
      ({ sitemapEntityType, location }) => {
        expect(getSitemapEntityTypeLocation(sitemapEntityType)).toBe(location);
      }
    );

    it('should throw a conflict exception if cannot get location', () => {
      const sitemapEntityType = faker.lorem.word() as SitemapEntityType;
      const result = () => {
        getSitemapEntityTypeLocation(sitemapEntityType);
      };
      expect(result).toThrow(ConflictException);
      expect(result).toThrow(
        `Could not get location for sitemap entity type ${sitemapEntityType}`
      );
    });

    it.each(Object.values(SitemapEntityType))(
      'should not throw for any sitemap entity type %s',
      (sitemapEntityType) => {
        const result = () => {
          getSitemapEntityTypeLocation(sitemapEntityType);
        };
        expect(result).not.toThrow();
      }
    );
  });

  describe('getSitemapEntityTypePriority', () => {
    const sitemapEntityTypePriorities: {
      sitemapEntityType: SitemapEntityType;
      priority: string;
    }[] = [
      {
        sitemapEntityType: SitemapEntityType.About,
        priority: '0.9',
      },
      {
        sitemapEntityType: SitemapEntityType.Destination,
        priority: '0.8',
      },
      {
        sitemapEntityType: SitemapEntityType.Event,
        priority: '0.9',
      },
      {
        sitemapEntityType: SitemapEntityType.Favorites,
        priority: '1.0',
      },
      {
        sitemapEntityType: SitemapEntityType.PhotoOfTheWeek,
        priority: '0.8',
      },
      {
        sitemapEntityType: SitemapEntityType.Review,
        priority: '0.9',
      },
      {
        sitemapEntityType: SitemapEntityType.ReviewMedia,
        priority: '0.8',
      },
    ];

    it.each(sitemapEntityTypePriorities)(
      'should return priorities %s',
      ({ sitemapEntityType, priority }) => {
        expect(getSitemapEntityTypePriority(sitemapEntityType)).toBe(priority);
      }
    );

    it('should throw a conflict exception if cannot get priority', () => {
      const sitemapEntityType = faker.lorem.word() as SitemapEntityType;
      const result = () => {
        getSitemapEntityTypePriority(sitemapEntityType);
      };
      expect(result).toThrow(ConflictException);
      expect(result).toThrow(
        `Could not get priority for sitemap entity type ${sitemapEntityType}`
      );
    });

    it.each(Object.values(SitemapEntityType))(
      'should not throw for any sitemap entity type %s',
      (sitemapEntityType) => {
        const result = () => {
          getSitemapEntityTypePriority(sitemapEntityType);
        };
        expect(result).not.toThrow();
      }
    );
  });

  describe('getSitemapEntityTypeChangeFrequency', () => {
    const sitemapEntityTypeChangeFrequencies: {
      sitemapEntityType: SitemapEntityType;
      changeFrequency: string;
    }[] = [
      {
        sitemapEntityType: SitemapEntityType.About,
        changeFrequency: 'monthly',
      },
      {
        sitemapEntityType: SitemapEntityType.Destination,
        changeFrequency: 'weekly',
      },
      {
        sitemapEntityType: SitemapEntityType.Event,
        changeFrequency: 'daily',
      },
      {
        sitemapEntityType: SitemapEntityType.Favorites,
        changeFrequency: 'monthly',
      },
      {
        sitemapEntityType: SitemapEntityType.PhotoOfTheWeek,
        changeFrequency: 'weekly',
      },
      {
        sitemapEntityType: SitemapEntityType.Review,
        changeFrequency: 'monthly',
      },
      {
        sitemapEntityType: SitemapEntityType.ReviewMedia,
        changeFrequency: 'monthly',
      },
    ];

    it.each(sitemapEntityTypeChangeFrequencies)(
      'should return change frequency %s',
      ({ sitemapEntityType, changeFrequency }) => {
        expect(getSitemapEntityTypeChangeFrequency(sitemapEntityType)).toBe(
          changeFrequency
        );
      }
    );

    it('should throw a conflict exception if cannot get change frequency', () => {
      const sitemapEntityType = faker.lorem.word() as SitemapEntityType;
      const result = () => {
        getSitemapEntityTypeChangeFrequency(sitemapEntityType);
      };
      expect(result).toThrow(ConflictException);
      expect(result).toThrow(
        `Could not get change frequency for sitemap entity type ${sitemapEntityType}`
      );
    });

    it.each(Object.values(SitemapEntityType))(
      'should not throw for any sitemap entity type %s',
      (sitemapEntityType) => {
        const result = () => {
          getSitemapEntityTypeChangeFrequency(sitemapEntityType);
        };
        expect(result).not.toThrow();
      }
    );
  });
});
