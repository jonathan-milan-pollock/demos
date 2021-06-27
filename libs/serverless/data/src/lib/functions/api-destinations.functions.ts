import { HttpService, Logger } from '@nestjs/common';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Destination } from '@dark-rush-photography/shared-types';
import { EnvApi } from '@dark-rush-photography/serverless/types';

export const createDestination$ = (
  envApi: EnvApi,
  httpService: HttpService,
  authToken: string,
  slug: string
): Observable<Destination> => {
  const url = `${envApi.drpApi}/admin/v1/destination/${slug}`;

  Logger.log(`Calling API ${url}`, createDestination$.name);
  return httpService
    .post<Destination>(url, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'X-DRP-API-ADMIN-KEY': envApi.drpApiAdminKey,
      },
    })
    .pipe(map((axiosResponse) => axiosResponse.data));
};

export const findOneDestination$ = (
  envApi: EnvApi,
  httpService: HttpService,
  authToken: string,
  id: string
): Observable<Destination> => {
  const url = `${envApi.drpApi}/admin/v1/destination/${id}`;

  Logger.log(`Calling API ${url}`, findOneDestination$.name);
  return httpService
    .get<Destination>(url, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'X-DRP-API-ADMIN-KEY': envApi.drpApiAdminKey,
      },
    })
    .pipe(map((axiosResponse) => axiosResponse.data));
};
