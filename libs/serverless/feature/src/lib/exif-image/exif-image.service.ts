import { Injectable, Inject, HttpService, Logger } from '@nestjs/common';

import { take } from 'rxjs/operators';

import { ENV } from '@dark-rush-photography/shared/types';
import { Env, Activity } from '@dark-rush-photography/serverless/types';
import {
  AzureStorageProvider,
  ExifImageProvider,
} from '@dark-rush-photography/serverless/data';

@Injectable()
export class ExifImageService {
  constructor(
    @Inject(ENV) private readonly env: Env,
    private readonly exifImageProvider: ExifImageProvider,
    private readonly azureStorageProvider: AzureStorageProvider
  ) {}

  async exifImage(activity: Activity): Promise<Activity> {
    Logger.log('Exif Image', ExifImageService.name);
    return this.exifImageProvider
      .exifImage$(activity)
      .pipe(take(1))
      .toPromise()
      .then(() => activity);
  }
}
