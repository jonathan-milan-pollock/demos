import { Logger } from '@nestjs/common';

import { EMPTY, EmptyError, Observable, of } from 'rxjs';
import {
  tap,
  expand,
  mergeMap,
  isEmpty,
  switchMap,
  map,
  takeLast,
  concatMap,
  take,
  filter,
} from 'rxjs/operators';

import { ImageDimensionTileConfig } from '@dark-rush-photography/serverless/types';
import { findImageDimensionPixelsWithFileName$ } from './image-dimension-pixels.functions';
import { resizeLongestEdge$ } from './resize-longest-edge.functions';
import { ImageDimensionPixels } from '@dark-rush-photography/shared-types';

export const resizeAndFindDimensions$ = (
  imageFilePath: string,
  imageName: string,
  updatedLongestEdge: number
): Observable<{
  imageDimensionPixels: ImageDimensionPixels;
  imageFilePath: string;
}> =>
  resizeLongestEdge$(imageFilePath, imageName, updatedLongestEdge).pipe(
    mergeMap((imageFilePath) =>
      findImageDimensionPixelsWithFileName$(imageFilePath)
    )
  );

const isValidDimensionPixels = (
  imageDimensionPixels: ImageDimensionPixels,
  minWidth: number,
  minHeight: number
) =>
  imageDimensionPixels.width >= minWidth &&
  imageDimensionPixels.height >= minHeight;

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
    expand(({ imageDimensionPixels, imageFilePath }) => {
      updatedLongestEdge += 10;
      return isValidDimensionPixels(imageDimensionPixels, minWidth, minHeight)
        ? EMPTY
        : resizeAndFindDimensions$(
            imageFilePath,
            imageName,
            updatedLongestEdge
          );
    }),
    filter(({ imageDimensionPixels }) =>
      isValidDimensionPixels(imageDimensionPixels, minWidth, minHeight)
    ),
    map(({ imageFilePath }) => imageFilePath),
    tap(() => Logger.log(`Returning resized image tile`, logContext))
  );
};
