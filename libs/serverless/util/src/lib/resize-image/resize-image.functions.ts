import {
  ImagePixels,
  ImagePixelsLongestEdge,
  ImagePixelsTile,
} from '@dark-rush-photography/serverless/types';

import { resizeImageTile } from './resize-image-tile.functions';
import { resizeLongestEdge } from './resize-longest-edge.functions';

export const resizeImage = async (
  imageFilePath: string,
  imageName: string,
  imagePixels: ImagePixels
): Promise<string> => {
  switch (imagePixels.type) {
    case 'Tile':
      return await resizeImageTile(
        imageFilePath,
        imageName,
        imagePixels as ImagePixelsTile
      );
    case 'Thumbnail':
      return await resizeLongestEdge(
        imageFilePath,
        imageName,
        (imagePixels as ImagePixelsLongestEdge).longestEdge
      );
    case 'Small':
      return await resizeLongestEdge(
        imageFilePath,
        imageName,
        (imagePixels as ImagePixelsLongestEdge).longestEdge
      );
    default:
      throw new Error(
        `Could not find image dimension for the type ${imagePixels.type}`
      );
  }
};
