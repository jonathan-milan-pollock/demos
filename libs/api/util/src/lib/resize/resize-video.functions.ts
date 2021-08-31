import { Observable, of } from 'rxjs';

import { VideoResolution } from '@dark-rush-photography/shared/types';

export const resizeVideo$ = (
  fileName: string,
  filePath: string,
  videoResolution: VideoResolution
): Observable<string> => {
  return of(filePath);
};
