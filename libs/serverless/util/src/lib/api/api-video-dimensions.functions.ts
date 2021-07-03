import { HttpService, Logger } from '@nestjs/common';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  VideoDimension,
  MediaDimensionPixels,
  VideoDimensionType,
} from '@dark-rush-photography/shared/types';
import { EnvApi } from '@dark-rush-photography/serverless/types';

export const addVideoDimension$ = (
  envApi: EnvApi,
  httpService: HttpService,
  accessToken: string,
  entityId: string,
  videoId: string,
  type: VideoDimensionType,
  pixels: MediaDimensionPixels
): Observable<VideoDimension> => {
  const url = `${envApi.drpApi}/admin/v1/video-dimensions?entityId=${entityId}&videoId=${videoId}`;
  Logger.log(url, addVideoDimension$.name);
  return httpService
    .put<VideoDimension>(
      url,
      {
        type,
        pixels,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'X-DRP-API-ADMIN-KEY': envApi.drpApiAdminKey,
        },
      }
    )
    .pipe(map((axiosResponse) => axiosResponse.data));
};
