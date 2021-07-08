import { HttpService, Logger } from '@nestjs/common';

import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { Entity } from '@dark-rush-photography/shared/types';
import { ActivityMedia, Env, EnvApi } from '@dark-rush-photography/api/types';
import { apiAuth$ } from './api-auth.functions';

export const createEntity$ = (
  env: Env,
  httpService: HttpService,
  activityMedia: ActivityMedia
): Observable<Partial<Entity>> => {
  const url = `${env.api.drpApi}/admin/v1/entities/${activityMedia.entitySlug}`;
  Logger.log(url, createEntity$.name);
  return apiAuth$(env.apiAuth, httpService).pipe(
    switchMap((accessToken) =>
      httpService.post<Partial<Entity>>(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
    ),
    map((axiosResponse) => axiosResponse.data)
  );
};

export const findAllEntities$ = (
  envApi: EnvApi,
  httpService: HttpService,
  accessToken: string,
  id: string
): Observable<Partial<Entity>[]> => {
  const url = `${envApi.drpApi}/admin/v1/entities/${id}`;
  Logger.log(url, findOneEntity$.name);
  return httpService
    .get<Partial<Entity>[]>(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'X-DRP-API-ADMIN-KEY': envApi.drpApiAdminKey,
      },
    })
    .pipe(map((axiosResponse) => axiosResponse.data));
};

export const findOneEntity$ = (
  envApi: EnvApi,
  httpService: HttpService,
  accessToken: string,
  id: string
): Observable<Partial<Entity>> => {
  const url = `${envApi.drpApi}/admin/v1/entities/${id}`;
  Logger.log(url, findOneEntity$.name);
  return httpService
    .get<Partial<Entity>>(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'X-DRP-API-ADMIN-KEY': envApi.drpApiAdminKey,
      },
    })
    .pipe(map((axiosResponse) => axiosResponse.data));
};
