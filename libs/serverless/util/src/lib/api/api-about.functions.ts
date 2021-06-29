import { HttpService, Logger } from '@nestjs/common';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { About } from '@dark-rush-photography/shared-types';
import { EnvApi } from '@dark-rush-photography/serverless/types';

export const createAbout$ = (
  envApi: EnvApi,
  httpService: HttpService,
  authToken: string,
  slug: string
): Observable<About> => {
  const url = `${envApi.drpApi}/admin/v1/about/${slug}`;
  Logger.log(url, createAbout$.name);
  return httpService
    .post<About>(url, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'X-DRP-API-ADMIN-KEY': envApi.drpApiAdminKey,
      },
    })
    .pipe(map((axiosResponse) => axiosResponse.data));
};

export const findOneAbout$ = (
  envApi: EnvApi,
  httpService: HttpService,
  authToken: string,
  id: string
): Observable<About> => {
  const url = `${envApi.drpApi}/admin/v1/about/${id}`;
  Logger.log(url, findOneAbout$.name);
  return httpService
    .get<About>(url, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'X-DRP-API-ADMIN-KEY': envApi.drpApiAdminKey,
      },
    })
    .pipe(map((axiosResponse) => axiosResponse.data));
};
