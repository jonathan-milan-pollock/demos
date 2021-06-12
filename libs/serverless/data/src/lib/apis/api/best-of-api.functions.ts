import { BadRequestException, HttpService, Logger } from '@nestjs/common';

import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import {
  BestOf,
  BestOfType,
  Image,
  ImageDimensionType,
} from '@dark-rush-photography/shared-types';
import { Env } from '@dark-rush-photography/serverless/types';
import { apiAuth$ } from './auth-api.functions';
import { addImage$ } from './images-api.functions';

const logContextCreateEntity = 'createBestOfIfNotExists$';
export const createBestOfIfNotExists$ = (
  env: Env,
  httpService: HttpService,
  slug: string
): Observable<BestOf> =>
  apiAuth$(env, httpService).pipe(
    tap(() =>
      Logger.log(
        `Calling API ${env.darkRushPhotographyApi}/admin/v1/best-of/${slug}`,
        logContextCreateEntity
      )
    ),
    switchMap((authToken) =>
      httpService.post<BestOf>(
        `${env.darkRushPhotographyApi}/admin/v1/best-of/${slug}`,
        {
          images: [],
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            DRP_ADMIN_KEY: env.darkRushPhotographyAdminKey,
          },
        }
      )
    ),
    map((axiosResponse) => axiosResponse.data)
  );

const logContextAddImage = 'addBestOfImage$';
export const addBestOfImage$ = (
  env: Env,
  httpService: HttpService,
  slug: string,
  imageName: string,
  createDate: string
): Observable<Image> => {
  Logger.log(
    `Calling API ${env.darkRushPhotographyApi}/v1/best-of/${slug}`,
    logContextAddImage
  );
  return httpService
    .get<BestOf>(`${env.darkRushPhotographyApi}/v1/best-of/${slug}`)
    .pipe(
      switchMap((axiosResponse) => {
        if (!axiosResponse.data.id)
          throw new BadRequestException('Could not get best of');

        return addImage$(
          env,
          httpService,
          axiosResponse.data.id,
          imageName,
          createDate
        );
      })
    );
};
