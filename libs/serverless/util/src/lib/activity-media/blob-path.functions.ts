import {
  ImageDimensionType,
  PostState,
} from '@dark-rush-photography/shared-types';
import { ActivityMedia } from '@dark-rush-photography/serverless/types';

export const getBlobPrefix = (
  postState: PostState,
  activityMedia: ActivityMedia
): string => {
  const { entityType, entityGroup, entitySlug } = activityMedia;

  let blobPrefix = '';
  if (postState == PostState.New) {
    blobPrefix = `new/${entityType.toLowerCase()}/`;
  }

  if (entityGroup) {
    blobPrefix += `${entityGroup}/`;
  }
  return `${blobPrefix}${entitySlug}`;
};

export const getBlobPath = (
  postState: PostState,
  activityMedia: ActivityMedia
): string => {
  const blobPrefix = getBlobPrefix(postState, activityMedia);
  return `${blobPrefix}/${activityMedia.fileName}`;
};

export const getBlobPathWithImageDimension = (
  postState: PostState,
  activityMedia: ActivityMedia,
  imageDimensionType: ImageDimensionType
): string => {
  const blobPrefix = getBlobPrefix(postState, activityMedia);
  return `${blobPrefix}/${imageDimensionType.toLowerCase()}/${
    activityMedia.fileName
  }`;
};
