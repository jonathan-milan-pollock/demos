import { BadRequestException } from '@nestjs/common';

import * as faker from 'faker';

import {
  EntityType,
  EntityWithoutGroupType,
} from '@dark-rush-photography/shared/types';
import {
  getEntityTypeFromEntityWithoutGroupType,
  getEntityWithoutGroupTypeFolderName,
  getEntityWithoutGroupTypeInitialSlug,
} from './entity-without-group-type.functions';

describe('entity-without-group-type.functions', () => {
  const entityTypesWithoutGroupType: {
    entityType: EntityType;
    entityWithoutGroupType: EntityWithoutGroupType;
  }[] = [
    {
      entityType: EntityType.About,
      entityWithoutGroupType: EntityWithoutGroupType.About,
    },
    {
      entityType: EntityType.BestOf,
      entityWithoutGroupType: EntityWithoutGroupType.BestOf,
    },
    {
      entityType: EntityType.Destination,
      entityWithoutGroupType: EntityWithoutGroupType.Destination,
    },
    {
      entityType: EntityType.Favorites,
      entityWithoutGroupType: EntityWithoutGroupType.Favorites,
    },
    {
      entityType: EntityType.ImagePost,
      entityWithoutGroupType: EntityWithoutGroupType.ImagePost,
    },
    {
      entityType: EntityType.ImageVideo,
      entityWithoutGroupType: EntityWithoutGroupType.ImageVideo,
    },
    {
      entityType: EntityType.Review,
      entityWithoutGroupType: EntityWithoutGroupType.Review,
    },
    {
      entityType: EntityType.ReviewMedia,
      entityWithoutGroupType: EntityWithoutGroupType.ReviewMedia,
    },
  ];

  const entityWithoutGroupTypeFolderNames: {
    entityWithoutGroupType: EntityWithoutGroupType;
    folderName: string;
  }[] = [
    {
      entityWithoutGroupType: EntityWithoutGroupType.About,
      folderName: 'about',
    },
    {
      entityWithoutGroupType: EntityWithoutGroupType.BestOf,
      folderName: 'best-of',
    },
    {
      entityWithoutGroupType: EntityWithoutGroupType.Destination,
      folderName: 'destinations',
    },
    {
      entityWithoutGroupType: EntityWithoutGroupType.Favorites,
      folderName: 'favorites',
    },
    {
      entityWithoutGroupType: EntityWithoutGroupType.ImagePost,
      folderName: 'image-posts',
    },
    {
      entityWithoutGroupType: EntityWithoutGroupType.ImageVideo,
      folderName: 'image-video',
    },
    {
      entityWithoutGroupType: EntityWithoutGroupType.Review,
      folderName: 'reviews',
    },
    {
      entityWithoutGroupType: EntityWithoutGroupType.ReviewMedia,
      folderName: 'review-media',
    },
  ];

  const entityWithoutGroupTypeInitialSlugs: {
    entityWithoutGroupType: EntityWithoutGroupType;
    initialSlug?: string;
  }[] = [
    {
      entityWithoutGroupType: EntityWithoutGroupType.About,
      initialSlug: undefined,
    },
    {
      entityWithoutGroupType: EntityWithoutGroupType.BestOf,
      initialSlug: undefined,
    },
    {
      entityWithoutGroupType: EntityWithoutGroupType.Destination,
      initialSlug: undefined,
    },
    {
      entityWithoutGroupType: EntityWithoutGroupType.Favorites,
      initialSlug: 'best-37',
    },
    {
      entityWithoutGroupType: EntityWithoutGroupType.ImagePost,
      initialSlug: undefined,
    },
    {
      entityWithoutGroupType: EntityWithoutGroupType.ImageVideo,
      initialSlug: undefined,
    },
    {
      entityWithoutGroupType: EntityWithoutGroupType.Review,
      initialSlug: undefined,
    },
    {
      entityWithoutGroupType: EntityWithoutGroupType.ReviewMedia,
      initialSlug: 'media',
    },
  ];

  describe('getEntityTypeFromEntityWithoutGroupType', () => {
    it.each(entityTypesWithoutGroupType)(
      'should return entity type for %s',
      ({ entityType, entityWithoutGroupType }) => {
        expect(
          getEntityTypeFromEntityWithoutGroupType(entityWithoutGroupType)
        ).toBe(entityType);
      }
    );

    it('should throw a bad request exception if the entity without group type is invalid', () => {
      const entityWithoutGroupType = faker.lorem.word();
      const result = () => {
        getEntityTypeFromEntityWithoutGroupType(
          entityWithoutGroupType as EntityWithoutGroupType
        );
      };
      expect(result).toThrow(BadRequestException);
      expect(result).toThrow(
        `Could not get entity type for entity without group type ${entityWithoutGroupType}`
      );
    });
  });

  describe('getEntityWithoutGroupTypeFolderName', () => {
    it.each(entityWithoutGroupTypeFolderNames)(
      'should return folder name for %s',
      ({ entityWithoutGroupType, folderName }) => {
        expect(
          getEntityWithoutGroupTypeFolderName(entityWithoutGroupType)
        ).toBe(folderName);
      }
    );
    it('should throw a bad request exception if the entity without group type is invalid', () => {
      const entityWithoutGroupType = faker.lorem.word();
      const result = () => {
        getEntityWithoutGroupTypeFolderName(
          entityWithoutGroupType as EntityWithoutGroupType
        );
      };
      expect(result).toThrow(BadRequestException);
      expect(result).toThrow(
        `Could not get folder name for entity without group type ${entityWithoutGroupType}`
      );
    });
  });

  describe('getEntityWithoutGroupTypeInitialSlug', () => {
    it.each(entityWithoutGroupTypeInitialSlugs)(
      'should return initial slug for %s',
      ({ entityWithoutGroupType, initialSlug }) => {
        expect(
          getEntityWithoutGroupTypeInitialSlug(entityWithoutGroupType) ===
            initialSlug
        ).toBeTruthy();
      }
    );
  });
});
