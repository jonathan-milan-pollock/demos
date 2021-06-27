import { HttpService, Logger } from '@nestjs/common';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Review } from '@dark-rush-photography/shared-types';
import { EnvApi } from '@dark-rush-photography/serverless/types';

export const createReview$ = (
  envApi: EnvApi,
  httpService: HttpService,
  authToken: string,
  slug: string
): Observable<Review> => {
  const url = `${envApi.drpApi}/admin/v1/reviews/${slug}`;

  Logger.log(`Calling API ${url}`, createReview$.name);
  return httpService
    .post<Review>(url, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'X-DRP-API-ADMIN-KEY': envApi.drpApiAdminKey,
      },
    })
    .pipe(map((axiosResponse) => axiosResponse.data));
};

export const findOneReview$ = (
  envApi: EnvApi,
  httpService: HttpService,
  authToken: string,
  id: string
): Observable<Review> => {
  const url = `${envApi.drpApi}/admin/v1/reviews/${id}`;

  Logger.log(`Calling API ${url}`, findOneReview$.name);
  return httpService
    .get<Review>(url, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'X-DRP-API-ADMIN-KEY': envApi.drpApiAdminKey,
      },
    })
    .pipe(map((axiosResponse) => axiosResponse.data));
};
