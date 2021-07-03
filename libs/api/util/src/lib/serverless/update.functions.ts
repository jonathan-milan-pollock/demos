import { HttpService, Logger } from '@nestjs/common';

import { from, Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';

import {
  EntityType,
  EntityUpdate,
  ImageUpdate,
  VideoUpdate,
} from '@dark-rush-photography/shared/types';
import { EnvServerless } from '@dark-rush-photography/api/types';

export const serverlessUpdateEntityProcess$ = (
  envServerless: EnvServerless,
  httpService: HttpService,
  entityType: EntityType,
  entityId: string,
  entityUpdate: EntityUpdate
): Observable<unknown> => {
  const url = `${envServerless.url}/update-entity`;
  Logger.log(url, serverlessUpdateEntityProcess$.name);
  return from(
    httpService
      .post(
        url,
        {
          entityType,
          entityId,
          entityUpdate,
        },
        {
          headers: {
            'x-functions-key': envServerless.functionsKey,
          },
        }
      )
      .pipe(map((axiosResponse) => axiosResponse.data))
  );
};

export const serverlessUpdateImageProcess$ = (
  envServerless: EnvServerless,
  httpService: HttpService,
  imageId: string,
  entityType: EntityType,
  entityId: string,
  imageUpdate: ImageUpdate
): Observable<unknown> => {
  const url = `${envServerless.url}/update-image`;
  Logger.log(url, serverlessUpdateVideoProcess$.name);
  return from(
    httpService
      .post(
        url,
        {
          imageId,
          entityType,
          entityId,
          imageUpdate,
        },
        {
          headers: {
            'x-functions-key': envServerless.functionsKey,
          },
        }
      )
      .pipe(map((axiosResponse) => axiosResponse.data))
  );
};

export const serverlessUpdateVideoProcess$ = (
  envServerless: EnvServerless,
  httpService: HttpService,
  videoId: string,
  entityType: EntityType,
  entityId: string,
  videoUpdate: VideoUpdate
): Observable<unknown> => {
  const url = `${envServerless.url}/update-video`;
  Logger.log(url, serverlessUpdateVideoProcess$.name);
  return from(
    httpService
      .post(
        url,
        {
          videoId,
          entityType,
          entityId,
          videoUpdate,
        },
        {
          headers: {
            'x-functions-key': envServerless.functionsKey,
          },
        }
      )
      .pipe(map((axiosResponse) => axiosResponse.data))
  );
};
