export const readExif = (imageFilePath: string): Promise<void> => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const exiftool = require('node-exiftool');
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const exiftoolBin = require('dist-exiftool');
  const exifTool = new exiftool.ExiftoolProcess(exiftoolBin);
  return exifTool
    .open()
    .then(() => exifTool.readMetadata(imageFilePath, ['-File:all']))
    .catch(console.error);
};
