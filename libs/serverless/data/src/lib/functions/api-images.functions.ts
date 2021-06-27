import { HttpService, Logger } from '@nestjs/common';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Image } from '@dark-rush-photography/shared-types';
import { EnvApi } from '@dark-rush-photography/serverless/types';

export const addImage$ = (
  envApi: EnvApi,
  httpService: HttpService,
  authToken: string,
  entityId: string,
  name: string,
  createDate: string
): Observable<Image> => {
  const url = `${envApi.drpApi}/admin/v1/images?entityId=${entityId}`;
  Logger.log(`Calling API ${url}`, addImage$.name);

  return httpService
    .put<Image>(
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
