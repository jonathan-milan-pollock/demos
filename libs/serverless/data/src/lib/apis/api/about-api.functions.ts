import { HttpService, Logger } from '@nestjs/common';

import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { About, Image, PostedState } from '@dark-rush-photography/shared-types';
import { Env } from '@dark-rush-photography/serverless/types';
import { apiAuth$ } from './auth-api.functions';

const logContextCreate = 'createAboutIfNotExists$';
export const createAboutIfNotExists$ = (
  env: Env,
  httpService: HttpService,
  slug: string
): Observable<About> =>
  apiAuth$(env, httpService).pipe(
    tap(() =>
      Logger.log(
        `Calling API ${env.darkRushPhotographyApi}/admin/v1/about`,
        logContextCreate
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

const logContextAddWithAuth = 'putAboutImage$';
export const addAboutImageWithAuth$ = (
  env: Env,
  httpService: HttpService,
  slug: string,
  imageName: string,
  createDate: string,
  authToken: string
): Observable<Image> => {
  Logger.log(
    `Calling API ${env.darkRushPhotographyApi}/v1/about/${slug}`,
    logContextAddWithAuth
  );
  return httpService
    .get<About>(`${env.darkRushPhotographyApi}/v1/about/${slug}`)
    .pipe(
      switchMap((axiosResponse) => {
        Logger.log(
          `Calling API ${env.darkRushPhotographyApi}/admin/v1/images`,
          logContextAddWithAuth
        );

        return httpService.put<Image>(
          `${env.darkRushPhotographyApi}/admin/v1/images`,
          {
            entityId: axiosResponse.data.id,
            slug: imageName.substring(0, imageName.indexOf('.')),
            state: PostedState.New,
            order: 0,
            isStared: false,
            isLoved: false,
            isLiked: false,
            keywords: [],
            dateCreated:
              createDate.substring(0, 10).replace(/:/g, '-') + 'T00:00:00Z',
            dimensions: [],
            emotions: [],
            comments: [],
          },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              DRP_ADMIN_KEY: env.darkRushPhotographyAdminKey,
            },
          }
        );
      }),
      tap((axiosResponse) =>
        Logger.log(axiosResponse.data, logContextAddWithAuth)
      ),
      map((axiosResponse) => axiosResponse.data)
    );
};

export const addAboutImage$ = (
  env: Env,
  httpService: HttpService,
  slug: string,
  imageName: string,
  createDate: string
): Observable<Image> =>
  apiAuth$(env, httpService).pipe(
    switchMap((authToken) =>
      addAboutImageWithAuth$(
        env,
        httpService,
        slug,
        imageName,
        createDate,
        authToken
      )
    )
  );
