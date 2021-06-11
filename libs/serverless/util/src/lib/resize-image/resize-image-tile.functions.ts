import { ImagePixelsTile } from '@dark-rush-photography/serverless/types';
import { getImageDimension } from './image-dimension.functions';
import { resizeLongestEdge } from './resize-longest-edge.functions';

export const resizeImageTile = async (
  imageFilePath: string,
  imageName: string,
  imagePixelsTile: ImagePixelsTile
): Promise<string> => {
  const { minWidth, minHeight } = imagePixelsTile;
  let longestEdge = imagePixelsTile.longestEdge;
  let dimensions = await getImageDimension(imageFilePath);

  console.log('resizedImageFilePath' + imageFilePath);

  let resizedImageFilePath = imageFilePath;
  do {
    resizedImageFilePath = await resizeLongestEdge(
      resizedImageFilePath,
      imageName,
      longestEdge
    );
    dimensions = await getImageDimension(resizedImageFilePath);
    if (dimensions.width >= minWidth && dimensions.height >= minHeight) {
      return resizedImageFilePath;
    }
    longestEdge += 10;
  } while (dimensions.width < minWidth || dimensions.height < minHeight);
  throw new Error('unreachable');
};
