import { ConflictException } from '@nestjs/common';

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
  describe('getEntityTypeFromEntityWithoutGroupType', () => {
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
      {
        entityType: EntityType.Test,
        entityWithoutGroupType: EntityWithoutGroupType.Test,
      },
    ];

    it.each(entityTypesWithoutGroupType)(
      'should return entity type %s',
      ({ entityType, entityWithoutGroupType }) => {
        expect(
          getEntityTypeFromEntityWithoutGroupType(entityWithoutGroupType)
        ).toBe(entityType);
      }
    );

    it('should throw a conflict exception if cannot get entity type', () => {
      const entityWithoutGroupType =
        faker.lorem.word() as EntityWithoutGroupType;
      const result = () => {
        getEntityTypeFromEntityWithoutGroupType(entityWithoutGroupType);
      };
      expect(result).toThrow(ConflictException);
      expect(result).toThrow(
        `Could not get entity type for entity without group type ${entityWithoutGroupType}`
      );
    });

    it.each(Object.values(EntityWithoutGroupType))(
      'should not throw for any entity without group type %s',
      (entityWithoutGroupType) => {
        const result = () => {
          getEntityTypeFromEntityWithoutGroupType(entityWithoutGroupType);
        };
        expect(result).not.toThrow();
      }
    );
  });

  describe('getEntityWithoutGroupTypeFolderName', () => {
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
      {
        entityWithoutGroupType: EntityWithoutGroupType.Test,
        folderName: 'test',
      },
    ];
    it.each(entityWithoutGroupTypeFolderNames)(
      'should return folder name %s',
      ({ entityWithoutGroupType, folderName }) => {
        expect(
          getEntityWithoutGroupTypeFolderName(entityWithoutGroupType)
        ).toBe(folderName);
      }
    );

    it('should throw a conflict exception if cannot get folder name', () => {
      const entityWithoutGroupType =
        faker.lorem.word() as EntityWithoutGroupType;
      const result = () => {
        getEntityWithoutGroupTypeFolderName(entityWithoutGroupType);
      };
      expect(result).toThrow(ConflictException);
      expect(result).toThrow(
        `Could not get folder name for entity without group type ${entityWithoutGroupType}`
      );
    });

    it.each(Object.values(EntityWithoutGroupType))(
      'should not throw for any entity without group type %s',
      (entityWithoutGroupType) => {
        const result = () => {
          getEntityWithoutGroupTypeFolderName(entityWithoutGroupType);
        };
        expect(result).not.toThrow();
      }
    );
  });

  describe('getEntityWithoutGroupTypeInitialSlug', () => {
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
        initialSlug: 'favorites',
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
        initialSlug: 'review-thank-you',
      },
      {
        entityWithoutGroupType: EntityWithoutGroupType.Test,
        initialSlug: undefined,
      },
    ];

    it.each(entityWithoutGroupTypeInitialSlugs)(
      'should return initial slug %s',
      ({ entityWithoutGroupType, initialSlug }) => {
        expect(
          getEntityWithoutGroupTypeInitialSlug(entityWithoutGroupType)
        ).toBe(initialSlug);
      }
    );
  });
});
