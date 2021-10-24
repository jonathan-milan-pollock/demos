import { ConflictException } from '@nestjs/common';

import {
  EntityType,
  ImageDimensionType,
} from '@dark-rush-photography/shared/types';

const entityTypeImageDimensionTypesMap = new Map<
  EntityType,
  ImageDimensionType[]
>([
  [
    EntityType.About,
    [
      ImageDimensionType.Thumbnail,
      ImageDimensionType.Small,
      ImageDimensionType.Medium,
      ImageDimensionType.Large,
    ],
  ],
  [
    EntityType.BestOf,
    [
      ImageDimensionType.Thumbnail,
      ImageDimensionType.Small,
      ImageDimensionType.Medium,
      ImageDimensionType.Large,
    ],
  ],
  [
    EntityType.Destination,
    [
      ImageDimensionType.DestinationThumbnail,
      ImageDimensionType.DestinationSmall,
      ImageDimensionType.DestinationMedium,
      ImageDimensionType.DestinationLarge,
    ],
  ],
  [
    EntityType.Event,
    [
      ImageDimensionType.Thumbnail,
      ImageDimensionType.Small,
      ImageDimensionType.Medium,
      ImageDimensionType.Large,
    ],
  ],
  [
    EntityType.Favorites,
    [
      ImageDimensionType.Thumbnail,
      ImageDimensionType.Small,
      ImageDimensionType.Medium,
      ImageDimensionType.Large,
    ],
  ],
  [
    EntityType.ImagePost,
    [
      ImageDimensionType.Facebook,
      ImageDimensionType.Instagram,
      ImageDimensionType.LinkedIn,
      ImageDimensionType.GoogleBusiness,
    ],
  ],
  [EntityType.ImageVideo, []],
  [
    EntityType.PhotoOfTheWeek,
    [
      ImageDimensionType.Thumbnail,
      ImageDimensionType.Small,
      ImageDimensionType.Medium,
      ImageDimensionType.Large,
      ImageDimensionType.StarredThumbnail,
      ImageDimensionType.StarredSmall,
      ImageDimensionType.StarredMedium,
      ImageDimensionType.StarredLarge,
      ImageDimensionType.Facebook,
      ImageDimensionType.Instagram,
      ImageDimensionType.LinkedIn,
      ImageDimensionType.GoogleBusiness,
    ],
  ],
  [
    EntityType.Review,
    [
      ImageDimensionType.ReviewThumbnail,
      ImageDimensionType.ReviewSmall,
      ImageDimensionType.ReviewMedium,
      ImageDimensionType.ReviewLarge,
    ],
  ],
  [
    EntityType.ReviewMedia,
    [
      ImageDimensionType.Thumbnail,
      ImageDimensionType.Small,
      ImageDimensionType.Medium,
      ImageDimensionType.Large,
    ],
  ],
  [EntityType.Test, []],
]);

const entityTypeStarredImageDimensionTypesMap = new Map<
  EntityType,
  ImageDimensionType[]
>([
  [
    EntityType.Destination,
    [
      ImageDimensionType.DestinationStarredThumbnail,
      ImageDimensionType.DestinationStarredSmall,
      ImageDimensionType.DestinationStarredMedium,
      ImageDimensionType.DestinationStarredLarge,
    ],
  ],
  [
    EntityType.Event,
    [
      ImageDimensionType.StarredThumbnail,
      ImageDimensionType.StarredSmall,
      ImageDimensionType.StarredMedium,
      ImageDimensionType.StarredLarge,
      ImageDimensionType.YouTubeThumbnail,
      ImageDimensionType.YouTube,
    ],
  ],
  [
    EntityType.ImageVideo,
    [ImageDimensionType.YouTubeThumbnail, ImageDimensionType.YouTube],
  ],
]);

const entityTypeLovedImageDimensionTypesMap = new Map<
  EntityType,
  ImageDimensionType[]
>([
  [EntityType.Event, [ImageDimensionType.YouTube]],
  [EntityType.ImageVideo, [ImageDimensionType.YouTube]],
]);

export const getEntityTypeImageDimensionTypes = (
  entityType: EntityType
): ImageDimensionType[] => {
  const imageDimensionTypes = entityTypeImageDimensionTypesMap.get(entityType);
  if (!imageDimensionTypes)
    throw new ConflictException(
      `Could not get image dimension types for entity type ${entityType}`
    );
  return imageDimensionTypes;
};

export const getEntityTypeStarredImageDimensionTypes = (
  entityType: EntityType
): ImageDimensionType[] => {
  const starredImageDimensionTypes =
    entityTypeStarredImageDimensionTypesMap.get(entityType);
  if (!starredImageDimensionTypes)
    throw new ConflictException(
      `Could not get starred image dimension types for entity type ${entityType}`
    );
  return starredImageDimensionTypes;
};

export const getEntityTypeLovedImageDimensionTypes = (
  entityType: EntityType
): ImageDimensionType[] => {
  const lovedImageDimensionTypes =
    entityTypeLovedImageDimensionTypesMap.get(entityType);
  if (!lovedImageDimensionTypes)
    throw new ConflictException(
      `Could not get loved image dimension types for entity type ${entityType}`
    );
  return lovedImageDimensionTypes;
};
