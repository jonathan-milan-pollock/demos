/* eslint-disable @typescript-eslint/no-var-requires */
import { ImageExif } from '@dark-rush-photography/api/types';

export const exifImage = (
  filePath: string,
  imageExif: ImageExif,
  dateCreated: string
): Promise<void> => {
  const exiftool = require('node-exiftool');
  const exiftoolBin = require('dist-exiftool');
  //const imageArtistExif = IMAGE_ARTIST_EXIF_FN(
  //  new Date().getFullYear(),
  //  dateCreated
  //);
  const keywordsSet = new Set<string>([
    //  ...imageArtistExif['Keywords+'],
    ...imageExif['Keywords+'],
  ]);

  const exifTool = new exiftool.ExiftoolProcess(exiftoolBin);
  return exifTool
    .open()
    .then(() => exifTool.readMetadata(filePath, ['-File:all']))
    .then(() => {
      exifTool.writeMetadata(
        filePath,
        {
          //          ...imageArtistExif,
          'Keywords+': [...keywordsSet],
        },
        ['overwrite_original', 'codedcharacterset=utf8']
      );
    })
    .then(() => exifTool.close())
    .catch(console.error);
};
