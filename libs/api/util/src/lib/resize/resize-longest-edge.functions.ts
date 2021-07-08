import { Observable } from 'rxjs';
import { concatMap } from 'rxjs/operators';

import { createTempFile$ } from '@dark-rush-photography/shared-server/util';
import { findImageResolution$ } from './image-dimension-pixels.functions';
import { resizeLongestEdgeWidth$ } from './resize-longest-edge-width.functions';
import { resizeLongestEdgeHeight$ } from './resize-longest-edge-height.functions';

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
              resizeLongestEdgeWidth$(filePath, newFilePath, longestEdge)
            )
          )
        : createTempFile$(fileName).pipe(
            concatMap((newFilePath) =>
              resizeLongestEdgeHeight$(filePath, newFilePath, longestEdge)
            )
          );
    })
  );
