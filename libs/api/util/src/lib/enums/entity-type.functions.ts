import { EntityType } from '@dark-rush-photography/shared/types';

const entityTypeImageFolderNameMap = new Map<EntityType, string | undefined>([
  [EntityType.About, 'images'],
  [EntityType.BestOf, 'best-37'],
  [EntityType.Destination, 'images'],
  [EntityType.Event, 'images'],
  [EntityType.Favorites, undefined],
  [EntityType.ImageVideo, undefined],
  [EntityType.PhotoOfTheWeek, undefined],
  [EntityType.Review, undefined],
  [EntityType.ReviewMedia, undefined],
  [EntityType.SocialMedia, 'images'],
]);

export const getEntityTypeImageFolderName = (
  entityType: EntityType
): string | undefined => {
  return entityTypeImageFolderNameMap.get(entityType);
};
