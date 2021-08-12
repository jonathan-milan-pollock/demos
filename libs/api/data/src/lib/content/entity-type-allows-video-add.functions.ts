import { BadRequestException } from '@nestjs/common';

import { EntityType } from '@dark-rush-photography/shared/types';

const entityTypeAllowsVideoAddMap = new Map<EntityType, boolean>([
  [EntityType.About, true],
  [EntityType.BestOf, false],
  [EntityType.Destination, true],
  [EntityType.Event, true],
  [EntityType.Favorites, true],
  [EntityType.ImageVideo, true],
  [EntityType.ImagePost, true],
  [EntityType.ThreeSixtyImagePost, true],
  [EntityType.VideoPost, true],
  [EntityType.ThreeSixtyVideoPost, true],
  [EntityType.PhotoOfTheWeek, false],
  [EntityType.ReviewMedia, true],
  [EntityType.Review, false],
  [EntityType.SocialMedia, true],
]);

export const getEntityTypeAllowsVideoAdd = (
  entityType: EntityType
): boolean => {
  const allowsVideoAdd = entityTypeAllowsVideoAddMap.get(entityType);
  if (allowsVideoAdd === undefined)
    throw new BadRequestException(
      `Unable to get entity type ${entityType} to determine if videos can to entity`
    );
  return allowsVideoAdd;
};
