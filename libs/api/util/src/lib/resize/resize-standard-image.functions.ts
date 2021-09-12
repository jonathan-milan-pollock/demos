import sharp = require('sharp');
import { combineLatest, concatMap, from, map, Observable, of } from 'rxjs';

import { ImageDimensionStandardConfig } from '@dark-rush-photography/shared/types';
import { createTempFile$ } from '../file/file.functions';

export const resizeStandardImage$ = (
  fileName: string,
  filePath: string,
  standardImageResolution: ImageDimensionStandardConfig
): Observable<string> => {
  const { width, height } = standardImageResolution.pixels;
  return createTempFile$(fileName).pipe(
    concatMap((newFilePath) =>
      combineLatest([
        of(newFilePath),
        from(sharp(filePath).resize(width, height).toFile(newFilePath)),
      ])
    ),
    map(([newFilePath]) => newFilePath)
  );
};
