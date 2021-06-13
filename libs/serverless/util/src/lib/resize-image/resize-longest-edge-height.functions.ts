import sharp = require('sharp');

import { from, Observable } from 'rxjs';
import { mapTo } from 'rxjs/operators';

export const resizeLongestEdgeHeight$ = (
  imageFilePath: string,
  newImageFilePath: string,
  longestEdge: number
): Observable<string> => {
  return from(
    sharp(imageFilePath).resize(undefined, longestEdge).toFile(newImageFilePath)
  ).pipe(mapTo(newImageFilePath));
};
