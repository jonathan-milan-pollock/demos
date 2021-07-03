import { HttpService, Logger } from '@nestjs/common';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Video } from '@dark-rush-photography/shared/types';
import { EnvApi } from '@dark-rush-photography/serverless/types';

export const addVideo$ = (
  envApi: EnvApi,
  httpService: HttpService,
  accessToken: string,
  entityId: string,
  fileName: string,
  createDate: string
): Observable<Video> => {
  const url = `${envApi.drpApi}/admin/v1/videos?entityId=${entityId}`;
  Logger.log(url, addVideo$.name);
  return httpService
    .put<Video>(
      url,
      {
        fileName,
        dateCreated: createDate,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'X-DRP-API-ADMIN-KEY': envApi.drpApiAdminKey,
        },
      }
    )
    .pipe(map((axiosResponse) => axiosResponse.data));
};
