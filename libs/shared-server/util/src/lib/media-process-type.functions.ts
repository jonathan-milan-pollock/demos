import { BadRequestException } from '@nestjs/common';

import {
  EntityType,
  MediaProcessType,
} from '@dark-rush-photography/shared-types';

const entityTypeMap = new Map<EntityType, MediaProcessType>([
  [EntityType.MediaProcessAppleResource, MediaProcessType.AppleResource],
  [EntityType.MediaProcessIcon, MediaProcessType.Icon],
  [EntityType.MediaProcessImageVideo, MediaProcessType.ImageVideo],
  [EntityType.MediaProcessMobileImage, MediaProcessType.MobileImage],
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
