/* eslint-disable @typescript-eslint/no-var-requires */
import {
  ExifImage,
  ExifImageArtist,
} from '@dark-rush-photography/serverless/types';

export const exifImage = (
  imageFilePath: string,
  imageExif: ExifImage,
  getExifImageArtistConfig: (year: number) => ExifImageArtist
): Promise<void> => {
  const exiftool = require('node-exiftool');
  const exiftoolBin = require('dist-exiftool');
  const imageArtistExif = getExifImageArtistConfig(new Date().getFullYear());
  const keywordsSet = new Set<string>([
    ...imageArtistExif['Keywords+'],
    ...imageExif['Keywords+'],
  ]);

  const exifTool = new exiftool.ExiftoolProcess(exiftoolBin);
  return exifTool
    .open()
    .then(() => exifTool.readMetadata(imageFilePath, ['-File:all']))
    .then(() => {
      exifTool.writeMetadata(
        imageFilePath,
        {
          ...imageArtistExif,
          'Keywords+': [...keywordsSet],
        },
        ['overwrite_original', 'codedcharacterset=utf8']
      );
    })
    .then(() => exifTool.close())
    .catch(console.error);
};
