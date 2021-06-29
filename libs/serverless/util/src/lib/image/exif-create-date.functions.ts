/* eslint-disable @typescript-eslint/no-var-requires */
import { Observable } from 'rxjs';

import { ExifCreateDate } from '@dark-rush-photography/serverless/types';

export const readCreateDateExif$ = (filePath: string): Observable<string> => {
  const exiftool = require('node-exiftool');
  const exiftoolBin = require('dist-exiftool');
  const ep = new exiftool.ExiftoolProcess(exiftoolBin);
  return ep
    .open()
    .then(() => ep.readMetadata(filePath, ['CreateDate']))
    .then((createDate: ExifCreateDate) => {
      return createDate.data[0].CreateDate;
    });
};

export const getExifDateNow = (): string =>
  new Date().toISOString().slice(0, 10).replace('-', ':');

export const getIsoDateFromExifDate = (
  exifDate: string | null
): string | null => {
  const exifDateToIso = require('exif-date-to-iso');
  return exifDateToIso.toISO(exifDate, 'America/New_York');
};
