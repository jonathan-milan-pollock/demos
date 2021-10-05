import sharp = require('sharp');
import { combineLatest, concatMap, from, map, Observable, of } from 'rxjs';

import {
  ImageDimensionStandard,
  RESIZE_EXACT_FIT_BLUE_BACKGROUND_COLOR,
  RESIZE_EXACT_FIT_GREEN_BACKGROUND_COLOR,
  RESIZE_EXACT_FIT_RED_BACKGROUND_COLOR,
} from '@dark-rush-photography/shared/types';
import { createTempFile$ } from '../file/file.functions';

export const resizeExactFitImage$ = (
  fileName: string,
  filePath: string,
  imageDimensionStandard: ImageDimensionStandard
): Observable<string> => {
  const { width, height } = imageDimensionStandard.resolution;
  return createTempFile$(fileName).pipe(
    concatMap((newFilePath) =>
      combineLatest([
        of(newFilePath),
        from(
          sharp(filePath)
            .resize(width, height, {
              kernel: sharp.kernel.nearest,
              fit: 'contain',
              background: {
                r: RESIZE_EXACT_FIT_RED_BACKGROUND_COLOR,
                g: RESIZE_EXACT_FIT_GREEN_BACKGROUND_COLOR,
                b: RESIZE_EXACT_FIT_BLUE_BACKGROUND_COLOR,
              },
            })
            .toFile(newFilePath)
        ),
      ])
    ),
    map(([newFilePath]) => newFilePath)
  );
};
