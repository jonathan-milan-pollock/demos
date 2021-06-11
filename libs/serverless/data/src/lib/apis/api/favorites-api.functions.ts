import { HttpService } from '@nestjs/common';

import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { Image, ImageDimensionType } from '@dark-rush-photography/shared-types';
import { Env } from '@dark-rush-photography/serverless/types';
import { apiAuth$ } from './auth-api.functions';

export const addFavoriteImage$ = (
  env: Env,
  httpService: HttpService,
  slug: string
): Observable<Image> => {
  return apiAuth$(env, httpService).pipe(
    switchMap((authToken) =>
      httpService.put<Image>(
        `${env.darkRushPhotographyApi}/v1/favorites/image`,
        {
          slug,
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
};

export const addFavoriteImageType$ = (
  env: Env,
  httpService: HttpService,
  slug: string,
  imageDimensionType: ImageDimensionType,
  width: number,
  height: number
): Observable<Image> => {
  return apiAuth$(env, httpService).pipe(
    switchMap((authToken) =>
      httpService.put<Image>(
        `${env.darkRushPhotographyApi}/v1/favorites/image/${slug}`,
        {
          type: imageDimensionType,
          width,
          height,
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
};
