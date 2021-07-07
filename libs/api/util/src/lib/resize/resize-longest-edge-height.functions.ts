import sharp = require('sharp');
import { from, Observable } from 'rxjs';
import { mapTo } from 'rxjs/operators';

export const resizeLongestEdgeHeight$ = (
  filePath: string,
  newFilePath: string,
  longestEdge: number
): Observable<string> => {
  return from(
    sharp(filePath).resize(undefined, longestEdge).toFile(newFilePath)
  ).pipe(mapTo(newFilePath));
};
