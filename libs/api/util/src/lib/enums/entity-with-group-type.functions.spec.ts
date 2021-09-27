import { BadRequestException } from '@nestjs/common';

import * as faker from 'faker';

import {
  EntityType,
  EntityWithGroupType,
} from '@dark-rush-photography/shared/types';
import {
  getEntityHasGroup,
  getEntityTypeFromEntityWithGroupType,
  getEntityWithGroupTypeFolderName,
} from './entity-with-group-type.functions';

describe('entity-with-group-type.functions', () => {
  const entityWithGroupTypes: {
    entityType: EntityType;
  }[] = [
    {
      entityType: EntityType.Event,
    },
    {
      entityType: EntityType.PhotoOfTheWeek,
    },
    {
      entityType: EntityType.SocialMedia,
    },
  ];

  const entityTypesWithGroupType: {
    entityType: EntityType;
    entityWithGroupType: EntityWithGroupType;
  }[] = [
    {
      entityType: EntityType.Event,
      entityWithGroupType: EntityWithGroupType.Event,
    },
    {
      entityType: EntityType.PhotoOfTheWeek,
      entityWithGroupType: EntityWithGroupType.PhotoOfTheWeek,
    },
    {
      entityType: EntityType.SocialMedia,
      entityWithGroupType: EntityWithGroupType.SocialMedia,
    },
  ];

  const entityWithGroupTypeFolderNames: {
    entityWithGroupType: EntityWithGroupType;
    folderName: string;
  }[] = [
    {
      entityWithGroupType: EntityWithGroupType.Event,
      folderName: 'events',
    },
    {
      entityWithGroupType: EntityWithGroupType.PhotoOfTheWeek,
      folderName: 'photo-of-the-week',
    },
    {
      entityWithGroupType: EntityWithGroupType.SocialMedia,
      folderName: 'social-media',
    },
  ];

  const entityWithoutGroupTypes: {
    entityType: EntityType;
  }[] = [
    {
      entityType: EntityType.About,
    },
    {
      entityType: EntityType.BestOf,
    },
    {
      entityType: EntityType.Destination,
    },
    {
      entityType: EntityType.Favorites,
    },
    {
      entityType: EntityType.ImagePost,
    },
    {
      entityType: EntityType.ImageVideo,
    },
    {
      entityType: EntityType.Review,
    },
    {
      entityType: EntityType.ReviewMedia,
    },
  ];

  describe('getEntityHasGroup', () => {
    it.each(entityWithGroupTypes)(
      'should return true for %s entity',
      ({ entityType }) => {
        expect(getEntityHasGroup(entityType)).toBeTruthy();
      }
    );

    it.each(entityWithoutGroupTypes)(
      'should return false for %s entity',
      ({ entityType }) => {
        expect(getEntityHasGroup(entityType)).not.toBeTruthy();
      }
    );
  });

  describe('getEntityTypeFromEntityWithGroupType', () => {
    it.each(entityTypesWithGroupType)(
      'should return entity type for %s',
      ({ entityType, entityWithGroupType }) => {
        expect(getEntityTypeFromEntityWithGroupType(entityWithGroupType)).toBe(
          entityType
        );
      }
    );

    it('should throw a bad request exception if the entity group type is invalid', () => {
      const entityWithGroupType = faker.lorem.word();
      const result = () => {
        getEntityTypeFromEntityWithGroupType(
          entityWithGroupType as EntityWithGroupType
        );
      };
      expect(result).toThrow(BadRequestException);
      expect(result).toThrow(
        `Could not get entity type for entity with group type ${entityWithGroupType}`
      );
    });
  });

  describe('getEntityWithGroupTypeFolderName', () => {
    it.each(entityWithGroupTypeFolderNames)(
      'should return folder name for %s',
      ({ entityWithGroupType, folderName }) => {
        expect(getEntityWithGroupTypeFolderName(entityWithGroupType)).toBe(
          folderName
        );
      }
    );
    it('should throw a bad request exception if the entity group type is invalid', () => {
      const entityWithGroupType = faker.lorem.word();
      const result = () => {
        getEntityWithGroupTypeFolderName(
          entityWithGroupType as EntityWithGroupType
        );
      };
      expect(result).toThrow(BadRequestException);
      expect(result).toThrow(
        `Could not get folder name for entity with group type ${entityWithGroupType}`
      );
    });
  });
});
