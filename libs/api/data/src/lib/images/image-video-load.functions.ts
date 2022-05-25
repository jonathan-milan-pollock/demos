import { ImageVideo } from '@dark-rush-photography/shared/types';

export const loadImageVideo = (
  imageVideo?: ImageVideo
): ImageVideo | undefined => {
  if (!imageVideo) return imageVideo;

  return {
    storageId: imageVideo.storageId,
    pathname: imageVideo.pathname,
  };
};
