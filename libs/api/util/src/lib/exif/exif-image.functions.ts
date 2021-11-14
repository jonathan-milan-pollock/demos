/* eslint-disable @typescript-eslint/no-var-requires */
import { concatMap, from, map, Observable } from 'rxjs';

import { ImageExif } from '@dark-rush-photography/shared/types';

export const exifImage$ = (
  filePath: string,
  imageExif: ImageExif
): Observable<void> => {
  const exiftool = require('node-exiftool');
  const exiftoolBin = require('dist-exiftool');
  const ep = new exiftool.ExiftoolProcess(exiftoolBin);

  return from(ep.open()).pipe(
    concatMap(() =>
      from(
        ep.writeMetadata(
          filePath,
          {
            ...imageExif,
          },
          ['overwrite_original', 'codedcharacterset=utf8']
        )
      )
    ),
    concatMap(() => from(ep.close())),
    map(() => undefined)
  );
};
