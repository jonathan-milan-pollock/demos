/* eslint-disable @typescript-eslint/no-var-requires */
export const getIsoDate = (date: Date): string => {
  return date.toISOString();
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
