import {
  EntityType,
  MediaProcessType,
} from '@dark-rush-photography/shared/types';

const entityToMediaProcessTypeMap = new Map<EntityType, MediaProcessType>([
  [EntityType.MediaProcessAppleResource, MediaProcessType.AppleResource],
  [EntityType.MediaProcessIcon, MediaProcessType.Icon],
  [EntityType.MediaProcessImageVideo, MediaProcessType.ImageVideo],
  [EntityType.MediaProcessPng, MediaProcessType.Png],
  [EntityType.MediaProcessSocialMediaImage, MediaProcessType.SocialMediaImage],
  [EntityType.MediaProcessSocialMediaVideo, MediaProcessType.SocialMediaVideo],
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
