import { BadRequestException } from '@nestjs/common';

import sharp = require('sharp');
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { MediaDimensionPixels } from '@dark-rush-photography/shared/types';

export const findImageResolution$ = (
  filePath: string
): Observable<MediaDimensionPixels> =>
  from(sharp(filePath).metadata()).pipe(
    map(({ width, height }) => {
      if (!width)
        throw new BadRequestException(`Width was not found on ${filePath}`);
      if (!height)
        throw new BadRequestException(`Height was not found on ${filePath}`);
      return { width, height } as MediaDimensionPixels;
    })
  );

export const findImageResolutionWithFileName$ = (
  filePath: string
): Observable<{
  pixels: MediaDimensionPixels;
  filePath: string;
}> =>
  from(sharp(filePath).metadata()).pipe(
    map(({ width, height }) => {
      if (!width)
        throw new BadRequestException(`Width was not found on ${filePath}`);
      if (!height)
        throw new BadRequestException(`Height was not found on ${filePath}`);
      return {
        pixels: { width, height } as MediaDimensionPixels,
        filePath,
      };
    })
  );
