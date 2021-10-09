import { ConflictException } from '@nestjs/common';

import { EntityType } from '@dark-rush-photography/shared/types';

const entityTypeNewImagesFolderNameMap = new Map<
  EntityType,
  string | undefined
>([
  [EntityType.About, 'images'],
  [EntityType.BestOf, 'best-37'],
  [EntityType.Destination, 'images'],
  [EntityType.Event, 'images'],
  [EntityType.Favorites, undefined],
  [EntityType.ImageVideo, undefined],
  [EntityType.PhotoOfTheWeek, undefined],
  [EntityType.Review, undefined],
  [EntityType.ReviewMedia, undefined],
]);

const entityTypeRenameMediaWithSlugMap = new Map<EntityType, boolean>([
  [EntityType.About, true],
  [EntityType.BestOf, false],
  [EntityType.Destination, true],
  [EntityType.Event, true],
  [EntityType.Favorites, false],
  [EntityType.ImageVideo, false],
  [EntityType.PhotoOfTheWeek, true],
  [EntityType.Review, false],
  [EntityType.ReviewMedia, true],
]);

export const getEntityTypeNewImagesFolderName = (
  entityType: EntityType
): string | undefined => {
  return entityTypeNewImagesFolderNameMap.get(entityType);
};

export const getEntityTypeRenameMediaWithSlug = (
  entityType: EntityType
): boolean => {
  const renameMediaWithSlug = entityTypeRenameMediaWithSlugMap.get(entityType);
  if (!renameMediaWithSlug)
    throw new ConflictException(
      `Could not get rename media with slug for entity type ${entityType}`
    );
  return renameMediaWithSlug;
};
