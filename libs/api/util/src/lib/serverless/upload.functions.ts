import { HttpService, Logger } from '@nestjs/common';

import { from, Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';

import { EntityType } from '@dark-rush-photography/shared/types';
import { EnvServerless } from '@dark-rush-photography/api/types';
import { getFormData } from './form-data.functions';

export const serverlessUploadImage$ = (
  envServerless: EnvServerless,
  httpService: HttpService,
  entityType: EntityType,
  entityId: string,
  file: Express.Multer.File
): Observable<unknown> => {
  const url = `${envServerless.url}/upload-image`;
  Logger.log(url, serverlessUploadImage$.name);

  const formData = getFormData(file.buffer, file.originalname);
  return from(
    httpService
      .post(url, formData, {
        headers: {
          ...formData.getHeaders(),
          'Content-Length': formData.getLengthSync(),
          'x-functions-key': envServerless.functionsKey,
          'x-entity-type': entityType,
          'x-entity-id': entityId,
        },
      })
      .pipe(map((axiosResponse) => axiosResponse.data))
  );
};

export const serverlessUploadThreeSixtyImage$ = (
  envServerless: EnvServerless,
  httpService: HttpService,
  entityType: EntityType,
  entityId: string,
  file: Express.Multer.File
): Observable<unknown> => {
  const url = `${envServerless.url}/upload-three-sixty-image`;
  Logger.log(url, serverlessUploadImage$.name);

  const formData = getFormData(file.buffer, file.originalname);
  return from(
    httpService
      .post(url, formData, {
        headers: {
          ...formData.getHeaders(),
          'Content-Length': formData.getLengthSync(),
          'x-functions-key': envServerless.functionsKey,
          'x-entity-type': entityType,
          'x-entity-id': entityId,
        },
      })
      .pipe(map((axiosResponse) => axiosResponse.data))
  );
};

export const serverlessUploadVideo$ = (
  envServerless: EnvServerless,
  httpService: HttpService,
  entityType: EntityType,
  entityId: string,
  file: Express.Multer.File
): Observable<unknown> => {
  const url = `${envServerless.url}/upload-video`;
  Logger.log(url, serverlessUploadImage$.name);

  const formData = getFormData(file.buffer, file.originalname);
  return from(
    httpService
      .post(url, formData, {
        headers: {
          ...formData.getHeaders(),
          'Content-Length': formData.getLengthSync(),
          'x-functions-key': envServerless.functionsKey,
          'x-entity-type': entityType,
          'x-entity-id': entityId,
        },
      })
      .pipe(map((axiosResponse) => axiosResponse.data))
  );
};
