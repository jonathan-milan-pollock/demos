import { EMPTY, Observable } from 'rxjs';
import { expand, mergeMap, map, filter } from 'rxjs/operators';

import { MediaDimensionPixels } from '@dark-rush-photography/shared/types';
import { TileImageResolution } from '@dark-rush-photography/api/types';
import { findImageResolutionWithFileName$ } from './image-dimension-pixels.functions';
import { resizeLongestEdgeImage$ } from './resize-longest-edge.functions';

export const resizeAndFindDimensions$ = (
  fileName: string,
  filePath: string,
  updatedLongestEdge: number
): Observable<{
  pixels: MediaDimensionPixels;
  filePath: string;
}> =>
  resizeLongestEdgeImage$(fileName, filePath, updatedLongestEdge).pipe(
    mergeMap(findImageResolutionWithFileName$)
  );

const isValidDimensionPixels = (
  pixels: MediaDimensionPixels,
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
