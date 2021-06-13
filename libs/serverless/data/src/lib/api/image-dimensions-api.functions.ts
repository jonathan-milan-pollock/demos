import { HttpService, Logger } from '@nestjs/common';

import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import { Env } from '@dark-rush-photography/serverless/types';
import {
  ImageDimension,
  MediaDimensionPixels,
  ImageDimensionState,
  ImageDimensionType,
} from '@dark-rush-photography/shared-types';
import { apiAuth$ } from './auth-api.functions';

const logContext = 'addOrUpdateImageDimension$';
export const addOrUpdateImageDimension$ = (
  env: Env,
  httpService: HttpService,
  entityId: string,
  imageName: string,
  type: ImageDimensionType,
  state: ImageDimensionState,
  pixels: MediaDimensionPixels
): Observable<ImageDimension> =>
  apiAuth$(env, httpService).pipe(
    switchMap((authToken) => {
      Logger.log(
        `Calling API ${env.darkRushPhotographyApi}/admin/v1/image-dimensions`,
        logContext
      );

      return httpService.put<ImageDimension>(
        `${env.darkRushPhotographyApi}/admin/v1/image-dimensions`,
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
            DRP_ADMIN_KEY: env.darkRushPhotographyAdminKey,
          },
        }
      );
    }),
    map((axiosResponse) => axiosResponse.data)
  );
