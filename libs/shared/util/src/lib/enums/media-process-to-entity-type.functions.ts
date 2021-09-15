import {
  EntityType,
  MediaProcessType,
} from '@dark-rush-photography/shared/types';

const mediaProcessToEntityTypeMap = new Map<MediaProcessType, EntityType>([
  [MediaProcessType.ImagePost, EntityType.ImagePost],
  [MediaProcessType.ImageVideo, EntityType.ImageVideo],
  [MediaProcessType.ThreeSixtyImagePost, EntityType.ThreeSixtyImagePost],
]);

export const getEntityTypeFromMediaProcessType = (
  mediaProcessType: MediaProcessType
): EntityType => {
  const entityType = mediaProcessToEntityTypeMap.get(mediaProcessType);
  if (!entityType)
    throw new RangeError(
      `Unable to get entity type from media process type ${mediaProcessType}`
    );
  return entityType;
};
