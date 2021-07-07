/* eslint-disable @typescript-eslint/no-var-requires */
import { DateCreatedExif } from '@dark-rush-photography/api/types';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export const findExifDateCreated$ = (filePath: string): Observable<string> => {
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
        : getExifDateNow();
    })
  );
};

//TODO: Add the time to this!!!
export const getExifDateNow = (): string =>
  new Date().toISOString().slice(0, 10).replace('-', ':');

export const getIsoDateFromExifDate = (
  exifDate: string | null
): string | null => {
  const exifDateToIso = require('exif-date-to-iso');
  return exifDateToIso.toISO(exifDate, 'America/New_York');
};
