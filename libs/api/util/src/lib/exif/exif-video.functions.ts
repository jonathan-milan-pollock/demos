import { VideoExif } from '@dark-rush-photography/shared/types';

export const loadExifImageVideoCommand$ = (videoExif: VideoExif): string => {
  let videoExifCommand = `-metadata title="${videoExif.title}"`;
  videoExifCommand += ` -metadata description="${videoExif.description}"`;
  videoExifCommand += ` -metadata author="${videoExif.author}"`;
  videoExifCommand += ` -metadata year="${videoExif.year}"`;
  videoExifCommand += ` -metadata copyright="${videoExif.copyright}"`;
  return videoExifCommand;
};
