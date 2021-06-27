import { HttpService, Logger } from '@nestjs/common';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Favorites } from '@dark-rush-photography/shared-types';
import { EnvApi } from '@dark-rush-photography/serverless/types';

export const createFavorites$ = (
  envApi: EnvApi,
  httpService: HttpService,
  authToken: string
): Observable<Favorites> => {
  const url = `${envApi.drpApi}/admin/v1/favorites`;

  Logger.log(`Calling API ${url}`, createFavorites$.name);
  return httpService
    .post<Favorites>(url, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'X-DRP-API-ADMIN-KEY': envApi.drpApiAdminKey,
      },
    })
    .pipe(map((axiosResponse) => axiosResponse.data));
};

export const findOneFavorites$ = (
  envApi: EnvApi,
  httpService: HttpService,
  authToken: string
): Observable<Favorites> => {
  const url = `${envApi.drpApi}/admin/v1/favorites`;

  Logger.log(`Calling API ${url}`, findOneFavorites$.name);
  return httpService
    .get<Favorites>(url, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'X-DRP-API-ADMIN-KEY': envApi.drpApiAdminKey,
      },
    })
    .pipe(map((axiosResponse) => axiosResponse.data));
};
