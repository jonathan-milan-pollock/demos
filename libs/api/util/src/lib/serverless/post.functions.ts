import { HttpService, Logger } from '@nestjs/common';

import { from, Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';

import { EntityType, MediaType } from '@dark-rush-photography/shared/types';
import { EnvServerless } from '@dark-rush-photography/api/types';

export const serverlessPostEntityProcess$ = (
  envServerless: EnvServerless,
  httpService: HttpService,
  entityType: EntityType,
  entityId: string
): Observable<unknown> => {
  const url = `${envServerless.url}/post-entity`;
  Logger.log(url, serverlessPostEntityProcess$.name);
  return from(
    httpService
      .post(
        url,
        {
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

export const serverlessPostMediaProcess$ = (
  envServerless: EnvServerless,
  httpService: HttpService,
  mediaType: MediaType,
  mediaId: string,
  entityType: EntityType,
  entityId: string
): Observable<unknown> => {
  const url = `${envServerless.url}/post-media`;
  Logger.log(url, serverlessPostEntityProcess$.name);
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
