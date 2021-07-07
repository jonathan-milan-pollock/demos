import { BadRequestException } from '@nestjs/common';

import { EntityType } from '@dark-rush-photography/shared/types';

const entityTypeAllowsImageAddMap = new Map<EntityType, boolean>([
  [EntityType.About, true],
  [EntityType.BestOfChildren, true],
  [EntityType.BestOfEvents, true],
  [EntityType.BestOfLandscapes, true],
  [EntityType.BestOfNature, true],
  [EntityType.BestOfRealEstate, true],
  [EntityType.Destination, true],
  [EntityType.Event, true],
  [EntityType.Favorites, true],
  [EntityType.MediaProcessAppleResource, true],
  [EntityType.MediaProcessIcon, true],
  [EntityType.MediaProcessImageVideo, true],
  [EntityType.MediaProcessPng, true],
  [EntityType.MediaProcessSocialMediaImage, true],
  [EntityType.MediaProcessSocialMediaVideo, false],
  [EntityType.PhotoOfTheWeek, true],
  [EntityType.ReviewMedia, true],
  [EntityType.Review, true],
  [EntityType.SocialMedia, true],
]);

export const getEntityTypeAllowsImageAdd = (
  entityType: EntityType
): boolean => {
  const allowsImageAdd = entityTypeAllowsImageAddMap.get(entityType);
  if (allowsImageAdd === undefined)
    throw new BadRequestException(
      `Unable to get entity type ${entityType} to determine if images can to entity`
    );
  return allowsImageAdd;
};
