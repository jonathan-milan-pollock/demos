import { Injectable, Inject, HttpService, Logger } from '@nestjs/common';

import { take } from 'rxjs/operators';

import { ENV } from '@dark-rush-photography/shared-types';
import { Env, Activity } from '@dark-rush-photography/serverless/types';
import {
  AzureStorageProvider,
  ExifVideoProvider,
} from '@dark-rush-photography/serverless/data';

@Injectable()
export class ExifVideoService {
  constructor(
    @Inject(ENV) private readonly env: Env,
    private readonly exifVideoProvider: ExifVideoProvider,
    private readonly azureStorageProvider: AzureStorageProvider
  ) {}

  async exifVideo(activity: Activity): Promise<Activity> {
    Logger.log('Exif Video', ExifVideoService.name);
    return this.exifVideoProvider
      .exifVideo$(activity)
      .pipe(take(1))
      .toPromise()
      .then(() => activity);
  }
}
