import { BadRequestException } from '@nestjs/common';

import sharp = require('sharp');
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { MediaDimensionPixels } from '@dark-rush-photography/shared-types';

export const findImageDimensionPixels$ = (
  imageFilePath: string
): Observable<MediaDimensionPixels> =>
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
      return { width, height } as MediaDimensionPixels;
    })
  );

export const findImageDimensionPixelsWithFileName$ = (
  imageFilePath: string
): Observable<{
  pixels: MediaDimensionPixels;
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
        pixels: { width, height } as MediaDimensionPixels,
        imageFilePath,
      };
    })
  );
