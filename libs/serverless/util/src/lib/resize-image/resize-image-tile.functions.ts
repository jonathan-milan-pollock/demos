import { Logger } from '@nestjs/common';

import { EMPTY, Observable } from 'rxjs';
import { tap, expand, mergeMap, map, filter } from 'rxjs/operators';

import { MediaDimensionPixels } from '@dark-rush-photography/shared-types';
import { ImageDimensionTileConfig } from '@dark-rush-photography/serverless/types';
import { findImageDimensionPixelsWithFileName$ } from './image-dimension-pixels.functions';
import { resizeLongestEdge$ } from './resize-longest-edge.functions';

export const resizeAndFindDimensions$ = (
  imageFilePath: string,
  imageName: string,
  updatedLongestEdge: number
): Observable<{
  pixels: MediaDimensionPixels;
  imageFilePath: string;
}> =>
  resizeLongestEdge$(imageFilePath, imageName, updatedLongestEdge).pipe(
    mergeMap((imageFilePath) =>
      findImageDimensionPixelsWithFileName$(imageFilePath)
    )
  );

const isValidDimensionPixels = (
  pixels: MediaDimensionPixels,
  minWidth: number,
  minHeight: number
) => pixels.width >= minWidth && pixels.height >= minHeight;

export const resizeImageTile$ = (
  imageFilePath: string,
  imageName: string,
  imageDimensionTileConfig: ImageDimensionTileConfig
): Observable<string> => {
  const logContext = 'resizeImageTile$';

  const { minWidth, minHeight, longestEdge } = imageDimensionTileConfig;

  let updatedLongestEdge = longestEdge;
  return resizeAndFindDimensions$(
    imageFilePath,
    imageName,
    updatedLongestEdge
  ).pipe(
    expand(({ pixels, imageFilePath }) => {
      updatedLongestEdge += 10;
      return isValidDimensionPixels(pixels, minWidth, minHeight)
        ? EMPTY
        : resizeAndFindDimensions$(
            imageFilePath,
            imageName,
            updatedLongestEdge
          );
    }),
    filter(({ pixels }) => isValidDimensionPixels(pixels, minWidth, minHeight)),
    map(({ imageFilePath }) => imageFilePath),
    tap(() => Logger.log(`Returning resized image tile`, logContext))
  );
};
