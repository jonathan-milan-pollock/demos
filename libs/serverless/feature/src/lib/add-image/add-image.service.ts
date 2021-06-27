import { Injectable, Inject, HttpService, Logger } from '@nestjs/common';

import { take } from 'rxjs/operators';

import { ENV } from '@dark-rush-photography/shared-types';
import {
  Env,
  Activity,
  ActivityType,
} from '@dark-rush-photography/serverless/types';
import { AddImageProvider } from '@dark-rush-photography/serverless/data';

@Injectable()
export class AddImageService {
  constructor(
    @Inject(ENV) private readonly env: Env,
    private readonly httpService: HttpService,
    private readonly addImageProvider: AddImageProvider
  ) {}

  async addImage(activity: Activity): Promise<Activity> {
    Logger.log('Add image', AddImageService.name);
    return this.addImageProvider
      .addImage$(this.env, this.httpService, activity.media)
      .pipe(take(1))
      .toPromise()
      .then(() => ({
        ...activity,
        type: ActivityType.Add,
      }));
  }
}
