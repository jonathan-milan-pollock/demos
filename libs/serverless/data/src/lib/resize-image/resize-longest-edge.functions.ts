import sharp = require('sharp');

import { forkJoin, from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { createTempFile } from '../file/file.functions';
import { getImageDimension } from './image-dimension.functions';

const resizeWidthAsLongestEdge$ = (
  longestEdge: number,
  imageFilePath: string,
  tempOutputFilePath: string
) =>
  from(
    sharp(imageFilePath)
      .resize(longestEdge, undefined)
      .toFile(tempOutputFilePath)
  ).pipe(map(() => tempOutputFilePath));

const resizeHeightAsLongestEdge$ = (
  longestEdge: number,
  imageFilePath: string,
  tempOutputFilePath: string
) =>
  from(
    sharp(imageFilePath)
      .resize(undefined, longestEdge)
      .toFile(tempOutputFilePath)
  ).pipe(map(() => tempOutputFilePath));

export const resizeLongestEdge = (
  imageFilePath: string,
  imageName: string,
  longestEdge: number
): Promise<string> => {
  return forkJoin([
    createTempFile(imageName),
    from(getImageDimension(imageFilePath)),
  ])
    .pipe(
      switchMap(([tempOutputFilePath, { width, height }]) => {
        console.log('imageFilePath' + imageFilePath);
        console.log('tempOutputFilePath' + tempOutputFilePath);
        return width > height
          ? resizeWidthAsLongestEdge$(
              longestEdge,
              imageFilePath,
              tempOutputFilePath
            )
          : resizeHeightAsLongestEdge$(
              longestEdge,
              imageFilePath,
              tempOutputFilePath
            );
      }),
      map((tempOutputFilePath) => tempOutputFilePath)
    )
    .toPromise();
};
