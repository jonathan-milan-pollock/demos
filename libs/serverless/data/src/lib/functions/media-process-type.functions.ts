import { BadRequestException } from '@nestjs/common';

import {
  EntityType,
  MediaProcessType,
} from '@dark-rush-photography/shared-types';

const entityTypeMap = new Map<EntityType, MediaProcessType>([
  [EntityType.MediaProcessAppleIcon, MediaProcessType.AppleIcon],
  [EntityType.MediaProcessAppleResource, MediaProcessType.AppleResource],
  [EntityType.MediaProcessImageVideo, MediaProcessType.ImageVideo],
  [EntityType.MediaProcessPostMobileImage, MediaProcessType.PostMobileImage],
  [EntityType.MediaProcessPng, MediaProcessType.Png],
]);

export const getMediaProcessType = (
  entityType: EntityType
): MediaProcessType => {
  const mediaProcessType = entityTypeMap.get(entityType);
  if (!mediaProcessType)
    throw new BadRequestException(`Unable to find entity type ${entityType}`);
  return mediaProcessType;
};
