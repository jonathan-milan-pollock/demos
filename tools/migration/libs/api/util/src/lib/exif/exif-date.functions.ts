/* eslint-disable @typescript-eslint/no-var-requires */
import { combineLatest, concatMap, from, map, Observable, of } from 'rxjs';

import { ExifCreatedDate } from '@dark-rush-photography/shared/types';

export const getExifDateFromIsoDate = (isoDate: string): string => {
  return (
    isoDate.substring(0, 10).replace(/-/g, ':') +
    ' ' +
    isoDate.substring(isoDate.indexOf('T') + 1, isoDate.indexOf('T') + 1 + 8)
  );
};

export const findExifCreatedDate$ = (
  filePath: string
): Observable<string | undefined> => {
  const exiftool = require('node-exiftool');
  const exiftoolBin = require('dist-exiftool');
  const ep = new exiftool.ExiftoolProcess(exiftoolBin);

  return from(ep.open()).pipe(
    concatMap(() => from(ep.readMetadata(filePath, ['CreateDate']))),
    map((response) => {
      const exifCreatedDate = response as ExifCreatedDate;
      const foundExifCreateDate = 'CreateDate' in exifCreatedDate.data[0];

      return foundExifCreateDate
        ? exifCreatedDate.data[0].CreateDate
        : undefined;
    }),
    concatMap((exifCreatedDate) =>
      combineLatest([of(exifCreatedDate), from(ep.close())])
    ),
    map(([exifCreatedDate]) => exifCreatedDate)
  );
};
