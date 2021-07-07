import { NotFoundException } from '@nestjs/common';

import { Observable } from 'rxjs';

import {
  ImageDimensionConfig,
  ImageDimensionLongestEdgeConfig,
  ImageDimensionTileConfig,
} from '@dark-rush-photography/api/types';
import { resizeImageTile$ } from './resize-image-tile.functions';
import { resizeLongestEdge$ } from './resize-longest-edge.functions';

export const resizeImage$ = (
  fileName: string,
  filePath: string,
  imageDimensionConfig: ImageDimensionConfig
): Observable<string> => {
  switch (imageDimensionConfig.type) {
    case 'Tile':
      return resizeImageTile$(
        fileName,
        filePath,
        imageDimensionConfig as ImageDimensionTileConfig
      );
    case 'Thumbnail':
    case 'Small':
      return resizeLongestEdge$(
        fileName,
        filePath,
        (imageDimensionConfig as ImageDimensionLongestEdgeConfig).longestEdge
      );
    default:
      throw new NotFoundException(
        `Could not find image dimension for the type ${imageDimensionConfig.type}`
      );
  }
};
