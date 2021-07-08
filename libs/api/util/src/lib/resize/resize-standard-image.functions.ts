import sharp = require('sharp');
import { combineLatest, from, Observable, of } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';

import { StandardImageResolution } from '@dark-rush-photography/api/types';
import { createTempFile$ } from '@dark-rush-photography/shared-server/util';

export const resizeStandardImageDimensions$ = (
  fileName: string,
  filePath: string,
  standardImageResolution: StandardImageResolution
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
