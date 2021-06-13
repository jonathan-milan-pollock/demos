import sharp = require('sharp');
import { from, Observable } from 'rxjs';
import { mapTo, switchMap } from 'rxjs/operators';

import { ImageDimensionPixels } from '@dark-rush-photography/shared-types';
import { ImageDimensionStandardConfig } from '@dark-rush-photography/serverless/types';
import { createTempFile$ } from '../file/file.functions';

export const resizeFitImageDimensionsWithFile = (
  imageFilePath: string,
  newImageFilePath: string,
  imageDimensionPixels: ImageDimensionPixels
): Observable<string> => {
  return from(
    sharp(imageFilePath)
      .resize(imageDimensionPixels.width, imageDimensionPixels.height, {
        kernel: sharp.kernel.nearest,
        fit: 'contain',
        //#1E1E1E
        background: { r: 255, g: 255, b: 255 },
      })
      .toFile(newImageFilePath)
  ).pipe(mapTo(newImageFilePath));
};

export const resizeFitImageDimensions = (
  imageFilePath: string,
  imageName: string,
  imageDimensionStandardConfig: ImageDimensionStandardConfig
): Observable<string> => {
  const { width, height } = imageDimensionStandardConfig;
  return createTempFile$(imageName).pipe(
    switchMap((newImageFilePath) =>
      resizeFitImageDimensionsWithFile(imageFilePath, newImageFilePath, {
        width,
        height,
      })
    )
  );
};
