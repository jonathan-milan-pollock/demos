import { Inject, Injectable } from '@nestjs/common';

import { ENV } from '@dark-rush-photography/shared-types';
import { Env } from '@dark-rush-photography/serverless/types';

import { AzureStorageProvider } from './azure-storage.provider';
@Injectable()
export class PostImageProvider {
  constructor(
    @Inject(ENV) private readonly env: Env,
    private readonly azureStorageProvider: AzureStorageProvider
  ) {}
}
