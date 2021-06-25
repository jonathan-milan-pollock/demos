import { Express } from 'express';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Multer } from 'multer';
import { HttpService, Injectable } from '@nestjs/common';

import { from, Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';

import { DocumentType } from '@dark-rush-photography/shared-types';
import { EnvServerless } from '@dark-rush-photography/api/types';
import { getFormData } from '../functions/form-data.functions';

@Injectable()
export class ServerlessProvider {
  upload$ = (
    envServerless: EnvServerless,
    httpService: HttpService,
    serverlessSlug: string,
    entityId: string,
    documentType: DocumentType,
    file: Express.Multer.File
  ): Observable<unknown> => {
    const { drpServerlessUrl, drpServerlessFunctionsKey } = envServerless;
    const formData = getFormData(
      file.buffer,
      file.originalname,
      entityId,
      documentType
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
    documentType: DocumentType
  ): Observable<unknown> => {
    const { drpServerlessUrl, drpServerlessFunctionsKey } = envServerless;
    return from(
      httpService
        .post(
          `${drpServerlessUrl}/${serverlessSlug}`,
          {
            id: entityId,
            type: documentType,
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
    documentType: DocumentType
  ): Observable<unknown> => {
    const { drpServerlessUrl, drpServerlessFunctionsKey } = envServerless;
    return from(
      httpService
        .post(
          `${drpServerlessUrl}/${serverlessSlug}`,
          {
            id: entityId,
            type: documentType,
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
    documentType: DocumentType
  ): Observable<unknown> => {
    const { drpServerlessUrl, drpServerlessFunctionsKey } = envServerless;
    return from(
      httpService
        .post(
          `${drpServerlessUrl}/${serverlessSlug}`,
          {
            id: entityId,
            type: documentType,
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
