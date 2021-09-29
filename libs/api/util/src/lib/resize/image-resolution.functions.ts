import { BadRequestException } from '@nestjs/common';

import sharp = require('sharp');
import { from, map, Observable } from 'rxjs';

import { Resolution } from '@dark-rush-photography/shared/types';

export const findImageResolution$ = (
  filePath: string
): Observable<Resolution> =>
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
  resolution: Resolution;
  filePath: string;
}> =>
  from(sharp(filePath).metadata()).pipe(
    map(({ width, height }) => {
      if (!width)
        throw new BadRequestException(`Width was not found on ${filePath}`);
      if (!height)
        throw new BadRequestException(`Height was not found on ${filePath}`);
      return {
        resolution: { width, height },
        filePath,
      };
    })
  );
