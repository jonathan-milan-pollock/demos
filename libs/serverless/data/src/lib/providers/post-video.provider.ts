import { Env } from '@dark-rush-photography/serverless/types';
import { ENV } from '@dark-rush-photography/shared/types';
import { Inject, Injectable } from '@nestjs/common';
import { AzureStorageProvider } from './azure-storage.provider';

@Injectable()
export class PostVideoProvider {
  constructor(
    @Inject(ENV) private readonly env: Env,
    private readonly azureStorageProvider: AzureStorageProvider
  ) {}
}
