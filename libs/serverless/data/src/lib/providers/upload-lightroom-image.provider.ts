import {
  Logger,
  BadRequestException,
  Injectable,
  HttpService,
} from '@nestjs/common';

import {
  ImageDimensionType,
  Image,
  PostState,
} from '@dark-rush-photography/shared-types';
import {
  ActivityMedia,
  ActivityOrchestratorType,
  ActivityProcess,
  ActivityType,
  ActivityUpload,
  AzureStorageContainerType,
  Env,
} from '@dark-rush-photography/serverless/types';
import {
  addImage$,
  createEntity$,
  getPublishServiceActivityMedia,
  readCreateDateExif$,
} from '@dark-rush-photography/serverless/util';
import { AzureStorageProvider } from './azure-storage.provider';
import { switchMap, switchMapTo, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class UploadLightroomImageProvider {
  constructor(private readonly azureStorageProvider: AzureStorageProvider) {}

  validateUpload(
    fileName: string,
    lightroomImage: Express.Multer.File
  ): ActivityUpload {
    if (!lightroomImage) {
      const message = 'Image must be provided for lightroom image upload';
      Logger.log(message, UploadLightroomImageProvider.name);
      throw new BadRequestException(message);
    }

    const media = getPublishServiceActivityMedia(fileName);
    if (!media) {
      const message = 'Activity media was not created from upload';
      Logger.log(message, UploadLightroomImageProvider.name);
      throw new BadRequestException(message);
    }

    return {
      media,
      file: lightroomImage,
    };
  }

  getOrchestratorInput(media: ActivityMedia): ActivityProcess {
    return {
      orchestratorType: ActivityOrchestratorType.UploadImage,
      activityGroups: [
        {
          sequential: [
            {
              type: ActivityType.TinifyImage,
              postState: PostState.New,
              media,
            },
          ],
          parallel: [
            {
              type: ActivityType.DimensionImage,
              postState: PostState.New,
              media,
              config: {
                imageDimensionType: ImageDimensionType.Tile,
              },
            },
            {
              type: ActivityType.DimensionImage,
              postState: PostState.New,
              media,
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
    Logger.log(
      'Starting upload lightroom image orchestrator',
      UploadLightroomImageProvider.name
    );
  }

  logOrchestrationStart(instanceId: string): void {
    Logger.log(
      `${ActivityOrchestratorType.UploadImage} started orchestration with ID = '${instanceId}'.`,
      UploadLightroomImageProvider.name
    );
  }

  createEntityAndImage$ = (
    env: Env,
    httpService: HttpService,
    activityUpload: ActivityUpload,
    blobPath: string
  ): Observable<Image> => {
    return createEntity$(env, httpService, activityUpload.media).pipe(
      tap((entity) => {
        activityUpload.media = {
          ...activityUpload.media,
          entityId: entity.id,
        };
      }),
      switchMapTo(
        this.azureStorageProvider.downloadBlobToFile$(
          env.azureStorageConnectionString,
          AzureStorageContainerType.Private,
          blobPath,
          activityUpload.media.fileName
        )
      ),
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
