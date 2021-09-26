import { BadRequestException } from '@nestjs/common';

import {
  EntityType,
  EVENT_FOLDER_NAME,
  FAVORITES_SLUG,
  PHOTO_OF_THE_WEEK_FOLDER_NAME,
  REVIEW_MEDIA_SLUG,
  SOCIAL_MEDIA_FOLDER_NAME,
} from '@dark-rush-photography/shared/types';

const entityTypeFolderNameMap = new Map<EntityType, string>([
  [EntityType.About, 'about'],
  [EntityType.BestOf, 'best-of'],
  [EntityType.Destination, 'destinations'],
  [EntityType.Event, EVENT_FOLDER_NAME],
  [EntityType.Favorites, 'favorites'],
  [EntityType.ImageVideo, 'image-video'],
  [EntityType.PhotoOfTheWeek, PHOTO_OF_THE_WEEK_FOLDER_NAME],
  [EntityType.Review, 'reviews'],
  [EntityType.ReviewMedia, 'review-media'],
  [EntityType.SocialMedia, SOCIAL_MEDIA_FOLDER_NAME],
]);

const entityTypeInitialSlugMap = new Map<EntityType, string | undefined>([
  [EntityType.About, undefined],
  [EntityType.BestOf, undefined],
  [EntityType.Destination, undefined],
  [EntityType.Event, undefined],
  [EntityType.Favorites, FAVORITES_SLUG],
  [EntityType.ImageVideo, undefined],
  [EntityType.PhotoOfTheWeek, undefined],
  [EntityType.Review, undefined],
  [EntityType.ReviewMedia, REVIEW_MEDIA_SLUG],
  [EntityType.SocialMedia, undefined],
]);

export const getEntityTypeFolderName = (entityType: EntityType): string => {
  const folderName = entityTypeFolderNameMap.get(entityType);
  if (!folderName)
    throw new BadRequestException(
      `Could not get folder name for entity type ${entityType}`
    );
  return folderName;
};

export const getEntityTypeInitialSlug = (entityType: EntityType): string => {
  const initialSlug = entityTypeInitialSlugMap.get(entityType);
  if (!initialSlug)
    throw new BadRequestException(
      `Could not get initial slug for entity type ${entityType}`
    );
  return initialSlug;
};
