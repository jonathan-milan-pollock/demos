import { Observable } from 'rxjs';

import {
  ImageDimension,
  ImageDimensionLongestEdge,
  ImageDimensionStandard,
} from '@dark-rush-photography/shared/types';
import { resizeLongestEdgeImage$ } from './resize-longest-edge-image.functions';
import { resizeExactFitImage$ } from './resize-exact-fit-image.functions';
import { resizeStandardImage$ } from './resize-standard-image.functions';

export const resizeImage$ = (
  pathname: string,
  filePath: string,
  imageDimension: ImageDimension
): Observable<string> => {
  if ('longestEdge' in imageDimension) {
    return resizeLongestEdgeImage$(
      pathname,
      filePath,
      (imageDimension as ImageDimensionLongestEdge).longestEdge
    );
  }

  const imageDimensionStandard = imageDimension as ImageDimensionStandard;
  if (imageDimensionStandard.exactFit) {
    return resizeExactFitImage$(
      pathname,
      filePath,
      imageDimension as ImageDimensionStandard
    );
  }

  return resizeStandardImage$(pathname, filePath, imageDimensionStandard);
};
