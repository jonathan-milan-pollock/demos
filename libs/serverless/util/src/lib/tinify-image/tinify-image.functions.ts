import * as tinify from 'tinify';

export const tinifyImage = (
  imageFilePath: string,
  tinyPngApiKey: string
): Promise<Uint8Array> =>
  new Promise((resolve) => {
    tinify.default.key = tinyPngApiKey;
    resolve(tinify.fromFile(imageFilePath).toBuffer());
  });
