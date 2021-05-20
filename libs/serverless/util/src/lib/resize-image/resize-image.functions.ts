import {
  ImageDimension,
  LongestEdgeImageDimension,
  TileImageDimension,
} from '@dark-rush-photography/serverless/types';
import { resizeImageTile } from './resize-image-tile.functions';
import { resizeLongestEdge } from './resize-longest-edge.functions';

export const resizeImage = async (
  imageFilePath: string,
  imageName: string,
  imageDimension: ImageDimension
): Promise<string> => {
  switch (imageDimension.type) {
    case 'Tile':
      return await resizeImageTile(
        imageFilePath,
        imageName,
        imageDimension as TileImageDimension
      );
    case 'Thumbnail':
      return await resizeLongestEdge(
        imageFilePath,
        imageName,
        (imageDimension as LongestEdgeImageDimension).longestEdge
      );
    case 'Small':
      return await resizeLongestEdge(
        imageFilePath,
        imageName,
        (imageDimension as LongestEdgeImageDimension).longestEdge
      );
    default:
      throw new Error(
        `Could not find image dimension for the type ${imageDimension.type}`
      );
  }
};
