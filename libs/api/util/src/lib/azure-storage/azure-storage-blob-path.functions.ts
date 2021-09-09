import {
  ImageDimensionType,
  MediaState,
  VideoDimensionType,
} from '@dark-rush-photography/shared/types';
import { DEFAULT_ENTITY_GROUP, Media } from '@dark-rush-photography/api/types';

export const getAzureStorageBlobPath = (media: Media): string => {
  const blobPrefix = getAzureStorageBlobPrefix(media);
  return `${blobPrefix}/${media.fileName}`;
};

export const getAzureStorageBlobPathWithDimension = (
  media: Media,
  mediaDimensionType: ImageDimensionType | VideoDimensionType
): string => {
  const blobPrefix = getAzureStorageBlobPrefix(media);
  if (media.state == MediaState.Posted) {
    return `${blobPrefix}/${mediaDimensionType.toLowerCase()}/${
      media.fileName
    }`;
  }
  return `${blobPrefix}/${media.state.toLowerCase()}/${mediaDimensionType.toLowerCase()}/${
    media.fileName
  }`;
};

export const getAzureStorageBlobPrefix = (media: Media): string => {
  let blobPrefix = `${media.entityType.toLowerCase()}/`;
  if (media.entityGroup && media.entityGroup !== DEFAULT_ENTITY_GROUP) {
    blobPrefix += `${media.entityGroup}/`;
  }
  return `${blobPrefix}${media.entitySlug}`;
};
