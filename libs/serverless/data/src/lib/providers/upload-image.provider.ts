import {
  Logger,
  BadRequestException,
  Injectable,
  HttpService,
} from '@nestjs/common';

import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import {
  EntityType,
  ImageDimensionType,
  Image,
  PostState,
} from '@dark-rush-photography/shared-types';
import {
  Activity,
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
  readCreateDateExif$,
} from '@dark-rush-photography/serverless/util';
import { AzureStorageProvider } from './azure-storage.provider';

@Injectable()
export class UploadImageProvider {
  constructor(private readonly azureStorageProvider: AzureStorageProvider) {}

  validateUpload(
    fileName: string,
    entityId: string,
    entityType: EntityType,
    entityGroup: string,
    entitySlug: string,
    image: Express.Multer.File
  ): ActivityUpload {
    if (!image) {
      throw new BadRequestException('Image must be provided for image upload');
    }
    return {
      media: {
        fileName,
        entityId,
        entityType,
        entityGroup,
        entitySlug,
      },
      file: image,
    };
  }

  getOrchestratorInput(activityMedia: ActivityMedia): ActivityProcess {
    return {
      orchestratorType: ActivityOrchestratorType.UploadImage,
      activityGroups: [
        {
          sequential: [
            {
              type: ActivityType.TinifyImage,
              postState: PostState.New,
              media: activityMedia,
            },
          ],
          parallel: [
            {
              type: ActivityType.DimensionImage,
              postState: PostState.New,
              media: activityMedia,
              config: {
                imageDimensionType: ImageDimensionType.Tile,
              },
            },
            {
              type: ActivityType.DimensionImage,
              postState: PostState.New,
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
    Logger.log('Starting upload image orchestrator', UploadImageProvider.name);
  }

  logOrchestrationStart(instanceId: string): void {
    Logger.log(
      `${ActivityOrchestratorType.UploadImage} started orchestration with ID = '${instanceId}'.`,
      UploadImageProvider.name
    );
  }

  addImage$ = (
    env: Env,
    httpService: HttpService,
    activityUpload: ActivityUpload,
    blobPath: string
  ): Observable<Image> => {
    return this.azureStorageProvider
      .downloadBlobToFile$(
        env.azureStorageConnectionString,
        AzureStorageContainerType.Private,
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
