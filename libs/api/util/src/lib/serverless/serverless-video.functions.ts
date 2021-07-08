/*import { HttpService, Logger } from '@nestjs/common';

import { from, Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';

import { Media } from '@dark-rush-photography/shared/types';
import {
  ServerlessCreateImageVideoRequest,
  ServerlessDateVideoCreatedRequest,
  ServerlessExifVideoRequest,
  ServerlessResizeVideoRequest,
} from '@dark-rush-photography/shared-server/types';
import { EnvServerless } from '@dark-rush-photography/api/types';

export const serverlessFindDateVideoCreated$ = (
  envServerless: EnvServerless,
  httpService: HttpService,
  serverlessDateVideoCreatedRequest: ServerlessDateVideoCreatedRequest
): Observable<string> => {
  const url = `${envServerless.url}/date-video-created`;
  Logger.log(url, serverlessExifVideo$.name);
  return from(
    httpService
      .post<string>(
        url,
        {
          serverlessDateVideoCreatedRequest,
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

export const serverlessExifVideo$ = (
  envServerless: EnvServerless,
  httpService: HttpService,
  serverlessExifVideoRequest: ServerlessExifVideoRequest
): Observable<Media> => {
  const url = `${envServerless.url}/exif-video`;
  Logger.log(url, serverlessExifVideo$.name);
  return from(
    httpService
      .post<Media>(
        url,
        {
          serverlessExifVideoRequest,
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

export const serverlessResizeVideo$ = (
  envServerless: EnvServerless,
  httpService: HttpService,
  serverlessResizeVideoRequest: ServerlessResizeVideoRequest
): Observable<Media> => {
  const url = `${envServerless.url}/resize-video`;
  Logger.log(url, serverlessResizeVideo$.name);
  return from(
    httpService
      .post<Media>(
        url,
        {
          serverlessResizeVideoRequest,
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

export const serverlessCreateImageVideo$ = (
  envServerless: EnvServerless,
  httpService: HttpService,
  serverlessCreateImageVideoRequest: ServerlessCreateImageVideoRequest
): Observable<Media> => {
  const url = `${envServerless.url}/create-image-video`;
  Logger.log(url, serverlessCreateImageVideo$.name);
  return from(
    httpService
      .post<Media>(
        url,
        {
          serverlessCreateImageVideoRequest,
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
*/