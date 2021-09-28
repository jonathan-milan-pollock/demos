import { BadRequestException } from '@nestjs/common';

import * as faker from 'faker';

import {
  EntityType,
  EntityWithGroupType,
} from '@dark-rush-photography/shared/types';
import {
  getEntityTypeFromEntityWithGroupType,
  getEntityWithGroupTypeFolderName,
} from './entity-with-group-type.functions';

describe('entity-with-group-type.functions', () => {
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
