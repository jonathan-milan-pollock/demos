import {
  EntityType,
  MediaProcessType,
} from '@dark-rush-photography/shared/types';

const entityToMediaProcessTypeMap = new Map<EntityType, MediaProcessType>([
  [EntityType.ImageVideo, MediaProcessType.ImageVideo],
  [EntityType.ImagePost, MediaProcessType.SocialMediaImage],
  [
    EntityType.ThreeSixtyImagePost,
    MediaProcessType.SocialMediaThreeSixtyImage,
  ],
  [EntityType.VideoPost, MediaProcessType.SocialMediaVideo],
  [
    EntityType.ThreeSixtyVideoPost,
    MediaProcessType.SocialMediaThreeSixtyVideo,
  ],
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
