import { EntityType } from '@dark-rush-photography/shared/types';

const entityTypeNewImagesFolderNameMap = new Map<
  EntityType,
  string | undefined
>([
  [EntityType.About, 'images'],
  [EntityType.BestOf, 'best-37'],
  [EntityType.Destination, 'images'],
  [EntityType.Event, 'images'],
  [EntityType.Favorites, undefined],
  [EntityType.ImageVideo, undefined],
  [EntityType.PhotoOfTheWeek, undefined],
  [EntityType.Review, undefined],
  [EntityType.ReviewMedia, undefined],
]);

export const getEntityTypeNewImagesFolderName = (
  entityType: EntityType
): string | undefined => {
  return entityTypeNewImagesFolderNameMap.get(entityType);
};
