import { HttpService, Logger } from '@nestjs/common';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  ImageDimension,
  MediaDimensionPixels,
  ImageDimensionType,
} from '@dark-rush-photography/shared-types';
import { EnvApi } from '@dark-rush-photography/serverless/types';

export const addImageDimension$ = (
  envApi: EnvApi,
  httpService: HttpService,
  authToken: string,
  entityId: string,
  imageId: string,
  type: ImageDimensionType,
  pixels: MediaDimensionPixels
): Observable<ImageDimension> => {
  const url = `${envApi.drpApi}/admin/v1/image-dimensions?entityId=${entityId}&imageId=${imageId}`;
  Logger.log(`Calling API ${url}`, addImageDimension$.name);

  return httpService
    .put<ImageDimension>(
      url,
      {
        type,
        pixels,
      },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'X-DRP-API-ADMIN-KEY': envApi.drpApiAdminKey,
        },
      }
    )
    .pipe(map((axiosResponse) => axiosResponse.data));
};
