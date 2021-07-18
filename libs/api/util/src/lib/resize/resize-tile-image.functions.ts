import { EMPTY, expand, filter, map, mergeMap, Observable } from 'rxjs';

import { MediaResolution } from '@dark-rush-photography/shared/types';
import { TileImageResolution } from '@dark-rush-photography/api/types';
import { findImageResolutionWithFileName$ } from './image-resolution.functions';
import { resizeLongestEdgeImage$ } from './resize-longest-edge-image.functions';

export const resizeAndFindDimensions$ = (
  fileName: string,
  filePath: string,
  updatedLongestEdge: number
): Observable<{
  pixels: MediaResolution;
  filePath: string;
}> =>
  resizeLongestEdgeImage$(fileName, filePath, updatedLongestEdge).pipe(
    mergeMap(findImageResolutionWithFileName$)
  );

const isValidDimensionPixels = (
  pixels: MediaResolution,
  minWidth: number,
  minHeight: number
) => pixels.width >= minWidth && pixels.height >= minHeight;

export const resizeTileImage$ = (
  fileName: string,
  filePath: string,
  imageDimensionTileConfig: TileImageResolution
): Observable<string> => {
  const { minPixels, longestEdge } = imageDimensionTileConfig;

  let updatedLongestEdge = longestEdge;
  return resizeAndFindDimensions$(fileName, filePath, updatedLongestEdge).pipe(
    expand(({ pixels, filePath }) => {
      updatedLongestEdge += 10;
      return isValidDimensionPixels(pixels, minPixels.width, minPixels.height)
        ? EMPTY
        : resizeAndFindDimensions$(fileName, filePath, updatedLongestEdge);
    }),
    filter(({ pixels }) =>
      isValidDimensionPixels(pixels, minPixels.width, minPixels.height)
    ),
    map(({ filePath }) => filePath)
  );
};
