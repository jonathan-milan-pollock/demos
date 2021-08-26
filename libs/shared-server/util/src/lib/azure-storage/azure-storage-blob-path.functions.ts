import { DEFAULT_ENTITY_GROUP } from '@dark-rush-photography/api/types';
import { Media } from '@dark-rush-photography/shared-server/types';
import {
  ImageDimensionType,
  MediaState,
  VideoDimensionType,
} from '@dark-rush-photography/shared/types';

export const getAzureStorageBlobPath = (media: Media): string => {
  const blobPrefix = getAzureStorageBlobPrefix(media);
  return `${blobPrefix}/${media.fileName}`;
};

export const getAzureStorageBlobPathWithDimension = (
  media: Media,
  mediaDimensionType: ImageDimensionType | VideoDimensionType
): string => {
  const blobPrefix = getAzureStorageBlobPrefix(media);
  return `${blobPrefix}/${mediaDimensionType.toLowerCase()}/${media.fileName}`;
};

export const getAzureStorageBlobPrefix = (media: Media): string => {
  let blobPrefix = '';
  if (media.state == MediaState.New) {
    blobPrefix = `${media.entityType.toLowerCase()}/`;
  }

  if (media.entityGroup && media.entityGroup !== DEFAULT_ENTITY_GROUP) {
    blobPrefix += `${media.entityGroup}/`;
  }
  return `${blobPrefix}${media.entitySlug}`;
};
