import { Injectable, Inject, HttpService, Logger } from '@nestjs/common';

import { ENV } from '@dark-rush-photography/shared/types';
import { Env, Activity } from '@dark-rush-photography/serverless/types';
import {
  AzureStorageProvider,
  CreateIconProvider,
  SitemapProvider,
} from '@dark-rush-photography/serverless/data';

@Injectable()
export class SitemapService {
  constructor(
    @Inject(ENV) private readonly env: Env,
    private readonly httpService: HttpService,
    private readonly sitemapProvider: SitemapProvider,
    private readonly azureStorageProvider: AzureStorageProvider
  ) {}

  async sitemap(activity: Activity): Promise<Activity> {
    Logger.log('Sitemap', SitemapService.name);
    return {} as Activity;
  }
}
