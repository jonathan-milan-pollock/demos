import { PostState } from '@dark-rush-photography/shared-types';
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

  if (entityGroup && entityGroup !== '0') {
    blobPrefix += `${entityGroup}/`;
  }
  return `${blobPrefix}${entitySlug}`;
};
