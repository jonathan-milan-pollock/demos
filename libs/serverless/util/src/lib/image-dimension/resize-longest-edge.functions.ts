import sharp = require('sharp');

import { createTempFile } from '@dark-rush-photography/shared-server/util';
import { getImageDimension } from './image-dimension.functions';

export const resizeLongestEdge = async (
  imageFilePath: string,
  imageName: string,
  longestEdge: number
): Promise<string> => {
  const tempOutputFilePath = await createTempFile(imageName);
  const { width, height } = await getImageDimension(imageFilePath);
  await (width > height
    ? sharp(imageFilePath)
        .resize(longestEdge, undefined)
        .toFile(tempOutputFilePath)
    : sharp(imageFilePath)
        .resize(undefined, longestEdge)
        .toFile(tempOutputFilePath));
  return tempOutputFilePath;
};
