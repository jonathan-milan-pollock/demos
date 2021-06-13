import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { createTempFile$ } from '../file/file.functions';
import { findImageDimensionPixels$ } from './image-dimension-pixels.functions';
import { resizeLongestEdgeWidth$ } from './resize-longest-edge-width.functions';
import { resizeLongestEdgeHeight$ } from './resize-longest-edge-height.functions';

export const resizeLongestEdge$ = (
  imageFilePath: string,
  imageName: string,
  longestEdge: number
): Observable<string> =>
  findImageDimensionPixels$(imageFilePath).pipe(
    switchMap((imageDimensionPixels) => {
      return imageDimensionPixels.width > imageDimensionPixels.height
        ? createTempFile$(imageName).pipe(
            switchMap((newImageFilePath) =>
              resizeLongestEdgeWidth$(
                imageFilePath,
                newImageFilePath,
                longestEdge
              )
            )
          )
        : createTempFile$(imageName).pipe(
            switchMap((newImageFilePath) =>
              resizeLongestEdgeHeight$(
                imageFilePath,
                newImageFilePath,
                longestEdge
              )
            )
          );
    })
  );
