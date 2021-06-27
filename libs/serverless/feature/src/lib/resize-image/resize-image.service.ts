import { Injectable, Inject, HttpService, Logger } from '@nestjs/common';

import { take } from 'rxjs/operators';

import { ENV } from '@dark-rush-photography/shared-types';
import {
  Env,
  Activity,
  ActivityType,
} from '@dark-rush-photography/serverless/types';
import { ResizeImageProvider } from '@dark-rush-photography/serverless/data';

@Injectable()
export class ResizeImageService {
  constructor(
    @Inject(ENV) private readonly env: Env,
    private readonly httpService: HttpService,
    private readonly resizeImageProvider: ResizeImageProvider
  ) {}

  async resizeImage(activity: Activity): Promise<Activity> {
    Logger.log('Resize image', ResizeImageService.name);
    return this.resizeImageProvider
      .resizeImage$(this.env, this.httpService, activity)
      .pipe(take(1))
      .toPromise()
      .then(() => ({
        ...activity,
        type: ActivityType.Resize,
      }));
  }
}
