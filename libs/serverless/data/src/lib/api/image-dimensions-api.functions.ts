import { HttpService, Logger } from '@nestjs/common';

import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import {
  ImageDimension,
  MediaDimensionPixels,
  ImageDimensionState,
  ImageDimensionType,
} from '@dark-rush-photography/shared-types';
import { EnvApiAuth } from '@dark-rush-photography/shared-server/types';
import { EnvApi } from '@dark-rush-photography/serverless/types';
import { apiAuth$ } from '@dark-rush-photography/shared-server/data';

export const addOrUpdateImageDimension$ = (
  envApiAuth: EnvApiAuth,
  envApi: EnvApi,
  httpService: HttpService,
  entityId: string,
  imageName: string,
  type: ImageDimensionType,
  state: ImageDimensionState,
  pixels: MediaDimensionPixels
): Observable<ImageDimension> =>
  apiAuth$(envApiAuth, httpService).pipe(
    switchMap((authToken) => {
      Logger.log(
        `Calling API ${envApi.drpApi}/admin/v1/image-dimensions`,
        addOrUpdateImageDimension$.name
      );

      return httpService.put<ImageDimension>(
        `${envApi.drpApi}/admin/v1/image-dimensions`,
        {
          entityId,
          imageSlug: imageName.substring(0, imageName.indexOf('.')),
          type,
          state,
          pixels,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            DRP_API_ADMIN_KEY: envApi.drpApiAdminKey,
          },
        }
      );
    }),
    map((axiosResponse) => axiosResponse.data)
  );
