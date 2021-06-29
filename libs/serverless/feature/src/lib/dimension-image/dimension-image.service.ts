import { Injectable, Inject, HttpService, Logger } from '@nestjs/common';

import { switchMap, take } from 'rxjs/operators';

import { ENV } from '@dark-rush-photography/shared-types';
import {
  Env,
  Activity,
  AzureStorageContainerType,
} from '@dark-rush-photography/serverless/types';
import {
  AzureStorageProvider,
  DimensionImageProvider,
} from '@dark-rush-photography/serverless/data';

@Injectable()
export class DimensionImageService {
  constructor(
    @Inject(ENV) private readonly env: Env,
    private readonly httpService: HttpService,
    private readonly dimensionImageProvider: DimensionImageProvider,
    private readonly azureStorageProvider: AzureStorageProvider
  ) {}

  dimensionImage(activity: Activity): Promise<Activity> {
    Logger.log('Dimension Image', DimensionImageService.name);

    const activityConfig = this.dimensionImageProvider.validateActivityConfig(
      activity.config
    );
    const imageDimensionConfig = this.dimensionImageProvider.findImageDimensionConfig(
      activityConfig
    );

    return this.azureStorageProvider
      .downloadBlobToFile$(
        this.env.azureStorageConnectionString,
        AzureStorageContainerType.Private,
        this.azureStorageProvider.getBlobPath(
          activity.postState,
          activity.media
        ),
        activity.media.fileName
      )
      .pipe(
        switchMap((filePath) =>
          this.dimensionImageProvider.resizeImage$(
            activity.media.fileName,
            filePath,
            imageDimensionConfig
          )
        ),
        switchMap((newImageFilePath) =>
          this.dimensionImageProvider.addImageDimension$(
            activity,
            imageDimensionConfig.type,
            newImageFilePath
          )
        ),
        take(1)
      )
      .toPromise()
      .then(() => activity);
  }
}
