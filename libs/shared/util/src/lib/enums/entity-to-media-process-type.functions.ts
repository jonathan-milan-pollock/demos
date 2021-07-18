import {
  EntityType,
  MediaProcessType,
} from '@dark-rush-photography/shared/types';

const entityToMediaProcessTypeMap = new Map<EntityType, MediaProcessType>([
  [EntityType.MediaProcessImageVideo, MediaProcessType.ImageVideo],
  [EntityType.MediaProcessSocialMediaImage, MediaProcessType.SocialMediaImage],
  [
    EntityType.MediaProcessSocialMediaThreeSixtyImage,
    MediaProcessType.SocialMediaThreeSixtyImage,
  ],
  [EntityType.MediaProcessSocialMediaVideo, MediaProcessType.SocialMediaVideo],
  [
    EntityType.MediaProcessSocialMediaThreeSixtyVideo,
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
