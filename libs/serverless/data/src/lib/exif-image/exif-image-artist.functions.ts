import { ImageArtistExif } from '@dark-rush-photography/serverless/types';

export const exifImageArtist = (
  getImageArtistExifConfig: (year: number) => ImageArtistExif,
  imageFilePath: string
): Promise<void> => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const exiftool = require('node-exiftool');
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const exiftoolBin = require('dist-exiftool');
  const exifTool = new exiftool.ExiftoolProcess(exiftoolBin);
  const imageArtistExif = getImageArtistExifConfig(new Date().getFullYear());

  return exifTool
    .open()
    .read(imageFilePath)
    .then(() => {
      exifTool.writeMetadata(
        imageFilePath,
        {
          ...imageArtistExif,
        },
        ['overwrite_original', 'codedcharacterset=utf8']
      );
    })
    .then(() => exifTool.close())
    .catch(console.error);
};
