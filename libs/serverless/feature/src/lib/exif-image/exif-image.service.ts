import { Injectable, Inject, HttpService, Logger } from '@nestjs/common';

import { take } from 'rxjs/operators';

import { ENV } from '@dark-rush-photography/shared-types';
import {
  Env,
  Activity,
  ActivityType,
  ActivityOrchestratorType,
} from '@dark-rush-photography/serverless/types';
import { ExifImageProvider } from '@dark-rush-photography/serverless/data';

@Injectable()
export class ExifImageService {
  constructor(
    @Inject(ENV) private readonly env: Env,
    private readonly httpService: HttpService,
    private readonly exifImageProvider: ExifImageProvider
  ) {}

  async exifImage(activity: Activity): Promise<Activity> {
    Logger.log('Exif image', ExifImageService.name);
    return this.exifImageProvider
      .exifImage$(this.env, this.httpService, activity)
      .pipe(take(1))
      .toPromise()
      .then(() => ({
        ...activity,
        type: ActivityType.Exif,
      }));
  }
}
