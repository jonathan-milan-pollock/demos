import * as fs from 'fs-extra';
import { HttpService, Injectable } from '@nestjs/common';

import { Observable } from 'rxjs';
import { map, switchMap, switchMapTo } from 'rxjs/operators';

import { Image, PostState } from '@dark-rush-photography/shared-types';
import {
  ActivityMedia,
  AzureStorageContainerType,
  Env,
} from '@dark-rush-photography/serverless/types';
import {
  getBlobPath,
  readCreateDateExif$,
} from '@dark-rush-photography/serverless/util';
import { AzureStorageProvider } from './azure-storage.provider';
import { addImage$ } from '../functions/api-images.functions';
import { apiAuth$ } from '@dark-rush-photography/shared-server/data';

@Injectable()
export class AddImageProvider {
  constructor(private readonly azureStorageProvider: AzureStorageProvider) {}

  addImage$(
    env: Env,
    httpService: HttpService,
    activityMedia: ActivityMedia
  ): Observable<void> {
    return apiAuth$(env.apiAuth, httpService).pipe(
      map((authToken) => {
        this.azureStorageProvider.downloadBlobToFile$(
          env.azureStorageConnectionString,
          AzureStorageContainerType.Private,
          getBlobPath(PostState.New, activityMedia),
          activityMedia.fileName
        );
      })
    );
    //.pipe(
    //  switchMap(filePath => this.addImageWithCreatedDate(
    //    env, httpService, authToken, filePath, activityMedia.entityId, activityMedia)
    //  ) )
    //  mapTo(Logger.log('AddImage complete', ApiAddImageProvider.name))
    //);
  }

  addImageWithCreatedDate = (
    env: Env,
    httpService: HttpService,
    authToken: string,
    filePath: string,
    entityId: string,
    activityMedia: ActivityMedia
  ): Observable<Image> => {
    return this.azureStorageProvider
      .uploadStreamToBlob$(
        env.azureStorageConnectionString,
        AzureStorageContainerType.Private,
        fs.createReadStream(filePath),
        getBlobPath(PostState.New, activityMedia)
      )
      .pipe(
        switchMapTo(readCreateDateExif$(filePath)),
        switchMap((createDate) =>
          addImage$(
            env.api,
            httpService,
            authToken,
            entityId,
            activityMedia.fileName,
            createDate
          )
        )
      );
  };
}
