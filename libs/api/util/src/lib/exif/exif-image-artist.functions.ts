/* eslint-disable @typescript-eslint/no-var-requires */
import { from, Observable } from 'rxjs';
import { mapTo, switchMapTo, tap } from 'rxjs/operators';

import { IMAGE_ARTIST_EXIF_FN } from '@dark-rush-photography/api/types';

export const exifImageArtist = (
  imageFilePath: string,
  year: number
): Observable<string> => {
  const exiftool = require('node-exiftool');
  const exiftoolBin = require('dist-exiftool');
  const exifTool = new exiftool.ExiftoolProcess(exiftoolBin);
  const exifImageArtist = IMAGE_ARTIST_EXIF_FN(year);

  return from(exifTool.open()).pipe(
    switchMapTo(
      from(
        exifTool.writeMetadata(
          imageFilePath,
          {
            ...exifImageArtist,
          },
          ['overwrite_original', 'codedcharacterset=utf8']
        )
      )
    ),
    tap(() => exifTool.close()),
    mapTo(imageFilePath)
  );
};
