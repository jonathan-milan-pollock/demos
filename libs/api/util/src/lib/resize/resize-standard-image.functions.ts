import sharp = require('sharp');
import { combineLatest, concatMap, from, map, Observable, of } from 'rxjs';

import { StandardImageResolution } from '@dark-rush-photography/shared/types';
import { createTempFile$ } from '@dark-rush-photography/shared-server/util';

export const resizeStandardImage$ = (
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
