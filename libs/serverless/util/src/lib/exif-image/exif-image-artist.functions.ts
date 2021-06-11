import { ImageArtistExif } from '@dark-rush-photography/serverless/types';
import { from, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

export const exifImageArtist = (
  imageFilePath: string,
  getImageArtistExifConfig: (year: number) => ImageArtistExif
): Observable<string> => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const exiftool = require('node-exiftool');
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const exiftoolBin = require('dist-exiftool');
  const exifTool = new exiftool.ExiftoolProcess(exiftoolBin);
  const imageArtistExif = getImageArtistExifConfig(new Date().getFullYear());

  return from(exifTool.open()).pipe(
    switchMap(() =>
      from(
        exifTool.writeMetadata(
          imageFilePath,
          {
            ...imageArtistExif,
          },
          ['overwrite_original', 'codedcharacterset=utf8']
        )
      )
    ),
    tap(() => exifTool.close()),
    map(() => imageFilePath)
  );
};
