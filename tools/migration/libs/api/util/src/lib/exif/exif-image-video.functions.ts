import { ImageVideoExif } from '@dark-rush-photography/shared/types';

export const getExifImageVideoArguments = (
  imageVideoExif: ImageVideoExif
): string => {
  let exif = `-metadata title="${imageVideoExif.title}"`;
  exif += ` -metadata description="${imageVideoExif.description}"`;
  exif += ` -metadata author="${imageVideoExif.author}"`;
  exif += ` -metadata year="${imageVideoExif.year}"`;
  exif += ` -metadata copyright="${imageVideoExif.copyright}"`;
  return exif;
};
