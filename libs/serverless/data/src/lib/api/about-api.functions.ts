import { BadRequestException, HttpService, Logger } from '@nestjs/common';

import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import {
  About,
  Image,
  ImageDimension,
  ImageDimensionPixels,
  ImageDimensionState,
  ImageDimensionType,
} from '@dark-rush-photography/shared-types';
import { Env } from '@dark-rush-photography/serverless/types';
import { apiAuth$ } from './auth-api.functions';
import { addImage$ } from './images-api.functions';
import { addOrUpdateImageDimension$ } from './image-dimensions-api.functions';

const logContextEntity = 'createAboutIfNotExists$';
export const createAboutIfNotExists$ = (
  env: Env,
  httpService: HttpService,
  slug: string
): Observable<About> =>
  apiAuth$(env, httpService).pipe(
    tap(() =>
      Logger.log(
        `Calling API ${env.darkRushPhotographyApi}/admin/v1/about`,
        logContextEntity
      )
    ),
    switchMap((authToken) =>
      httpService.post<About>(
        `${env.darkRushPhotographyApi}/admin/v1/about`,
        {
          slug,
          images: [],
          videos: [],
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

const logContextGetAbout = 'getAbout$';
export const getAbout$ = (
  env: Env,
  httpService: HttpService,
  slug: string
): Observable<AxiosResponse<About>> => {
  Logger.log(
    `Calling API ${env.darkRushPhotographyApi}/v1/about/${slug}`,
    logContextGetAbout
  );
  return httpService.get<About>(
    `${env.darkRushPhotographyApi}/v1/about/${slug}`
  );
};

export const addAboutImage$ = (
  env: Env,
  httpService: HttpService,
  slug: string,
  imageName: string,
  createDate: string
): Observable<Image> => {
  return getAbout$(env, httpService, slug).pipe(
    switchMap((axiosResponse) => {
      if (!axiosResponse.data.id)
        throw new BadRequestException('Could not get About');

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

export const addOrUpdateAboutImageDimension$ = (
  env: Env,
  httpService: HttpService,
  slug: string,
  imageName: string,
  type: ImageDimensionType,
  state: ImageDimensionState,
  pixels: ImageDimensionPixels
): Observable<ImageDimension> => {
  return getAbout$(env, httpService, slug).pipe(
    switchMap((axiosResponse) => {
      if (!axiosResponse.data.id)
        throw new BadRequestException('Could not get About');

      return addOrUpdateImageDimension$(
        env,
        httpService,
        axiosResponse.data.id,
        imageName,
        type,
        state,
        pixels
      );
    })
  );
};
