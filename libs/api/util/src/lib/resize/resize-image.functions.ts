import { Observable } from 'rxjs';

import {
  ImageResolution,
  LongestEdgeImageResolution,
  StandardImageResolution,
  TileImageResolution,
} from '@dark-rush-photography/api/types';
import { resizeTileImage$ } from './resize-tile-image.functions';
import { resizeLongestEdgeImage$ } from './resize-longest-edge.functions';
import { resizeExactFitImageDimensions$ as resizeExactFitImage$ } from './resize-exact-fit-image.functions';
import { resizeStandardImageDimensions$ as resizeStandardImage$ } from './resize-standard-image.functions';

export const resizeImage$ = (
  fileName: string,
  filePath: string,
  imageResolution: ImageResolution
): Observable<string> => {
  if ('minPixels' in imageResolution) {
    return resizeTileImage$(
      fileName,
      filePath,
      imageResolution as TileImageResolution
    );
  }

  if ('longestEdge' in imageResolution) {
    return resizeLongestEdgeImage$(
      fileName,
      filePath,
      (imageResolution as LongestEdgeImageResolution).longestEdge
    );
  }

  const standardImageResolution = imageResolution as StandardImageResolution;
  if (standardImageResolution.exactFit) {
    return resizeExactFitImage$(
      fileName,
      filePath,
      imageResolution as StandardImageResolution
    );
  }

  return resizeStandardImage$(fileName, filePath, standardImageResolution);
};
