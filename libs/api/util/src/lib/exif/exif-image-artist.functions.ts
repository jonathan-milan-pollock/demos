/* eslint-disable @typescript-eslint/no-var-requires */
import { concatMap, from, mapTo, Observable } from 'rxjs';

import { ImageArtistExif } from '@dark-rush-photography/api/types';

export const exifImageArtist$ = (
  filePath: string,
  imageArtistExif: ImageArtistExif
): Observable<string> => {
  const exiftool = require('node-exiftool');
  const exiftoolBin = require('dist-exiftool');
  const ep = new exiftool.ExiftoolProcess(exiftoolBin);

  return from(ep.open()).pipe(
    concatMap(() =>
      from(
        ep.writeMetadata(filePath, { ...imageArtistExif }, [
          'overwrite_original',
          'codedcharacterset=utf8',
        ])
      )
    ),
    concatMap(() => from(ep.close())),
    mapTo(filePath)
  );
};
