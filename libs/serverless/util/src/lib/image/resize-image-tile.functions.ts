import { EMPTY, Observable } from 'rxjs';
import { expand, mergeMap, map, filter } from 'rxjs/operators';

import { MediaDimensionPixels } from '@dark-rush-photography/shared/types';
import { ImageDimensionTileConfig } from '@dark-rush-photography/serverless/types';
import { findImageDimensionPixelsWithFileName$ } from './image-dimension-pixels.functions';
import { resizeLongestEdge$ } from './resize-longest-edge.functions';

export const resizeAndFindDimensions$ = (
  fileName: string,
  filePath: string,
  updatedLongestEdge: number
): Observable<{
  pixels: MediaDimensionPixels;
  filePath: string;
}> =>
  resizeLongestEdge$(fileName, filePath, updatedLongestEdge).pipe(
    mergeMap(findImageDimensionPixelsWithFileName$)
  );

const isValidDimensionPixels = (
  pixels: MediaDimensionPixels,
  minWidth: number,
  minHeight: number
) => pixels.width >= minWidth && pixels.height >= minHeight;

export const resizeImageTile$ = (
  fileName: string,
  filePath: string,
  imageDimensionTileConfig: ImageDimensionTileConfig
): Observable<string> => {
  const { minWidth, minHeight, longestEdge } = imageDimensionTileConfig;

  let updatedLongestEdge = longestEdge;
  return resizeAndFindDimensions$(fileName, filePath, updatedLongestEdge).pipe(
    expand(({ pixels, filePath }) => {
      updatedLongestEdge += 10;
      return isValidDimensionPixels(pixels, minWidth, minHeight)
        ? EMPTY
        : resizeAndFindDimensions$(fileName, filePath, updatedLongestEdge);
    }),
    filter(({ pixels }) => isValidDimensionPixels(pixels, minWidth, minHeight)),
    map(({ filePath }) => filePath)
  );
};
