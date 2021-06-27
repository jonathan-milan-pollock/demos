import { HttpService, Logger } from '@nestjs/common';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Event } from '@dark-rush-photography/shared-types';
import { EnvApi } from '@dark-rush-photography/serverless/types';

export const createEvent$ = (
  envApi: EnvApi,
  httpService: HttpService,
  authToken: string,
  group: string,
  slug: string
): Observable<Event> => {
  const url = `${envApi.drpApi}/admin/v1/events`;

  Logger.log(`Calling API ${url}`, createEvent$.name);
  return httpService
    .post<Event>(
      url,
      {
        group,
        slug,
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

export const findOneEvent$ = (
  envApi: EnvApi,
  httpService: HttpService,
  authToken: string,
  id: string
): Observable<Event> => {
  const url = `${envApi.drpApi}/admin/v1/events/${id}`;

  Logger.log(`Calling API ${url}`, findOneEvent$.name);
  return httpService
    .get<Event>(url, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'X-DRP-API-ADMIN-KEY': envApi.drpApiAdminKey,
      },
    })
    .pipe(map((axiosResponse) => axiosResponse.data));
};
