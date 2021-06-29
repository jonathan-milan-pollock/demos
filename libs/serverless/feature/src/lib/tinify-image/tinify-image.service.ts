import { Injectable, Inject, HttpService, Logger } from '@nestjs/common';

import { take } from 'rxjs/operators';

import { ENV } from '@dark-rush-photography/shared-types';
import { Env, Activity } from '@dark-rush-photography/serverless/types';
import { TinifyImageProvider } from '@dark-rush-photography/serverless/data';

@Injectable()
export class TinifyImageService {
  constructor(
    @Inject(ENV) private readonly env: Env,
    private readonly httpService: HttpService,
    private readonly tinifyImageProvider: TinifyImageProvider
  ) {}

  async tinifyImage(activity: Activity): Promise<Activity> {
    Logger.log('Tinify Image', TinifyImageService.name);
    return this.tinifyImageProvider
      .tinifyImage$(activity)
      .pipe(take(1))
      .toPromise()
      .then(() => activity);
  }
}
