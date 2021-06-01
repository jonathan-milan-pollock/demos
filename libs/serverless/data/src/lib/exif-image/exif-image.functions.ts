import {
  ImageExif,
  ImageArtistExif,
} from '@dark-rush-photography/serverless/types';

export const exifImage = (
  imageExif: ImageExif,
  getImageArtistExifConfig: (year: number) => ImageArtistExif,
  imageFilePath: string
): Promise<void> => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const exiftool = require('node-exiftool');
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const exiftoolBin = require('dist-exiftool');
  const imageArtistExif = getImageArtistExifConfig(new Date().getFullYear());
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
