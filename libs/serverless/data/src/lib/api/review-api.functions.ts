import { HttpService } from '@nestjs/common';

import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { Image, ImageDimensionType } from '@dark-rush-photography/shared-types';
import { EnvApi, EnvApiAuth } from '@dark-rush-photography/shared-server/types';
import { apiAuth$ } from '@dark-rush-photography/shared-server/data';

export const addReviewImage$ = (
  envApiAuth: EnvApiAuth,
  envApi: EnvApi,
  httpService: HttpService,
  reviewSlug: string,
  slug: string
): Observable<Image> => {
  return apiAuth$(envApiAuth, httpService).pipe(
    switchMap((authToken) =>
      httpService.put<Image>(
        `${envApi.darkRushPhotographyApi}/v1/review/${reviewSlug}/image`,
        {
          slug,
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
};

export const addReviewImageType$ = (
  envApiAuth: EnvApiAuth,
  envApi: EnvApi,
  httpService: HttpService,
  reviewSlug: string,
  slug: string,
  imageDimensionType: ImageDimensionType,
  width: number,
  height: number
): Observable<Image> => {
  return apiAuth$(envApiAuth, httpService).pipe(
    switchMap((authToken) =>
      httpService.put<Image>(
        `${envApi.darkRushPhotographyApi}/v1/review/${reviewSlug}/image/${slug}`,
        {
          type: imageDimensionType,
          width,
          height,
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
};
