import { Logger, Injectable, HttpService } from '@nestjs/common';

import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import {
  EntityType,
  ImageDimensionType,
  Image,
  MediaState,
} from '@dark-rush-photography/shared/types';
import {
  ActivityMedia,
  ActivityOrchestratorType,
  ActivityProcess,
  ActivityType,
  ActivityUpload,
  AzureStorageType,
  Env,
} from '@dark-rush-photography/serverless/types';
import {
  addImage$,
  readCreateDateExif$,
} from '@dark-rush-photography/serverless/util';
import { AzureStorageProvider } from './azure-storage.provider';

@Injectable()
export class PostProvider {
  constructor(private readonly azureStorageProvider: AzureStorageProvider) {}

  validateUpload(
    fileName: string,
    entityId: string,
    entityType: EntityType,
    entityGroup: string,
    entitySlug: string
  ): ActivityUpload {
    return {
      media: {
        fileName,
        entityId,
        entityType,
        entityGroup,
        entitySlug,
      },
    } as ActivityUpload;
  }

  getOrchestratorInput(
    mediaState: MediaState,
    activityMedia: ActivityMedia
  ): ActivityProcess {
    return {
      orchestratorType: ActivityOrchestratorType.UploadImage,
      activityGroups: [
        {
          sequential: [
            {
              type: ActivityType.TinifyImage,
              mediaState,
              media: activityMedia,
            },
          ],
          parallel: [
            {
              type: ActivityType.DimensionImage,
              mediaState,
              media: activityMedia,
              config: {
                imageDimensionType: ImageDimensionType.Tile,
              },
            },
            {
              type: ActivityType.DimensionImage,
              mediaState,
              media: activityMedia,
              config: {
                imageDimensionType: ImageDimensionType.Small,
              },
            },
          ],
        },
      ],
    };
  }

  logStart(): void {
    Logger.log('Starting post orchestrator', PostProvider.name);
  }

  logOrchestrationStart(instanceId: string): void {
    Logger.log(
      `${ActivityOrchestratorType.Post} started orchestration with ID = '${instanceId}'.`,
      PostProvider.name
    );
  }

  post$ = (
    env: Env,
    httpService: HttpService,
    activityUpload: ActivityUpload,
    blobPath: string
  ): Observable<Image> => {
    return this.azureStorageProvider
      .downloadBlobToFile$(
        env.azureStorageConnectionString,
        AzureStorageType.Private,
        blobPath,
        activityUpload.media.fileName
      )
      .pipe(
        switchMap((filePath) => readCreateDateExif$(filePath)),
        switchMap((createDate) =>
          addImage$(env, httpService, activityUpload.media, createDate)
        ),
        tap((image) => {
          activityUpload.media = {
            ...activityUpload.media,
            id: image.id,
          };
        })
      );
  };
}
