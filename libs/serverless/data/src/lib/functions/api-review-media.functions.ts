import { HttpService, Logger } from '@nestjs/common';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ReviewMedia } from '@dark-rush-photography/shared-types';
import { EnvApi } from '@dark-rush-photography/serverless/types';

export const createReviewMedia$ = (
  envApi: EnvApi,
  httpService: HttpService,
  authToken: string
): Observable<ReviewMedia> => {
  const url = `${envApi.drpApi}/admin/v1/review-media`;

  Logger.log(`Calling API ${url}`, createReviewMedia$.name);
  return httpService
    .post<ReviewMedia>(url, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'X-DRP-API-ADMIN-KEY': envApi.drpApiAdminKey,
      },
    })
    .pipe(map((axiosResponse) => axiosResponse.data));
};

export const findOneReviewMedia$ = (
  envApi: EnvApi,
  httpService: HttpService,
  authToken: string,
  id: string
): Observable<ReviewMedia> => {
  const url = `${envApi.drpApi}/admin/v1/review-media/${id}`;

  Logger.log(`Calling API ${url}`, findOneReviewMedia$.name);
  return httpService
    .get<ReviewMedia>(url, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'X-DRP-API-ADMIN-KEY': envApi.drpApiAdminKey,
      },
    })
    .pipe(map((axiosResponse) => axiosResponse.data));
};
