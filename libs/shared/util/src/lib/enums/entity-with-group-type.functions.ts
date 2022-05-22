import { ConflictException } from '@nestjs/common';

import {
  EntityType,
  EntityWithGroupType,
} from '@dark-rush-photography/shared/types';

const entityWithGroupTypeToEntityTypeMap = new Map<
  EntityWithGroupType,
  EntityType
>([
  [EntityWithGroupType.Event, EntityType.Event],
  [EntityWithGroupType.PhotoOfTheWeek, EntityType.PhotoOfTheWeek],
]);

const entityWithGroupTypeFolderNameMap = new Map<EntityWithGroupType, string>([
  [EntityWithGroupType.Event, 'events'],
  [EntityWithGroupType.PhotoOfTheWeek, 'photo-of-the-week'],
]);

export const getEntityTypeFromEntityWithGroupType = (
  entityWithGroupType: EntityWithGroupType
): EntityType => {
  const entityType =
    entityWithGroupTypeToEntityTypeMap.get(entityWithGroupType);
  if (!entityType)
    throw new ConflictException(
      `Could not get entity type for entity with group type ${entityWithGroupType}`
    );
  return entityType;
};

export const getEntityWithGroupTypeFolderName = (
  entityWithGroupType: EntityWithGroupType
): string => {
  const folderName = entityWithGroupTypeFolderNameMap.get(entityWithGroupType);
  if (!folderName)
    throw new ConflictException(
      `Could not get folder name for entity with group type ${entityWithGroupType}`
    );
  return folderName;
};
