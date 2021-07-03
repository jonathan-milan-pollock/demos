import sharp = require('sharp');
import { from, Observable } from 'rxjs';
import { mapTo } from 'rxjs/operators';

export const resizeLongestEdgeWidth$ = (
  filePath: string,
  newFilePath: string,
  longestEdge: number
): Observable<string> => {
  return from(
    sharp(filePath).resize(longestEdge, undefined).toFile(newFilePath)
  ).pipe(mapTo(newFilePath));
};
