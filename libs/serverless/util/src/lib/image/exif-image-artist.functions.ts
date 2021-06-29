import { ExifImageArtist } from '@dark-rush-photography/serverless/types';
import { from, Observable } from 'rxjs';
import { map, mapTo, switchMap, switchMapTo, tap } from 'rxjs/operators';

export const exifImageArtist = (
  imageFilePath: string,
  getImageArtistExifConfig: (year: number) => ExifImageArtist
): Observable<string> => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const exiftool = require('node-exiftool');
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const exiftoolBin = require('dist-exiftool');
  const exifTool = new exiftool.ExiftoolProcess(exiftoolBin);
  const imageArtistExif = getImageArtistExifConfig(new Date().getFullYear());

  return from(exifTool.open()).pipe(
    switchMapTo(
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
    mapTo(imageFilePath)
  );
};
