import { Observable } from 'rxjs';

import {
  ImageDimensionConfig,
  ImageDimensionLongestEdgeConfig,
  ImageDimensionTileConfig,
} from '@dark-rush-photography/serverless/types';
import { resizeImageTile$ } from './resize-image-tile.functions';
import { resizeLongestEdge$ } from './resize-longest-edge.functions';

export const resizeImage$ = (
  imageFilePath: string,
  imageName: string,
  imageDimensionConfig: ImageDimensionConfig
): Observable<string> => {
  switch (imageDimensionConfig.type) {
    case 'Tile':
      return resizeImageTile$(
        imageFilePath,
        imageName,
        imageDimensionConfig as ImageDimensionTileConfig
      );
    case 'Thumbnail':
    case 'Small':
      return resizeLongestEdge$(
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
