import { BadRequestException, HttpService, Logger } from '@nestjs/common';

import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import {
  About,
  Image,
  ImageDimension,
  MediaDimensionPixels,
  ImageDimensionState,
  ImageDimensionType,
} from '@dark-rush-photography/shared-types';
import { EnvApiAuth } from '@dark-rush-photography/shared-server/types';
import { EnvApi } from '@dark-rush-photography/serverless/types';
import { apiAuth$ } from '@dark-rush-photography/shared-server/data';
import { addImage$ } from './images-api.functions';
import { addOrUpdateImageDimension$ } from './image-dimensions-api.functions';

export const createAboutIfNotExists$ = (
  envApiAuth: EnvApiAuth,
  envApi: EnvApi,
  httpService: HttpService,
  slug: string
): Observable<About> =>
  apiAuth$(envApiAuth, httpService).pipe(
    tap(() =>
      Logger.log(
        `Calling API ${envApi.drpApi}/admin/v1/about`,
        createAboutIfNotExists$.name
      )
    ),
    switchMap((authToken) =>
      httpService.post<About>(
        `${envApi.drpApi}/admin/v1/about`,
        {
          slug,
          images: [],
          videos: [],
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            DRP_ADMIN_KEY: envApi.drpAdminKey,
          },
        }
      )
    ),
    map((axiosResponse) => axiosResponse.data)
  );

export const getAbout$ = (
  envApi: EnvApi,
  httpService: HttpService,
  slug: string
): Observable<AxiosResponse<About>> => {
  Logger.log(`Calling API ${envApi.drpApi}/v1/about/${slug}`, getAbout$.name);
  return httpService.get<About>(`${envApi.drpApi}/v1/about/${slug}`);
};

export const addAboutImage$ = (
  envApiAuth: EnvApiAuth,
  envApi: EnvApi,
  httpService: HttpService,
  slug: string,
  imageName: string,
  createDate: string
): Observable<Image> => {
  return getAbout$(envApi, httpService, slug).pipe(
    switchMap((axiosResponse) => {
      if (!axiosResponse.data.id)
        throw new BadRequestException('Could not get About');

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

export const addOrUpdateAboutImageDimension$ = (
  envApiAuth: EnvApiAuth,
  envApi: EnvApi,
  httpService: HttpService,
  slug: string,
  imageName: string,
  type: ImageDimensionType,
  state: ImageDimensionState,
  pixels: MediaDimensionPixels
): Observable<ImageDimension> => {
  return getAbout$(envApi, httpService, slug).pipe(
    switchMap((axiosResponse) => {
      if (!axiosResponse.data.id)
        throw new BadRequestException('Could not get About');

      return addOrUpdateImageDimension$(
        envApiAuth,
        envApi,
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
