import sharp = require('sharp');
import { concatMap, from, map, Observable } from 'rxjs';

import { findDimension$ } from './image-dimension.functions';
import { createTempFile$ } from '../file/file.functions';
import { getImageFileName } from '../..';

export const resizeLongestEdgeImage$ = (
  pathname: string,
  filePath: string,
  longestEdge: number
): Observable<string> =>
  findDimension$(filePath).pipe(
    concatMap((resolution) => {
      return resolution.width > resolution.height
        ? createTempFile$(getImageFileName(pathname)).pipe(
            concatMap((newFilePath) =>
              resizeLongestEdgeImageWidth$(filePath, newFilePath, longestEdge)
            )
          )
        : createTempFile$(getImageFileName(pathname)).pipe(
            concatMap((newFilePath) =>
              resizeLongestEdgeImageHeight$(filePath, newFilePath, longestEdge)
            )
          );
    })
  );

export const resizeLongestEdgeImageWidth$ = (
  filePath: string,
  newFilePath: string,
  longestEdge: number
): Observable<string> => {
  return from(
    sharp(filePath)
      .withMetadata()
      .resize(longestEdge, undefined)
      .toFile(newFilePath)
  ).pipe(map(() => newFilePath));
};

export const resizeLongestEdgeImageHeight$ = (
  filePath: string,
  newFilePath: string,
  longestEdge: number
): Observable<string> => {
  return from(
    sharp(filePath)
      .withMetadata()
      .resize(undefined, longestEdge)
      .toFile(newFilePath)
  ).pipe(map(() => newFilePath));
};
