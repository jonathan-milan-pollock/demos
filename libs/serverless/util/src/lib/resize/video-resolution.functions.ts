import { Observable, of } from 'rxjs';

import { MediaResolution } from '@dark-rush-photography/shared/types';

export const findVideoResolution$ = (
  filePath: string
): Observable<MediaResolution> =>
  of({
    width: 0,
    height: 0,
  });
