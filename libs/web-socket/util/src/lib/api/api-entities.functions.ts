import { HttpService, Logger } from '@nestjs/common';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Entity } from '@dark-rush-photography/shared/types';
import { Env } from '@dark-rush-photography/web-socket/types';

export const findAllEntities$ = (
  env: Env,
  httpService: HttpService,
  accessToken: string,
  id: string
): Observable<Partial<Entity>[]> => {
  const url = `${env.drpApiUrl}/admin/v1/entities/${id}`;
  Logger.log(url, findOneEntity$.name);
  return httpService
    .get<Partial<Entity>[]>(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .pipe(map((axiosResponse) => axiosResponse.data));
};

export const findOneEntity$ = (
  env: Env,
  httpService: HttpService,
  accessToken: string,
  id: string
): Observable<Partial<Entity>> => {
  const url = `${env.drpApiUrl}/admin/v1/entities/${id}`;
  Logger.log(url, findOneEntity$.name);
  return httpService
    .get<Partial<Entity>>(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .pipe(map((axiosResponse) => axiosResponse.data));
};
