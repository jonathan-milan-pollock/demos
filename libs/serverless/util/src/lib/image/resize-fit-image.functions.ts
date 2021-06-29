import sharp = require('sharp');
import { from, Observable } from 'rxjs';
import { mapTo, switchMap } from 'rxjs/operators';

import { MediaDimensionPixels } from '@dark-rush-photography/shared-types';
import { ImageDimensionStandardConfig } from '@dark-rush-photography/serverless/types';
import { createTempFile$ } from '../file/file.functions';

export const resizeFitImageDimensionsWithFile = (
  imageFilePath: string,
  newImageFilePath: string,
  pixels: MediaDimensionPixels
): Observable<string> => {
  return from(
    sharp(imageFilePath)
      .resize(pixels.width, pixels.height, {
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
