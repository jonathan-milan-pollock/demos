import { HttpService, Logger } from '@nestjs/common';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { SocialMedia } from '@dark-rush-photography/shared-types';
import { EnvApi } from '@dark-rush-photography/serverless/types';

export const createSocialMedia$ = (
  envApi: EnvApi,
  httpService: HttpService,
  authToken: string,
  group: string,
  slug: string
): Observable<SocialMedia> => {
  const url = `${envApi.drpApi}/admin/v1/social-media`;
  Logger.log(url, createSocialMedia$.name);
  return httpService
    .post<SocialMedia>(
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

export const findOneSocialMedia$ = (
  envApi: EnvApi,
  httpService: HttpService,
  authToken: string,
  id: string
): Observable<SocialMedia> => {
  const url = `${envApi.drpApi}/admin/v1/social-media/${id}`;
  Logger.log(url, findOneSocialMedia$.name);
  return httpService
    .get<SocialMedia>(url, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'X-DRP-API-ADMIN-KEY': envApi.drpApiAdminKey,
      },
    })
    .pipe(map((axiosResponse) => axiosResponse.data));
};
