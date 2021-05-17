import { TileImageDimension } from '@dark-rush-photography/serverless/types';
import { getImageDimension } from './image-dimension.functions';
import { resizeLongestEdge } from './resize-longest-edge.functions';

export const resizeImageTile = async (
  imageFilePath: string,
  imageName: string,
  tileImageDimension: TileImageDimension
): Promise<E.Either<Error, string>> => {
  const { minWidth, minHeight } = tileImageDimension;
  let longestEdge = tileImageDimension.longestEdge;
  let dimensions = await getImageDimension(imageFilePath);
  let resizedImageFilePath = imageFilePath;
  do {
    try {
      resizedImageFilePath = await resizeLongestEdge(
        resizedImageFilePath,
        imageName,
        longestEdge
      );
      dimensions = await getImageDimension(resizedImageFilePath);
      if (dimensions.width >= minWidth && dimensions.height >= minHeight) {
        return E.right(resizedImageFilePath);
      }
      longestEdge += 10;
    } catch (error) {
      console.error(error);
      return E.left(error);
    }
  } while (dimensions.width < minWidth || dimensions.height < minHeight);
  return E.left(new Error('unreachable'));
};
