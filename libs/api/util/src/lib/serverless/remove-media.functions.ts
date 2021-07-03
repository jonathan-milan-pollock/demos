import { HttpService, Logger } from '@nestjs/common';

import { from, Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';

import { EntityType, MediaType } from '@dark-rush-photography/shared/types';
import { EnvServerless } from '@dark-rush-photography/api/types';

export const serverlessRemoveMediaProcess$ = (
  envServerless: EnvServerless,
  httpService: HttpService,
  mediaType: MediaType,
  mediaId: string,
  entityType: EntityType,
  entityId: string
): Observable<unknown> => {
  const url = `${envServerless.url}/remove-media`;
  Logger.log(url, serverlessRemoveMediaProcess$.name);
  return from(
    httpService
      .post(
        url,
        {
          mediaType,
          mediaId,
          entityType,
          entityId,
        },
        {
          headers: {
            'x-functions-key': envServerless.functionsKey,
          },
        }
      )
      .pipe(map((axiosResponse) => axiosResponse.data))
  );
};
