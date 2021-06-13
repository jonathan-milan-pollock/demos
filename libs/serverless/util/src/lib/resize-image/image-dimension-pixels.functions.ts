import { BadRequestException } from '@nestjs/common';

import sharp = require('sharp');
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ImageDimensionPixels } from '@dark-rush-photography/shared-types';

export const findImageDimensionPixels$ = (
  imageFilePath: string
): Observable<ImageDimensionPixels> =>
  from(sharp(imageFilePath).metadata()).pipe(
    map(({ width, height }) => {
      if (!width)
        throw new BadRequestException(
          `Width was not found on ${imageFilePath}`
        );
      if (!height)
        throw new BadRequestException(
          `Height was not found on ${imageFilePath}`
        );
      return { width, height } as ImageDimensionPixels;
    })
  );

export const findImageDimensionPixelsWithFileName$ = (
  imageFilePath: string
): Observable<{
  imageDimensionPixels: ImageDimensionPixels;
  imageFilePath: string;
}> =>
  from(sharp(imageFilePath).metadata()).pipe(
    map(({ width, height }) => {
      if (!width)
        throw new BadRequestException(
          `Width was not found on ${imageFilePath}`
        );
      if (!height)
        throw new BadRequestException(
          `Height was not found on ${imageFilePath}`
        );
      return {
        imageDimensionPixels: { width, height } as ImageDimensionPixels,
        imageFilePath,
      };
    })
  );
