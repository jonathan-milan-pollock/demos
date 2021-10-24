import { Observable, of } from 'rxjs';

import { VideoExif } from '@dark-rush-photography/shared/types';

export const exifVideo$ = (videoExif: VideoExif): Observable<string> => {
  let videoExifCommand = `-metadata author="${videoExif.author}"`;
  videoExifCommand += ` -metadata year="${videoExif.year}"`;
  videoExifCommand += ` -metadata copyright="${videoExif.copyright}"`;

  if (videoExif.title)
    videoExifCommand += ` -metadata title="${videoExif.title}"`;

  if (videoExif.description)
    videoExifCommand += ` -metadata description="${videoExif.description}"`;

  return of(videoExifCommand);
};
