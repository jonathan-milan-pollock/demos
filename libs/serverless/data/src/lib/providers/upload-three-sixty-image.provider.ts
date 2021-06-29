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
  ActivityMedia,
  ActivityOrchestratorType,
  ActivityProcess,
  ActivityType,
  ActivityUpload,
  AzureStorageContainerType,
  Env,
} from '@dark-rush-photography/serverless/types';
import { AzureStorageProvider } from './azure-storage.provider';
import {
  addImage$,
  readCreateDateExif$,
} from '@dark-rush-photography/serverless/util';

@Injectable()
export class UploadThreeSixtyImageProvider {
  constructor(private readonly azureStorageProvider: AzureStorageProvider) {}

  validateUpload(
    fileName: string,
    entityId: string,
    entityType: EntityType,
    entityGroup: string,
    entitySlug: string,
    threeSixtyImage: Express.Multer.File
  ): ActivityUpload {
    if (!threeSixtyImage) {
      throw new BadRequestException(
        'Image must be provided for three sixty image upload'
      );
    }

    return {
      media: {
        fileName,
        entityId,
        entityType,
        entityGroup,
        entitySlug,
      },
      file: threeSixtyImage,
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
                imageDimensionType: ImageDimensionType.ThreeSixtyTile,
              },
            },
            {
              type: ActivityType.DimensionImage,
              postState: PostState.New,
              media,
              config: {
                imageDimensionType: ImageDimensionType.ThreeSixtySmall,
              },
            },
          ],
        },
      ],
    };
  }

  logStart(): void {
    Logger.log(
      'Starting upload three sixty image orchestrator',
      UploadThreeSixtyImageProvider.name
    );
  }

  logOrchestrationStart(instanceId: string): void {
    Logger.log(
      `${ActivityOrchestratorType.UploadImage} started orchestration with ID = '${instanceId}'.`,
      UploadThreeSixtyImageProvider.name
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
