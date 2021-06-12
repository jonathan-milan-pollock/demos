import {
  ImageDimensionConfig,
  ImageDimensionLongestEdgeConfig,
  ImageDimensionTileConfig,
} from '@dark-rush-photography/serverless/types';

import { resizeImageTile } from './resize-image-tile.functions';
import { resizeLongestEdge } from './resize-longest-edge.functions';

export const resizeImage = async (
  imageFilePath: string,
  imageName: string,
  imageDimensionConfig: ImageDimensionConfig
): Promise<string> => {
  switch (imageDimensionConfig.type) {
    case 'Tile':
      return await resizeImageTile(
        imageFilePath,
        imageName,
        imageDimensionConfig as ImageDimensionTileConfig
      );
    case 'Thumbnail':
      return await resizeLongestEdge(
        imageFilePath,
        imageName,
        (imageDimensionConfig as ImageDimensionLongestEdgeConfig).longestEdge
      );
    case 'Small':
      return await resizeLongestEdge(
        imageFilePath,
        imageName,
        (imageDimensionConfig as ImageDimensionLongestEdgeConfig).longestEdge
      );
    default:
      throw new Error(
        `Could not find image dimension for the type ${imageDimensionConfig.type}`
      );
  }
};
