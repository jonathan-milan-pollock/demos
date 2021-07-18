import { Observable, of } from 'rxjs';

import { VideoArtistExif, VideoExif } from '@dark-rush-photography/api/types';

export const exifVideo$ = (
  filePath: string,
  videoArtistExif: VideoArtistExif,
  videoExif: VideoExif
): Observable<string> => {
  let videoExifCommand = `-metadata author="${videoArtistExif.author}"`;
  videoExifCommand += ` -metadata year="${videoArtistExif.year}"`;
  videoExifCommand += ` -metadata copyright="${videoArtistExif.copyright}"`;

  if (videoExif.title)
    videoExifCommand += ` -metadata title="${videoExif.title}"`;

  if (videoExif.description)
    videoExifCommand += ` -metadata description="${videoExif.description}"`;

  return of(videoExifCommand);
};
