import { HttpService } from '@nestjs/common';

import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { Image, ImageDimensionType } from '@dark-rush-photography/shared-types';
import { EnvApiAuth } from '@dark-rush-photography/shared-server/types';
import { EnvApi } from '@dark-rush-photography/serverless/types';
import { apiAuth$ } from '@dark-rush-photography/shared-server/data';

export const addPhotoOfTheWeekImage$ = (
  envApiAuth: EnvApiAuth,
  envApi: EnvApi,
  httpService: HttpService,
  photoOfTheWeekSlug: string,
  slug: string
): Observable<Image> => {
  return apiAuth$(envApiAuth, httpService).pipe(
    switchMap((authToken) =>
      httpService.put<Image>(
        `${envApi.drpApi}/v1/photo-of-the-week/${photoOfTheWeekSlug}/image`,
        {
          slug,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'X-DRP-API-ADMIN-KEY': envApi.drpApiAdminKey,
          },
        }
      )
    ),
    map((axiosResponse) => axiosResponse.data)
  );
};

export const addPhotoOfTheWeekImageType$ = (
  envApiAuth: EnvApiAuth,
  envApi: EnvApi,
  httpService: HttpService,
  photoOfTheWeekSlug: string,
  slug: string,
  imageDimensionType: ImageDimensionType,
  width: number,
  height: number
): Observable<Image> => {
  return apiAuth$(envApiAuth, httpService).pipe(
    switchMap((authToken) =>
      httpService.put<Image>(
        `${envApi.drpApi}/v1/photo-of-the-week/${photoOfTheWeekSlug}/image/${slug}`,
        {
          type: imageDimensionType,
          width,
          height,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'X-DRP-API-ADMIN-KEY': envApi.drpApiAdminKey,
          },
        }
      )
    ),
    map((axiosResponse) => axiosResponse.data)
  );
};
