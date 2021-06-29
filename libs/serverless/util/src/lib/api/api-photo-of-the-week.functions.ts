import { HttpService, Logger } from '@nestjs/common';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { PhotoOfTheWeek } from '@dark-rush-photography/shared-types';
import { EnvApi } from '@dark-rush-photography/serverless/types';

export const createPhotoOfTheWeek$ = (
  envApi: EnvApi,
  httpService: HttpService,
  authToken: string,
  group: string,
  slug: string
): Observable<PhotoOfTheWeek> => {
  const url = `${envApi.drpApi}/admin/v1/photo-of-the-week`;
  Logger.log(url, createPhotoOfTheWeek$.name);
  return httpService
    .post<PhotoOfTheWeek>(
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

export const findOnePhotoOfTheWeek$ = (
  envApi: EnvApi,
  httpService: HttpService,
  authToken: string,
  id: string
): Observable<PhotoOfTheWeek> => {
  const url = `${envApi.drpApi}/admin/v1/photo-of-the-week/${id}`;
  Logger.log(url, findOnePhotoOfTheWeek$.name);
  return httpService
    .get<PhotoOfTheWeek>(url, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'X-DRP-API-ADMIN-KEY': envApi.drpApiAdminKey,
      },
    })
    .pipe(map((axiosResponse) => axiosResponse.data));
};
