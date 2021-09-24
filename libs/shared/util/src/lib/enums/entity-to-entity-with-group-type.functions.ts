import {
  EntityType,
  EntityWithGroupType,
} from '@dark-rush-photography/shared/types';

const entityToEntityWithGroupTypeMap = new Map<EntityType, EntityWithGroupType>(
  [
    [EntityType.Event, EntityWithGroupType.Event],
    [EntityType.PhotoOfTheWeek, EntityWithGroupType.PhotoOfTheWeek],
    [EntityType.SharedPhotoAlbum, EntityWithGroupType.SharedPhotoAlbum],
    [EntityType.SocialMedia, EntityWithGroupType.SocialMedia],
  ]
);

export const getEntityWithGroupTypeFromEntityType = (
  entityType: EntityType
): EntityWithGroupType => {
  const entityWithGroupType = entityToEntityWithGroupTypeMap.get(entityType);
  if (!entityWithGroupType)
    throw new RangeError(
      `Unable to get entity with group for entity type ${entityType}`
    );
  return entityWithGroupType;
};
