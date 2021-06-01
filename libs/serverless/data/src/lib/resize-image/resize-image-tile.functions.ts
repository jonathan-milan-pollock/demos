import { TileImageDimension } from '@dark-rush-photography/serverless/types';
import { getImageDimension } from './image-dimension.functions';
import { resizeLongestEdge } from './resize-longest-edge.functions';

export const resizeImageTile = async (
  imageFilePath: string,
  imageName: string,
  tileImageDimension: TileImageDimension
): Promise<string> => {
  const { minWidth, minHeight } = tileImageDimension;
  let longestEdge = tileImageDimension.longestEdge;
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
