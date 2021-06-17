import { HttpService } from '@nestjs/common';

import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { Image, ImageDimensionType } from '@dark-rush-photography/shared-types';
import { EnvApiAuth } from '@dark-rush-photography/shared-server/types';
import { EnvApi } from '@dark-rush-photography/serverless/types';
import { apiAuth$ } from '@dark-rush-photography/shared-server/data';

export const addEventImage$ = (
  envApiAuth: EnvApiAuth,
  envApi: EnvApi,
  httpService: HttpService,
  eventSlug: string,
  slug: string
): Observable<Image> => {
  return apiAuth$(envApiAuth, httpService).pipe(
    switchMap((authToken) =>
      httpService.put<Image>(
        `${envApi.drpApi}/v1/events/${eventSlug}/image`,
        {
          slug,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            DRP_API_ADMIN_KEY: envApi.drpApiAdminKey,
          },
        }
      )
    ),
    map((axiosResponse) => axiosResponse.data)
  );
};

export const addEventType$ = (
  envApiAuth: EnvApiAuth,
  envApi: EnvApi,
  httpService: HttpService,
  eventSlug: string,
  slug: string,
  imageDimensionType: ImageDimensionType,
  width: number,
  height: number
): Observable<Image> => {
  return apiAuth$(envApiAuth, httpService).pipe(
    switchMap((authToken) =>
      httpService.put<Image>(
        `${envApi.drpApi}/v1/events/${eventSlug}/image/${slug}`,
        {
          type: imageDimensionType,
          width,
          height,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            DRP_API_ADMIN_KEY: envApi.drpApiAdminKey,
          },
        }
      )
    ),
    map((axiosResponse) => axiosResponse.data)
  );
};
