import { HttpService, Injectable } from '@nestjs/common';

import { from, Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';

import { Entity, EntityType } from '@dark-rush-photography/shared-types';
import { EnvServerless } from '@dark-rush-photography/api/types';
import { getFormData } from '../functions/form-data.functions';

@Injectable()
export class ServerlessProvider {
  upload$ = (
    envServerless: EnvServerless,
    httpService: HttpService,
    serverlessSlug: string,
    entity: Entity,
    entityType: EntityType,
    file: Express.Multer.File
  ): Observable<unknown> => {
    const { drpServerlessUrl, drpServerlessFunctionsKey } = envServerless;
    const formData = getFormData(
      file.buffer,
      file.originalname,
      entity,
      entityType
    );

    return from(
      httpService
        .post(`${drpServerlessUrl}/${serverlessSlug}`, formData, {
          headers: {
            ...formData.getHeaders(),
            'Content-Length': formData.getLengthSync(),
            'x-functions-key': drpServerlessFunctionsKey,
          },
        })
        .pipe(map((axiosResponse) => axiosResponse.data))
    );
  };

  post$ = (
    envServerless: EnvServerless,
    httpService: HttpService,
    serverlessSlug: string,
    entityId: string,
    entityType: EntityType
  ): Observable<unknown> => {
    const { drpServerlessUrl, drpServerlessFunctionsKey } = envServerless;
    return from(
      httpService
        .post(
          `${drpServerlessUrl}/${serverlessSlug}`,
          {
            entityId,
            entityType,
          },
          {
            headers: {
              'x-functions-key': drpServerlessFunctionsKey,
            },
          }
        )
        .pipe(map((axiosResponse) => axiosResponse.data))
    );
  };

  process$ = (
    envServerless: EnvServerless,
    httpService: HttpService,
    serverlessSlug: string,
    entityId: string,
    entityType: EntityType
  ): Observable<unknown> => {
    const { drpServerlessUrl, drpServerlessFunctionsKey } = envServerless;
    return from(
      httpService
        .post(
          `${drpServerlessUrl}/${serverlessSlug}`,
          {
            entityId,
            entityType,
          },
          {
            headers: {
              'x-functions-key': drpServerlessFunctionsKey,
            },
          }
        )
        .pipe(map((axiosResponse) => axiosResponse.data))
    );
  };

  mediaData$ = (
    envServerless: EnvServerless,
    httpService: HttpService,
    serverlessSlug: string,
    mediaId: string,
    entityId: string,
    entityType: EntityType
  ): Observable<unknown> => {
    const { drpServerlessUrl, drpServerlessFunctionsKey } = envServerless;
    return from(
      httpService
        .post(
          `${drpServerlessUrl}/${serverlessSlug}`,
          {
            entityId,
            entityType,
            mediaId,
          },
          {
            headers: {
              'x-functions-key': drpServerlessFunctionsKey,
            },
          }
        )
        .pipe(map((axiosResponse) => axiosResponse.data))
    );
  };
}
