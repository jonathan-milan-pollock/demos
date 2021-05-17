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
): Promise<E.Either<Error, string>> => {
  switch (imageDimension.type) {
    case 'Tile':
      return await resizeImageTile(
        imageFilePath,
        imageName,
        imageDimension as TileImageDimension
      );
    case 'Thumbnail':
      return E.right(
        await resizeLongestEdge(
          imageFilePath,
          imageName,
          (imageDimension as LongestEdgeImageDimension).longestEdge
        )
      );
    case 'Small':
      return E.right(
        await resizeLongestEdge(
          imageFilePath,
          imageName,
          (imageDimension as LongestEdgeImageDimension).longestEdge
        )
      );
    default:
      return E.left(
        new Error(
          `Could not find image dimension for the type ${imageDimension.type}`
        )
      );
  }
};
