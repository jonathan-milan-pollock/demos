import { BadRequestException } from '@nestjs/common';

import sharp = require('sharp');
import { from, map, Observable } from 'rxjs';

import { MediaResolution } from '@dark-rush-photography/shared/types';

export const findImageResolution$ = (
  filePath: string
): Observable<MediaResolution> =>
  from(sharp(filePath).metadata()).pipe(
    map(({ width, height }) => {
      if (!width)
        throw new BadRequestException(`Width was not found on ${filePath}`);
      if (!height)
        throw new BadRequestException(`Height was not found on ${filePath}`);
      return { width, height };
    })
  );

export const findImageResolutionWithFileName$ = (
  filePath: string
): Observable<{
  pixels: MediaResolution;
  filePath: string;
}> =>
  from(sharp(filePath).metadata()).pipe(
    map(({ width, height }) => {
      if (!width)
        throw new BadRequestException(`Width was not found on ${filePath}`);
      if (!height)
        throw new BadRequestException(`Height was not found on ${filePath}`);
      return {
        pixels: { width, height },
        filePath,
      };
    })
  );
