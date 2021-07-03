import { BadRequestException, HttpService, Logger } from '@nestjs/common';

import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import {
  ImageDimension,
  MediaDimensionPixels,
  ImageDimensionType,
} from '@dark-rush-photography/shared/types';
import { ActivityMedia, Env } from '@dark-rush-photography/serverless/types';
import { apiAuth$ } from './api-auth.functions';

export const addImageDimension$ = (
  env: Env,
  httpService: HttpService,
  activityMedia: ActivityMedia,
  type: ImageDimensionType,
  pixels: MediaDimensionPixels
): Observable<ImageDimension> => {
  const entityId = activityMedia.entityId;
  if (!entityId) {
    const message = 'Entity id is required for adding an image dimension';
    Logger.log(message, addImageDimension$.name);
    throw new BadRequestException(message);
  }

  const imageId = activityMedia.id;
  if (!imageId) {
    const message = 'Image id is required for adding an image dimension';
    Logger.log(message, addImageDimension$.name);
    throw new BadRequestException(message);
  }

  const url = `${env.api.drpApi}/admin/v1/image-dimensions?entityId=${activityMedia.entityId}&imageId=${activityMedia.id}`;
  Logger.log(url, addImageDimension$.name);
  return apiAuth$(env.apiAuth, httpService).pipe(
    switchMap((accessToken) =>
      httpService.put<ImageDimension>(
        url,
        {
          type,
          pixels,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'X-DRP-API-ADMIN-KEY': env.api.drpApiAdminKey,
          },
        }
      )
    ),
    map((axiosResponse) => axiosResponse.data)
  );
};
