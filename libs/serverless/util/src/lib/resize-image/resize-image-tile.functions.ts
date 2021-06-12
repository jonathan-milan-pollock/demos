import { ImageDimensionTileConfig } from '@dark-rush-photography/serverless/types';
import { getImageDimension } from './image-dimension.functions';
import { resizeLongestEdge } from './resize-longest-edge.functions';

export const resizeImageTile = async (
  imageFilePath: string,
  imageName: string,
  imageDimensionTileConfig: ImageDimensionTileConfig
): Promise<string> => {
  const { minWidth, minHeight } = imageDimensionTileConfig;
  let longestEdge = imageDimensionTileConfig.longestEdge;
  let dimensions = await getImageDimension(imageFilePath);

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
