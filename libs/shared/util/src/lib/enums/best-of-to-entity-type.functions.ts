import { BestOfType, EntityType } from '@dark-rush-photography/shared/types';

const bestOfToEntityTypeMap = new Map<BestOfType, EntityType>([
  [BestOfType.Children, EntityType.BestOfChildren],
  [BestOfType.Events, EntityType.BestOfEvents],
  [BestOfType.Landscapes, EntityType.BestOfLandscapes],
  [BestOfType.Nature, EntityType.BestOfNature],
  [BestOfType.RealEstate, EntityType.BestOfRealEstate],
]);

export const getEntityTypeFromBestOfType = (
  bestOfType: BestOfType
): EntityType => {
  const entityType = bestOfToEntityTypeMap.get(bestOfType);
  if (!entityType)
    throw new RangeError(
      `Unable to get entity type from best of type ${bestOfType}`
    );
  return entityType;
};
