import sharp = require('sharp');
import { combineLatest, concatMap, from, map, Observable, of } from 'rxjs';

import { ImageDimensionStandard } from '@dark-rush-photography/shared/types';
import { createTempFile$ } from '../file/file.functions';
import { getImageFileName } from '../images/image-file-name.functions';

export const resizeStandardImage$ = (
  slug: string,
  filePath: string,
  standardImageResolution: ImageDimensionStandard
): Observable<string> => {
  const { width, height } = standardImageResolution.dimension;
  return createTempFile$(getImageFileName(slug)).pipe(
    concatMap((newFilePath) =>
      combineLatest([
        of(newFilePath),
        from(
          sharp(filePath)
            .withMetadata()
            .resize(width, height)
            .toFile(newFilePath)
        ),
      ])
    ),
    map(([newFilePath]) => newFilePath)
  );
};
