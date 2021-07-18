/* eslint-disable @typescript-eslint/no-var-requires */
import { concatMap, from, mapTo, Observable } from 'rxjs';

import { Location } from '@dark-rush-photography/shared/types';
import { ImageArtistExif, ImageExif } from '@dark-rush-photography/api/types';

export const getImageExif = (
  datePublished: string,
  title?: string,
  description?: string,
  keywords?: string,
  location?: Location
): ImageExif => ({
  Title: title ?? '',
  'dc:description': description ?? '',
  'Keywords+': keywords?.split(',') ?? [],
  'xmp:MetadataDate': datePublished,
  FileModifyDate: datePublished,
  'Iptc4xmpCore:Location': location?.place ?? '',
  City: location?.city ?? '',
  State: location?.stateOrProvince ?? '',
  Country: location?.country ?? '',
});

export const exifImage$ = (
  filePath: string,
  imageArtistExif: ImageArtistExif,
  imageExif: ImageExif
): Observable<string> => {
  const exiftool = require('node-exiftool');
  const exiftoolBin = require('dist-exiftool');
  const ep = new exiftool.ExiftoolProcess(exiftoolBin);

  const keywordsSet = new Set<string>([
    ...imageExif['Keywords+'],
    ...imageArtistExif['Keywords+'],
  ]);

  return from(ep.open()).pipe(
    concatMap(() =>
      from(
        ep.writeMetadata(
          filePath,
          {
            ...imageArtistExif,
            ...imageExif,
            'Keywords+': [...keywordsSet],
          },
          ['overwrite_original', 'codedcharacterset=utf8']
        )
      )
    ),
    concatMap(() => from(ep.close())),
    mapTo(filePath)
  );
};
