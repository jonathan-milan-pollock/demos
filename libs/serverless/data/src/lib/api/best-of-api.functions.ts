import { BadRequestException, HttpService, Logger } from '@nestjs/common';

import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { BestOf, Image } from '@dark-rush-photography/shared-types';
import { EnvApi, EnvApiAuth } from '@dark-rush-photography/shared-server/types';
import { apiAuth$ } from '@dark-rush-photography/shared-server/data';
import { addImage$ } from './images-api.functions';

export const createBestOfIfNotExists$ = (
  envApiAuth: EnvApiAuth,
  envApi: EnvApi,
  httpService: HttpService,
  slug: string
): Observable<BestOf> =>
  apiAuth$(envApiAuth, httpService).pipe(
    tap(() =>
      Logger.log(
        `Calling API ${envApi.darkRushPhotographyApi}/admin/v1/best-of/${slug}`,
        createBestOfIfNotExists$.name
      )
    ),
    switchMap((authToken) =>
      httpService.post<BestOf>(
        `${envApi.darkRushPhotographyApi}/admin/v1/best-of/${slug}`,
        {
          images: [],
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            DRP_ADMIN_KEY: envApi.darkRushPhotographyAdminKey,
          },
        }
      )
    ),
    map((axiosResponse) => axiosResponse.data)
  );

export const addBestOfImage$ = (
  envApiAuth: EnvApiAuth,
  envApi: EnvApi,
  httpService: HttpService,
  slug: string,
  imageName: string,
  createDate: string
): Observable<Image> => {
  Logger.log(
    `Calling API ${envApi.darkRushPhotographyApi}/v1/best-of/${slug}`,
    addBestOfImage$.name
  );
  return httpService
    .get<BestOf>(`${envApi.darkRushPhotographyApi}/v1/best-of/${slug}`)
    .pipe(
      switchMap((axiosResponse) => {
        if (!axiosResponse.data.id)
          throw new BadRequestException('Could not get best of');

        return addImage$(
          envApiAuth,
          envApi,
          httpService,
          axiosResponse.data.id,
          imageName,
          createDate
        );
      })
    );
};
