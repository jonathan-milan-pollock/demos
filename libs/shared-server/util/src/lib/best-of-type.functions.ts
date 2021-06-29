import { BadRequestException } from '@nestjs/common';

import { BestOfType, EntityType } from '@dark-rush-photography/shared-types';

const entityTypeMap = new Map<EntityType, BestOfType>([
  [EntityType.BestOfChildren, BestOfType.Children],
  [EntityType.BestOfEvents, BestOfType.Events],
  [EntityType.BestOfLandscapes, BestOfType.Landscapes],
  [EntityType.BestOfNature, BestOfType.Nature],
  [EntityType.BestOfRealEstate, BestOfType.RealEstate],
]);

export const getBestOfType = (entityType: EntityType): BestOfType => {
  const bestOfType = entityTypeMap.get(entityType);
  if (!bestOfType)
    throw new BadRequestException(`Unable to find entity type ${entityType}`);
  return bestOfType;
};
