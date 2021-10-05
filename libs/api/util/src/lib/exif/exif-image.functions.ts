/* eslint-disable @typescript-eslint/no-var-requires */
import { ImageArtistExif } from '@dark-rush-photography/shared/types';
import { ImageExif, Location } from '@dark-rush-photography/shared/types';
import { concatMap, from, map, Observable } from 'rxjs';

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
    map(() => filePath)
  );
};
