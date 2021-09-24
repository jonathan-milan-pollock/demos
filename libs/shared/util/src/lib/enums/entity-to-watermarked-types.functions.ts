import {
  EntityType,
  WatermarkedType,
} from '@dark-rush-photography/shared/types';

const entityToWatermarkedTypesMap = new Map<EntityType, WatermarkedType[]>([
  [EntityType.About, [WatermarkedType.WithoutWatermark]],
  [EntityType.BestOf, [WatermarkedType.Watermarked]],
  [EntityType.Destination, [WatermarkedType.Watermarked]],
  [EntityType.Event, [WatermarkedType.Watermarked]],
  [EntityType.Favorites, [WatermarkedType.Watermarked]],
  [
    EntityType.ImagePost,
    [WatermarkedType.Watermarked, WatermarkedType.WithoutWatermark],
  ],
  [
    EntityType.ImageVideo,
    [WatermarkedType.Watermarked, WatermarkedType.WithoutWatermark],
  ],
  [
    EntityType.ThreeSixtyImagePost,
    [WatermarkedType.Watermarked, WatermarkedType.WithoutWatermark],
  ],
  [EntityType.PhotoOfTheWeek, [WatermarkedType.Watermarked]],
  [EntityType.ReviewMedia, [WatermarkedType.Watermarked]],
  [
    EntityType.Review,
    [WatermarkedType.Watermarked, WatermarkedType.WithoutWatermark],
  ],
  [
    EntityType.SharedPhotoAlbum,
    [WatermarkedType.Watermarked, WatermarkedType.WithoutWatermark],
  ],
  [EntityType.SocialMedia, [WatermarkedType.Watermarked]],
]);

export const getWatermarkedTypesFromEntityType = (
  entityType: EntityType
): WatermarkedType[] => {
  const watermarkedTypes = entityToWatermarkedTypesMap.get(entityType);
  if (!watermarkedTypes)
    throw new RangeError(
      `Unable to get watermarked types from entity type ${entityType}`
    );
  return watermarkedTypes;
};
