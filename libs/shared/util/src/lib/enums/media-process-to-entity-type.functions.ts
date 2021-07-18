import {
  EntityType,
  MediaProcessType,
} from '@dark-rush-photography/shared/types';

const mediaProcessToEntityTypeMap = new Map<MediaProcessType, EntityType>([
  [MediaProcessType.ImageVideo, EntityType.MediaProcessImageVideo],
  [MediaProcessType.SocialMediaImage, EntityType.MediaProcessSocialMediaImage],
  [
    MediaProcessType.SocialMediaThreeSixtyImage,
    EntityType.MediaProcessSocialMediaThreeSixtyImage,
  ],
  [MediaProcessType.SocialMediaVideo, EntityType.MediaProcessSocialMediaVideo],
  [
    MediaProcessType.SocialMediaThreeSixtyVideo,
    EntityType.MediaProcessSocialMediaThreeSixtyVideo,
  ],
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
