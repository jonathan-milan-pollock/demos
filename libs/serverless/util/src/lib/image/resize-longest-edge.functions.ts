import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { createTempFile$ } from '../file/file.functions';
import { findImageDimensionPixels$ } from './image-dimension-pixels.functions';
import { resizeLongestEdgeWidth$ } from './resize-longest-edge-width.functions';
import { resizeLongestEdgeHeight$ } from './resize-longest-edge-height.functions';

export const resizeLongestEdge$ = (
  fileName: string,
  filePath: string,
  longestEdge: number
): Observable<string> =>
  findImageDimensionPixels$(filePath).pipe(
    switchMap((pixels) => {
      return pixels.width > pixels.height
        ? createTempFile$(fileName).pipe(
            switchMap((newFilePath) =>
              resizeLongestEdgeWidth$(filePath, newFilePath, longestEdge)
            )
          )
        : createTempFile$(fileName).pipe(
            switchMap((newFilePath) =>
              resizeLongestEdgeHeight$(filePath, newFilePath, longestEdge)
            )
          );
    })
  );
