import { ConflictException } from '@nestjs/common';

import {
  EntityType,
  ImageDimensionType,
} from '@dark-rush-photography/shared/types';

const entityTypeImageDimensionTypesMap = new Map<
  EntityType,
  ImageDimensionType[]
>([
  [EntityType.About, [ImageDimensionType.Thumbnail, ImageDimensionType.Small]],
  [
    EntityType.BestOf,
    [
      ImageDimensionType.Thumbnail,
      ImageDimensionType.Small,
      ImageDimensionType.Medium,
      ImageDimensionType.Large,
      ImageDimensionType.Facebook,
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
      ImageDimensionType.Facebook,
      ImageDimensionType.YouTube,
    ],
  ],
  [
    EntityType.Favorites,
    [
      ImageDimensionType.Thumbnail,
      ImageDimensionType.Small,
      ImageDimensionType.Medium,
      ImageDimensionType.Large,
      ImageDimensionType.Facebook,
    ],
  ],
  [
    EntityType.ImageVideo,
    [ImageDimensionType.YouTubeThumbnail, ImageDimensionType.YouTube],
  ],
  [
    EntityType.PhotoOfTheWeek,
    [
      ImageDimensionType.Thumbnail,
      ImageDimensionType.Small,
      ImageDimensionType.Medium,
      ImageDimensionType.Large,
      ImageDimensionType.Facebook,
      ImageDimensionType.Instagram,
      ImageDimensionType.LinkedIn,
      ImageDimensionType.GoogleBusiness,
      ImageDimensionType.YouTube,
    ],
  ],
  [
    EntityType.Review,
    [ImageDimensionType.ReviewThumbnail, ImageDimensionType.ReviewSmall],
  ],
  [
    EntityType.ReviewMedia,
    [
      ImageDimensionType.Thumbnail,
      ImageDimensionType.Small,
      ImageDimensionType.Medium,
      ImageDimensionType.Large,
      ImageDimensionType.Facebook,
    ],
  ],
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
