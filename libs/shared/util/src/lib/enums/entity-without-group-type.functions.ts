import { ConflictException } from '@nestjs/common';

import {
  EntityType,
  EntityWithoutGroupType,
} from '@dark-rush-photography/shared/types';

const entityWithoutGroupToEntityTypeMap = new Map<
  EntityWithoutGroupType,
  EntityType
>([
  [EntityWithoutGroupType.About, EntityType.About],
  [EntityWithoutGroupType.BestOf, EntityType.BestOf],
  [EntityWithoutGroupType.Destination, EntityType.Destination],
  [EntityWithoutGroupType.Favorites, EntityType.Favorites],
  [EntityWithoutGroupType.ImagePost, EntityType.ImagePost],
  [EntityWithoutGroupType.ImageVideo, EntityType.ImageVideo],
  [EntityWithoutGroupType.Review, EntityType.Review],
  [EntityWithoutGroupType.ReviewMedia, EntityType.ReviewMedia],
  [EntityWithoutGroupType.Test, EntityType.Test],
]);

const entityWithoutGroupTypeFolderNameMap = new Map<
  EntityWithoutGroupType,
  string
>([
  [EntityWithoutGroupType.About, 'about'],
  [EntityWithoutGroupType.BestOf, 'best-of'],
  [EntityWithoutGroupType.Destination, 'destinations'],
  [EntityWithoutGroupType.Favorites, 'favorites'],
  [EntityWithoutGroupType.ImagePost, 'image-posts'],
  [EntityWithoutGroupType.ImageVideo, 'image-video'],
  [EntityWithoutGroupType.Review, 'reviews'],
  [EntityWithoutGroupType.ReviewMedia, 'review-media'],
  [EntityWithoutGroupType.Test, 'test'],
]);

const entityWithoutGroupTypeInitialPathnameMap = new Map<
  EntityWithoutGroupType,
  string | undefined
>([
  [EntityWithoutGroupType.About, undefined],
  [EntityWithoutGroupType.BestOf, undefined],
  [EntityWithoutGroupType.Destination, undefined],
  [EntityWithoutGroupType.Favorites, 'favorites'],
  [EntityWithoutGroupType.ImagePost, undefined],
  [EntityWithoutGroupType.ImageVideo, undefined],
  [EntityWithoutGroupType.Review, undefined],
  [EntityWithoutGroupType.ReviewMedia, 'review-thank-you'],
  [EntityWithoutGroupType.Test, undefined],
]);

export const getEntityTypeFromEntityWithoutGroupType = (
  entityWithoutGroupType: EntityWithoutGroupType
): EntityType => {
  const entityType = entityWithoutGroupToEntityTypeMap.get(
    entityWithoutGroupType
  );
  if (!entityType)
    throw new ConflictException(
      `Could not get entity type for entity without group type ${entityWithoutGroupType}`
    );
  return entityType;
};

export const getEntityWithoutGroupTypeFolderName = (
  entityWithoutGroupType: EntityWithoutGroupType
): string => {
  const folderName = entityWithoutGroupTypeFolderNameMap.get(
    entityWithoutGroupType
  );
  if (!folderName)
    throw new ConflictException(
      `Could not get folder name for entity without group type ${entityWithoutGroupType}`
    );
  return folderName;
};

export const getEntityWithoutGroupTypeInitialPathname = (
  entityWithoutGroupType: EntityWithoutGroupType
): string | undefined => {
  return entityWithoutGroupTypeInitialPathnameMap.get(entityWithoutGroupType);
};
