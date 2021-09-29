import { Observable } from 'rxjs';

import {
  ImageDimensionConfig,
  ImageDimensionLongestEdgeConfig,
  ImageDimensionStandardConfig,
} from '@dark-rush-photography/shared/types';
import { resizeLongestEdgeImage$ } from './resize-longest-edge-image.functions';
import { resizeExactFitImage$ } from './resize-exact-fit-image.functions';
import { resizeStandardImage$ } from './resize-standard-image.functions';

export const resizeImage$ = (
  fileName: string,
  filePath: string,
  imageResolution: ImageDimensionConfig
): Observable<string> => {
  if ('longestEdge' in imageResolution) {
    return resizeLongestEdgeImage$(
      fileName,
      filePath,
      (imageResolution as ImageDimensionLongestEdgeConfig).longestEdge
    );
  }

  const standardImageResolution =
    imageResolution as ImageDimensionStandardConfig;
  if (standardImageResolution.exactFit) {
    return resizeExactFitImage$(
      fileName,
      filePath,
      imageResolution as ImageDimensionStandardConfig
    );
  }

  return resizeStandardImage$(fileName, filePath, standardImageResolution);
};
