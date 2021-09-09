import sharp = require('sharp');
import { concatMap, from, map, Observable } from 'rxjs';

import { findImageResolution$ } from './image-resolution.functions';
import { createTempFile$ } from '../file/file.functions';

export const resizeLongestEdgeImage$ = (
  fileName: string,
  filePath: string,
  longestEdge: number
): Observable<string> =>
  findImageResolution$(filePath).pipe(
    concatMap((pixels) => {
      return pixels.width > pixels.height
        ? createTempFile$(fileName).pipe(
            concatMap((newFilePath) =>
              resizeLongestEdgeImageWidth$(filePath, newFilePath, longestEdge)
            )
          )
        : createTempFile$(fileName).pipe(
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
    sharp(filePath).resize(longestEdge, undefined).toFile(newFilePath)
  ).pipe(map(() => newFilePath));
};

export const resizeLongestEdgeImageHeight$ = (
  filePath: string,
  newFilePath: string,
  longestEdge: number
): Observable<string> => {
  return from(
    sharp(filePath).resize(undefined, longestEdge).toFile(newFilePath)
  ).pipe(map(() => newFilePath));
};
