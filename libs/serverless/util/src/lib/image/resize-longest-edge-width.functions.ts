import sharp = require('sharp');

import { from, Observable } from 'rxjs';
import { mapTo } from 'rxjs/operators';

export const resizeLongestEdgeWidth$ = (
  imageFilePath: string,
  newImageFilePath: string,
  longestEdge: number
): Observable<string> => {
  return from(
    sharp(imageFilePath).resize(longestEdge, undefined).toFile(newImageFilePath)
  ).pipe(mapTo(newImageFilePath));
};
