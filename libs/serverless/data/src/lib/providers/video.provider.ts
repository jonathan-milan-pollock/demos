import { Inject, Injectable, NotImplementedException } from '@nestjs/common';

import { Observable } from 'rxjs';

import {
  EntityType,
  ENV,
  ImageDimensionType,
  MediaState,
} from '@dark-rush-photography/shared/types';
import { Env } from '@dark-rush-photography/serverless/types';
import { AzureStorageProvider } from './azure-storage.provider';

@Injectable()
export class VideoProvider {
  constructor(
    @Inject(ENV) private readonly env: Env,
    private readonly azureStorageProvider: AzureStorageProvider
  ) {}

  findData$(
    imageDimensionType: ImageDimensionType,
    entityId: string,
    entityType: EntityType,
    imageId: string,
    imageSlug: string,
    state: MediaState
  ): Observable<void> {
    throw new NotImplementedException();
  }
}
