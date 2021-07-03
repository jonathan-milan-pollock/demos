import {
  EntityType,
  MediaProcessType,
} from '@dark-rush-photography/shared/types';

const mediaProcessToEntityTypeMap = new Map<MediaProcessType, EntityType>([
  [MediaProcessType.AppleResource, EntityType.MediaProcessAppleResource],
  [MediaProcessType.Icon, EntityType.MediaProcessIcon],
  [MediaProcessType.ImageVideo, EntityType.MediaProcessImageVideo],
  [MediaProcessType.Png, EntityType.MediaProcessPng],
  [MediaProcessType.SocialMediaImage, EntityType.MediaProcessSocialMediaImage],
  [MediaProcessType.SocialMediaVideo, EntityType.MediaProcessSocialMediaVideo],
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
