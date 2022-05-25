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
  [EntityType.ImagePost, undefined],
  [EntityType.ImageVideo, undefined],
  [EntityType.PhotoOfTheWeek, undefined],
  [EntityType.Review, undefined],
  [EntityType.ReviewMedia, undefined],
  [EntityType.Test, undefined],
]);

const entityTypeHasStarredImageMap = new Map<EntityType, boolean>([
  [EntityType.About, false],
  [EntityType.BestOf, false],
  [EntityType.Destination, true],
  [EntityType.Event, true],
  [EntityType.Favorites, false],
  [EntityType.ImagePost, false],
  [EntityType.ImageVideo, true],
  [EntityType.PhotoOfTheWeek, false],
  [EntityType.Review, false],
  [EntityType.ReviewMedia, false],
  [EntityType.Test, false],
]);

const entityTypeHasLovedImagesMap = new Map<EntityType, boolean>([
  [EntityType.About, false],
  [EntityType.BestOf, false],
  [EntityType.Destination, false],
  [EntityType.Event, true],
  [EntityType.Favorites, false],
  [EntityType.ImagePost, false],
  [EntityType.ImageVideo, true],
  [EntityType.PhotoOfTheWeek, false],
  [EntityType.Review, false],
  [EntityType.ReviewMedia, false],
  [EntityType.Test, false],
]);

const entityTypeHasImageVideoMap = new Map<EntityType, boolean>([
  [EntityType.About, false],
  [EntityType.BestOf, false],
  [EntityType.Destination, false],
  [EntityType.Event, true],
  [EntityType.Favorites, false],
  [EntityType.ImagePost, false],
  [EntityType.ImageVideo, true],
  [EntityType.PhotoOfTheWeek, false],
  [EntityType.Review, false],
  [EntityType.ReviewMedia, false],
  [EntityType.Test, false],
]);

const entityTypePluralDescriptionMap = new Map<EntityType, string>([
  [EntityType.About, 'About'],
  [EntityType.BestOf, 'Best Of'],
  [EntityType.Destination, 'Destinations'],
  [EntityType.Event, 'Events'],
  [EntityType.Favorites, 'Favorites'],
  [EntityType.ImagePost, 'Image Posts'],
  [EntityType.ImageVideo, 'Image Videos'],
  [EntityType.PhotoOfTheWeek, 'Photo of the Week'],
  [EntityType.Review, 'Reviews'],
  [EntityType.ReviewMedia, 'Review Media'],
]);

export const getEntityTypeNewImagesFolderName = (
  entityType: EntityType
): string | undefined => {
  return entityTypeNewImagesFolderNameMap.get(entityType);
};

export const getEntityTypeHasStarredImage = (
  entityType: EntityType
): boolean => {
  const hasStarredImage = entityTypeHasStarredImageMap.get(entityType);
  if (hasStarredImage === undefined)
    throw new ConflictException(
      `Could not get has starred image for entity type ${entityType}`
    );
  return hasStarredImage;
};

export const getEntityTypeHasLovedImages = (
  entityType: EntityType
): boolean => {
  const hasLovedImage = entityTypeHasLovedImagesMap.get(entityType);
  if (hasLovedImage === undefined)
    throw new ConflictException(
      `Could not get has loved image for entity type ${entityType}`
    );
  return hasLovedImage;
};

export const getEntityTypeHasImageVideo = (entityType: EntityType): boolean => {
  const hasImageVideo = entityTypeHasImageVideoMap.get(entityType);
  if (hasImageVideo === undefined)
    throw new ConflictException(
      `Could not get has image video for entity type ${entityType}`
    );
  return hasImageVideo;
};

export const getEntityTypePluralDescription = (
  entityType: EntityType
): string => {
  const pluralDescription = entityTypePluralDescriptionMap.get(entityType);
  if (!pluralDescription)
    throw new ConflictException(
      `Could not get plural description for entity type ${entityType}`
    );
  return pluralDescription;
};
