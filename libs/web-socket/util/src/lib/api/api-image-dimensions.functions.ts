import { BadRequestException, HttpService, Logger } from '@nestjs/common';

import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import {
  ImageDimension,
  MediaDimensionPixels,
  ImageDimensionType,
  Media,
} from '@dark-rush-photography/shared/types';
import { Env } from '@dark-rush-photography/web-socket/types';
import { apiAuth$ } from './api-auth.functions';

export const addImageDimension$ = (
  env: Env,
  httpService: HttpService,
  media: Media,
  type: ImageDimensionType,
  pixels: MediaDimensionPixels
): Observable<ImageDimension> => {
  const entityId = media.entityId;
  if (!entityId) {
    const message = 'Entity id is required for adding an image dimension';
    Logger.log(message, addImageDimension$.name);
    throw new BadRequestException(message);
  }

  const imageId = media.id;
  if (!imageId) {
    const message = 'Image id is required for adding an image dimension';
    Logger.log(message, addImageDimension$.name);
    throw new BadRequestException(message);
  }

  const url = `${env.api.drpApi}/admin/v1/image-dimensions?entityId=${media.entityId}&imageId=${activityMedia.id}`;
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
          },
        }
      )
    ),
    map((axiosResponse) => axiosResponse.data)
  );
};
