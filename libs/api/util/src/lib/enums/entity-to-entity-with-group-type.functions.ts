import { BadRequestException } from '@nestjs/common';

import {
  EntityType,
  EntityWithGroupType,
} from '@dark-rush-photography/shared/types';

const entityToEntityWithGroupTypeMap = new Map<EntityType, EntityWithGroupType>(
  [
    [EntityType.Event, EntityWithGroupType.Event],
    [EntityType.PhotoOfTheWeek, EntityWithGroupType.PhotoOfTheWeek],
    [EntityType.SocialMedia, EntityWithGroupType.SocialMedia],
  ]
);

const entityWithGroupTypeFolderNameMap = new Map<EntityWithGroupType, string>([
  [EntityWithGroupType.Event, 'events'],
  [EntityWithGroupType.PhotoOfTheWeek, 'photo-of-the-week'],
  [EntityWithGroupType.SocialMedia, 'social-media'],
]);

export const getEntityHasGroup = (entityType: EntityType): boolean => {
  const entityWithGroupType = entityToEntityWithGroupTypeMap.get(entityType);
  return !!entityWithGroupType;
};

export const getEntityWithGroupTypeFromEntityType = (
  entityType: EntityType
): EntityWithGroupType => {
  const entityWithGroupType = entityToEntityWithGroupTypeMap.get(entityType);
  if (!entityWithGroupType)
    throw new BadRequestException(
      `Could not get entity with group for entity type ${entityType}`
    );
  return entityWithGroupType;
};

export const getEntityWithGroupTypeFolderName = (
  entityWithGroupType: EntityWithGroupType
): string => {
  const folderName = entityWithGroupTypeFolderNameMap.get(entityWithGroupType);
  if (!folderName)
    throw new BadRequestException(
      `Could not get folder name for entity with group type ${entityWithGroupType}`
    );
  return folderName;
};
