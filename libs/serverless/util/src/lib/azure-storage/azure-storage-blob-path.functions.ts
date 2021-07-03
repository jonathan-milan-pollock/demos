import { MediaState } from '@dark-rush-photography/shared/types';
import { ActivityMedia } from '@dark-rush-photography/serverless/types';

export const getBlobPrefix = (activityMedia: ActivityMedia): string => {
  const { entityType, entityGroup, entitySlug, state } = activityMedia;

  let blobPrefix = '';
  if (state == MediaState.New) {
    blobPrefix = `new/${entityType.toLowerCase()}/`;
  }

  if (entityGroup && entityGroup !== '0') {
    blobPrefix += `${entityGroup}/`;
  }
  return `${blobPrefix}${entitySlug}`;
};
