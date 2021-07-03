import { Injectable, Inject, HttpService, Logger } from '@nestjs/common';

import { switchMap, take } from 'rxjs/operators';

import { ENV } from '@dark-rush-photography/shared/types';
import {
  Env,
  Activity,
  AzureStorageType,
} from '@dark-rush-photography/serverless/types';
import {
  AzureStorageProvider,
  DimensionVideoProvider,
} from '@dark-rush-photography/serverless/data';

@Injectable()
export class DimensionVideoService {
  constructor(
    @Inject(ENV) private readonly env: Env,
    private readonly httpService: HttpService,
    private readonly dimensionVideoProvider: DimensionVideoProvider,
    private readonly azureStorageProvider: AzureStorageProvider
  ) {}

  dimensionVideo(activity: Activity): Promise<Activity> {
    Logger.log('Dimension Video', DimensionVideoService.name);

    const activityConfig = this.dimensionVideoProvider.validateActivityConfig(
      activity.config
    );
    const videoDimensionConfig = this.dimensionVideoProvider.findVideoDimensionConfig(
      activityConfig
    );

    return this.azureStorageProvider
      .downloadBlobToFile$(
        this.env.azureStorageConnectionString,
        AzureStorageType.Private,
        this.azureStorageProvider.getBlobPath(
          activity.mediaState,
          activity.media
        ),
        activity.media.fileName
      )
      .pipe(
        switchMap((filePath) =>
          this.dimensionVideoProvider.resizeVideo$(
            activity.media.fileName,
            filePath,
            videoDimensionConfig
          )
        ),
        switchMap((newImageFilePath) =>
          this.dimensionVideoProvider.addVideoDimension$(
            this.env,
            this.httpService,
            activity,
            videoDimensionConfig.type,
            newImageFilePath
          )
        ),
        take(1)
      )
      .toPromise()
      .then(() => activity);
  }
}
