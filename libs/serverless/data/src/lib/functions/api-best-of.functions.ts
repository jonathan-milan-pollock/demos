import { HttpService, Logger } from '@nestjs/common';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BestOf, EntityType } from '@dark-rush-photography/shared-types';
import { EnvApi } from '@dark-rush-photography/serverless/types';
import { getBestOfType } from './best-of-type.functions';

export const createBestOf$ = (
  envApi: EnvApi,
  httpService: HttpService,
  authToken: string,
  entityType: EntityType
): Observable<BestOf> => {
  const bestOfType = getBestOfType(entityType);
  const url = `${envApi.drpApi}/admin/v1/best-of/${bestOfType}`;

  Logger.log(`Calling API ${url}`, createBestOf$.name);
  return httpService
    .post<BestOf>(url, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'X-DRP-API-ADMIN-KEY': envApi.drpApiAdminKey,
      },
    })
    .pipe(map((axiosResponse) => axiosResponse.data));
};

export const findOneBestOf$ = (
  envApi: EnvApi,
  httpService: HttpService,
  authToken: string,
  entityType: EntityType
): Observable<BestOf> => {
  const bestOfType = getBestOfType(entityType);
  const url = `${envApi.drpApi}/admin/v1/best-of/${bestOfType}`;

  Logger.log(`Calling API ${url}`, findOneBestOf$.name);
  return httpService
    .get<BestOf>(url, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'X-DRP-API-ADMIN-KEY': envApi.drpApiAdminKey,
      },
    })
    .pipe(map((axiosResponse) => axiosResponse.data));
};
