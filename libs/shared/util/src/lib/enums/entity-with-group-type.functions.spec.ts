import { ConflictException } from '@nestjs/common';

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
  describe('getEntityTypeFromEntityWithGroupType', () => {
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
    ];

    it.each(entityTypesWithGroupType)(
      'should return entity type %s',
      ({ entityType, entityWithGroupType }) => {
        expect(getEntityTypeFromEntityWithGroupType(entityWithGroupType)).toBe(
          entityType
        );
      }
    );

    it('should throw a conflict exception if cannot get entity type', () => {
      const entityWithGroupType = faker.lorem.word() as EntityWithGroupType;
      const result = () => {
        getEntityTypeFromEntityWithGroupType(entityWithGroupType);
      };
      expect(result).toThrow(ConflictException);
      expect(result).toThrow(
        `Could not get entity type for entity with group type ${entityWithGroupType}`
      );
    });

    it.each(Object.values(EntityWithGroupType))(
      'should not throw for any entity with group type %s',
      (entityWithGroupType) => {
        const result = () => {
          getEntityTypeFromEntityWithGroupType(entityWithGroupType);
        };
        expect(result).not.toThrow();
      }
    );
  });

  describe('getEntityWithGroupTypeFolderName', () => {
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
    ];

    it.each(entityWithGroupTypeFolderNames)(
      'should return folder name %s',
      ({ entityWithGroupType, folderName }) => {
        expect(getEntityWithGroupTypeFolderName(entityWithGroupType)).toBe(
          folderName
        );
      }
    );

    it('should throw a conflict exception if cannot get folder name', () => {
      const entityWithGroupType = faker.lorem.word() as EntityWithGroupType;
      const result = () => {
        getEntityWithGroupTypeFolderName(entityWithGroupType);
      };
      expect(result).toThrow(ConflictException);
      expect(result).toThrow(
        `Could not get folder name for entity with group type ${entityWithGroupType}`
      );
    });

    it.each(Object.values(EntityWithGroupType))(
      'should not throw for any entity with group type %s',
      (entityWithGroupType) => {
        const result = () => {
          getEntityWithGroupTypeFolderName(entityWithGroupType);
        };
        expect(result).not.toThrow();
      }
    );
  });
});
