import {
  EntityType,
  MediaProcessType,
} from '@dark-rush-photography/shared/types';

const entityToMediaProcessTypeMap = new Map<EntityType, MediaProcessType>([
  [EntityType.ImagePost, MediaProcessType.ImagePost],
  [EntityType.ImageVideo, MediaProcessType.ImageVideo],
  [EntityType.ThreeSixtyImagePost, MediaProcessType.ThreeSixtyImagePost],
]);

export const getMediaProcessTypeFromEntityType = (
  entityType: EntityType
): MediaProcessType => {
  const mediaProcessType = entityToMediaProcessTypeMap.get(entityType);
  if (!mediaProcessType)
    throw new RangeError(
      `Unable to get media process type from entity type ${entityType}`
    );
  return mediaProcessType;
};
