import { BadRequestException } from '@nestjs/common';

import { EntityType } from '@dark-rush-photography/shared/types';

const entityTypeAllowsVideoAddMap = new Map<EntityType, boolean>([
  [EntityType.About, true],
  [EntityType.BestOfChildren, false],
  [EntityType.BestOfEvents, false],
  [EntityType.BestOfLandscapes, false],
  [EntityType.BestOfNature, false],
  [EntityType.BestOfRealEstate, false],
  [EntityType.Destination, true],
  [EntityType.Event, true],
  [EntityType.Favorites, true],
  [EntityType.MediaProcessAppleResource, true],
  [EntityType.MediaProcessIcon, true],
  [EntityType.MediaProcessImageVideo, true],
  [EntityType.MediaProcessPng, true],
  [EntityType.MediaProcessSocialMediaImage, true],
  [EntityType.MediaProcessSocialMediaVideo, true],
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
