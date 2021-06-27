import { HttpService, Logger } from '@nestjs/common';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Video } from '@dark-rush-photography/shared-types';
import { EnvApi } from '@dark-rush-photography/serverless/types';

export const addVideo$ = (
  envApi: EnvApi,
  httpService: HttpService,
  authToken: string,
  entityId: string,
  name: string,
  createDate: string
): Observable<Video> => {
  const url = `${envApi.drpApi}/admin/v1/videos?entityId=${entityId}`;
  Logger.log(`Calling API ${url}`, addVideo$.name);

  return httpService
    .put<Video>(
      url,
      {
        slug: name,
        dateCreated: createDate,
      },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'X-DRP-API-ADMIN-KEY': envApi.drpApiAdminKey,
        },
      }
    )
    .pipe(map((axiosResponse) => axiosResponse.data));
};
