import { Logger } from '@nestjs/common';

import { from, Observable } from 'rxjs';
import { map, switchMap, switchMapTo, tap } from 'rxjs/operators';

import { ExifCreateDate } from '@dark-rush-photography/serverless/types';

export const readCreateDateExif$ = (
  imageFilePath: string
): Observable<string> => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const exiftool = require('node-exiftool');
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const exiftoolBin = require('dist-exiftool');
  const exifTool = new exiftool.ExiftoolProcess(exiftoolBin);

  return from(exifTool.open()).pipe(
    switchMapTo(
      from<Observable<ExifCreateDate>>(
        exifTool.readMetadata(imageFilePath, ['-File:all'])
      )
    ),
    tap(() => exifTool.close()),
    map((value) => value.data[0].CreateDate)
  );
};
