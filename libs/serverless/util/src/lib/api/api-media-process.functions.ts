import { HttpService, Logger } from '@nestjs/common';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { EntityType, MediaProcess } from '@dark-rush-photography/shared-types';
import { EnvApi } from '@dark-rush-photography/serverless/types';
import { getMediaProcessType } from '@dark-rush-photography/shared-server/util';

export const createMediaProcess$ = (
  envApi: EnvApi,
  httpService: HttpService,
  authToken: string,
  entityType: EntityType,
  slug: string
): Observable<MediaProcess> => {
  const mediaProcessType = getMediaProcessType(entityType);
  const url = `${envApi.drpApi}/admin/v1/media-process/${mediaProcessType}`;
  Logger.log(url, createMediaProcess$.name);
  return httpService
    .post<MediaProcess>(
      url,
      { slug },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'X-DRP-API-ADMIN-KEY': envApi.drpApiAdminKey,
        },
      }
    )
    .pipe(map((axiosResponse) => axiosResponse.data));
};

export const findOneMediaProcess$ = (
  envApi: EnvApi,
  httpService: HttpService,
  authToken: string,
  entityType: EntityType,
  id: string
): Observable<MediaProcess> => {
  const mediaProcessType = getMediaProcessType(entityType);
  const url = `${envApi.drpApi}/admin/v1/media-process/${mediaProcessType}/${id}`;
  Logger.log(url, findOneMediaProcess$.name);
  return httpService
    .get<MediaProcess>(url, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'X-DRP-API-ADMIN-KEY': envApi.drpApiAdminKey,
      },
    })
    .pipe(map((axiosResponse) => axiosResponse.data));
};
