import { BadRequestException } from '@nestjs/common';

import {
  EntityType,
  EntityWithGroupType,
  EVENT_FOLDER_NAME,
  PHOTO_OF_THE_WEEK_FOLDER_NAME,
  SOCIAL_MEDIA_FOLDER_NAME,
} from '@dark-rush-photography/shared/types';

const entityToEntityWithGroupTypeMap = new Map<EntityType, EntityWithGroupType>(
  [
    [EntityType.Event, EntityWithGroupType.Event],
    [EntityType.PhotoOfTheWeek, EntityWithGroupType.PhotoOfTheWeek],
    [EntityType.SocialMedia, EntityWithGroupType.SocialMedia],
  ]
);

const entityWithGroupToEntityTypeMap = new Map<EntityWithGroupType, EntityType>(
  [
    [EntityWithGroupType.Event, EntityType.Event],
    [EntityWithGroupType.PhotoOfTheWeek, EntityType.PhotoOfTheWeek],
    [EntityWithGroupType.SocialMedia, EntityType.SocialMedia],
  ]
);

const entityWithGroupTypeFolderNameMap = new Map<EntityWithGroupType, string>([
  [EntityWithGroupType.Event, EVENT_FOLDER_NAME],
  [EntityWithGroupType.PhotoOfTheWeek, PHOTO_OF_THE_WEEK_FOLDER_NAME],
  [EntityWithGroupType.SocialMedia, SOCIAL_MEDIA_FOLDER_NAME],
]);

export const getEntityHasGroup = (entityType: EntityType): boolean => {
  const entityWithGroupType = entityToEntityWithGroupTypeMap.get(entityType);
  return !!entityWithGroupType;
};

export const getEntityTypeFromEntityWithGroupType = (
  entityWithGroupType: EntityWithGroupType
): EntityType => {
  const entityType = entityWithGroupToEntityTypeMap.get(entityWithGroupType);
  if (!entityType)
    throw new BadRequestException(
      `Could not get entity type for entity with group type ${entityWithGroupType}`
    );
  return entityType;
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
