/* eslint-disable @typescript-eslint/no-var-requires */
import { from, map, Observable, of } from 'rxjs';

import { DateCreatedExif } from '@dark-rush-photography/api/types';

export const findImageExifDateCreated$ = (
  filePath: string,
  currentDate: Date
): Observable<string> => {
  const exiftool = require('node-exiftool');
  const exiftoolBin = require('dist-exiftool');
  const ep = new exiftool.ExiftoolProcess(exiftoolBin);

  return from(ep.open()).pipe(
    map(() => ep.readMetadata(filePath, ['CreateDate'])),
    map((dateCreated: DateCreatedExif) => {
      return dateCreated.data &&
        dateCreated.data.length > 0 &&
        'CreateDate' in dateCreated.data[0] &&
        dateCreated.data[0].CreateDate
        ? dateCreated.data[0].CreateDate
        : getExifDate(currentDate);
    })
  );
};

export const findVideoExifDateCreated$ = (
  filePath: string,
  currentDate: Date
): Observable<string> => {
  return of(getExifDate(currentDate));
};

export const getExifDate = (date: Date): string =>
  `${date.toISOString().slice(0, 10).replace(/-/g, ':')} ${date
    .toISOString()
    .slice(11, 8)}`;

export const getIsoDateFromExifDate = (
  exifDate: string | null
): string | null => {
  const exifDateToIso = require('exif-date-to-iso');
  return exifDateToIso.toISO(exifDate, 'America/New_York');
};
