import * as fs from 'fs-extra';
import { Injectable, Inject, Logger, HttpService } from '@nestjs/common';

import { combineLatest, of } from 'rxjs';
import { mapTo, mergeMap, switchMap, take } from 'rxjs/operators';

import { ENV } from '@dark-rush-photography/shared/types';
import { Env, Activity } from '@dark-rush-photography/serverless/types';
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
    const imageDimensionConfig = this.dimensionImageProvider.getImageDimensionConfig(
      activity.config
    );
    Logger.log(
      `Dimension Image started for ${imageDimensionConfig.type}`,
      DimensionImageService.name
    );

    const azureStorageType = this.azureStorageProvider.getAzureStorageType(
      activity.media.state
    );
    const blobPath = this.azureStorageProvider.getBlobPath(activity.media);
    const blobPathWithImageDimension = this.azureStorageProvider.getBlobPathWithImageDimension(
      activity.media,
      imageDimensionConfig.type
    );

    return this.azureStorageProvider
      .downloadBlobToFile$(
        this.env.azureStorageConnectionString,
        azureStorageType,
        blobPath,
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
        mergeMap((newFilePath) =>
          combineLatest([
            of(newFilePath),
            this.azureStorageProvider.uploadStreamToBlob$(
              this.env.azureStorageConnectionString,
              azureStorageType,
              fs.createReadStream(newFilePath),
              blobPathWithImageDimension
            ),
          ])
        ),
        switchMap(([newFilePath]) =>
          this.dimensionImageProvider.findImageDimensionPixels$(newFilePath)
        ),
        switchMap((pixels) =>
          addImageDimension$(
            this.env,
            this.httpService,
            activity.media,
            imageDimensionConfig.type,
            pixels
          )
        ),
        mapTo(
          Logger.log('Dimension Image complete', DimensionImageService.name)
        ),
        take(1)
      )
      .toPromise()
      .then(() => activity);
  }
}
