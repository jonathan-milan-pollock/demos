import { BestOfType, EntityType } from '@dark-rush-photography/shared/types';

const entityToBestOfTypeMap = new Map<EntityType, BestOfType>([
  [EntityType.BestOfChildren, BestOfType.Children],
  [EntityType.BestOfEvents, BestOfType.Events],
  [EntityType.BestOfLandscapes, BestOfType.Landscapes],
  [EntityType.BestOfNature, BestOfType.Nature],
  [EntityType.BestOfRealEstate, BestOfType.RealEstate],
]);

export const getBestOfTypeFromEntityType = (
  entityType: EntityType
): BestOfType => {
  const bestOfType = entityToBestOfTypeMap.get(entityType);
  if (!bestOfType)
    throw new RangeError(
      `Unable to get best of type from entity type ${entityType}`
    );
  return bestOfType;
};
