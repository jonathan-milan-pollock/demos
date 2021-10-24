import { ConflictException } from '@nestjs/common';

import * as faker from 'faker';

import {
  EntityType,
  ImageDimensionType,
} from '@dark-rush-photography/shared/types';
import {
  getEntityTypeImageDimensionTypes,
  getEntityTypeLovedImageDimensionTypes,
  getEntityTypeStarredImageDimensionTypes,
} from './image-dimension-type.functions';

describe('image-dimension-type.functions', () => {
  describe('getEntityTypeImageDimensionTypes', () => {
    const entityTypeImageDimensionTypes: {
      entityType: EntityType;
      imageDimensionTypes: ImageDimensionType[];
    }[] = [
      {
        entityType: EntityType.About,
        imageDimensionTypes: [
          ImageDimensionType.Thumbnail,
          ImageDimensionType.Small,
          ImageDimensionType.Medium,
          ImageDimensionType.Large,
        ],
      },
      {
        entityType: EntityType.BestOf,
        imageDimensionTypes: [
          ImageDimensionType.Thumbnail,
          ImageDimensionType.Small,
          ImageDimensionType.Medium,
          ImageDimensionType.Large,
        ],
      },
      {
        entityType: EntityType.Destination,
        imageDimensionTypes: [
          ImageDimensionType.DestinationThumbnail,
          ImageDimensionType.DestinationSmall,
          ImageDimensionType.DestinationMedium,
          ImageDimensionType.DestinationLarge,
        ],
      },
      {
        entityType: EntityType.Event,
        imageDimensionTypes: [
          ImageDimensionType.Thumbnail,
          ImageDimensionType.Small,
          ImageDimensionType.Medium,
          ImageDimensionType.Large,
        ],
      },
      {
        entityType: EntityType.Favorites,
        imageDimensionTypes: [
          ImageDimensionType.Thumbnail,
          ImageDimensionType.Small,
          ImageDimensionType.Medium,
          ImageDimensionType.Large,
        ],
      },
      {
        entityType: EntityType.ImagePost,
        imageDimensionTypes: [
          ImageDimensionType.Facebook,
          ImageDimensionType.Instagram,
          ImageDimensionType.LinkedIn,
          ImageDimensionType.GoogleBusiness,
        ],
      },
      {
        entityType: EntityType.ImageVideo,
        imageDimensionTypes: [],
      },
      {
        entityType: EntityType.PhotoOfTheWeek,
        imageDimensionTypes: [
          ImageDimensionType.Thumbnail,
          ImageDimensionType.Small,
          ImageDimensionType.Medium,
          ImageDimensionType.Large,
          ImageDimensionType.StarredThumbnail,
          ImageDimensionType.StarredSmall,
          ImageDimensionType.StarredMedium,
          ImageDimensionType.StarredLarge,
          ImageDimensionType.Facebook,
          ImageDimensionType.Instagram,
          ImageDimensionType.LinkedIn,
          ImageDimensionType.GoogleBusiness,
        ],
      },
      {
        entityType: EntityType.Review,
        imageDimensionTypes: [
          ImageDimensionType.ReviewThumbnail,
          ImageDimensionType.ReviewSmall,
          ImageDimensionType.ReviewMedium,
          ImageDimensionType.ReviewLarge,
        ],
      },
      {
        entityType: EntityType.ReviewMedia,
        imageDimensionTypes: [
          ImageDimensionType.Thumbnail,
          ImageDimensionType.Small,
          ImageDimensionType.Medium,
          ImageDimensionType.Large,
        ],
      },
      {
        entityType: EntityType.Test,
        imageDimensionTypes: [],
      },
    ];

    it.each(entityTypeImageDimensionTypes)(
      'should return image dimension types %s',
      ({ entityType, imageDimensionTypes }) => {
        expect(getEntityTypeImageDimensionTypes(entityType)).toEqual(
          imageDimensionTypes
        );
      }
    );

    it('should throw a conflict exception if cannot get entity type', () => {
      const entityType = faker.lorem.word() as EntityType;
      const result = () => {
        getEntityTypeImageDimensionTypes(entityType);
      };
      expect(result).toThrow(ConflictException);
      expect(result).toThrow(
        `Could not get image dimension types for entity type ${entityType}`
      );
    });

    it.each(Object.values(EntityType))(
      'should not throw for any entity type %s',
      (entityType) => {
        const result = () => {
          getEntityTypeImageDimensionTypes(entityType);
        };
        expect(result).not.toThrow();
      }
    );
  });

  describe('getEntityTypeStarredImageDimensionTypes', () => {
    const entityTypeStarredImageDimensionTypes: {
      entityType: EntityType;
      imageDimensionTypes: ImageDimensionType[];
    }[] = [
      {
        entityType: EntityType.Destination,
        imageDimensionTypes: [
          ImageDimensionType.DestinationStarredThumbnail,
          ImageDimensionType.DestinationStarredSmall,
          ImageDimensionType.DestinationStarredMedium,
          ImageDimensionType.DestinationStarredLarge,
        ],
      },
      {
        entityType: EntityType.Event,
        imageDimensionTypes: [
          ImageDimensionType.StarredThumbnail,
          ImageDimensionType.StarredSmall,
          ImageDimensionType.StarredMedium,
          ImageDimensionType.StarredLarge,
          ImageDimensionType.YouTubeThumbnail,
          ImageDimensionType.YouTube,
        ],
      },
      {
        entityType: EntityType.ImageVideo,
        imageDimensionTypes: [
          ImageDimensionType.YouTubeThumbnail,
          ImageDimensionType.YouTube,
        ],
      },
    ];

    it.each(entityTypeStarredImageDimensionTypes)(
      'should return image dimension types %s',
      ({ entityType, imageDimensionTypes }) => {
        expect(getEntityTypeStarredImageDimensionTypes(entityType)).toEqual(
          imageDimensionTypes
        );
      }
    );

    it('should throw a conflict exception if cannot get entity type', () => {
      const entityType = faker.lorem.word() as EntityType;
      const result = () => {
        getEntityTypeStarredImageDimensionTypes(entityType);
      };
      expect(result).toThrow(ConflictException);
      expect(result).toThrow(
        `Could not get starred image dimension types for entity type ${entityType}`
      );
    });
  });

  describe('getEntityTypeLovedImageDimensionTypes', () => {
    const entityTypeLovedImageDimensionTypes: {
      entityType: EntityType;
      imageDimensionTypes: ImageDimensionType[];
    }[] = [
      {
        entityType: EntityType.Event,
        imageDimensionTypes: [ImageDimensionType.YouTube],
      },
      {
        entityType: EntityType.ImageVideo,
        imageDimensionTypes: [ImageDimensionType.YouTube],
      },
    ];

    it.each(entityTypeLovedImageDimensionTypes)(
      'should return image dimension types %s',
      ({ entityType, imageDimensionTypes }) => {
        expect(getEntityTypeLovedImageDimensionTypes(entityType)).toEqual(
          imageDimensionTypes
        );
      }
    );

    it('should throw a conflict exception if cannot get entity type', () => {
      const entityType = faker.lorem.word() as EntityType;
      const result = () => {
        getEntityTypeLovedImageDimensionTypes(entityType);
      };
      expect(result).toThrow(ConflictException);
      expect(result).toThrow(
        `Could not get loved image dimension types for entity type ${entityType}`
      );
    });
  });
});
