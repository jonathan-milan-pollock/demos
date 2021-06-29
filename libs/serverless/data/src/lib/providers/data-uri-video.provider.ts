import { Inject, Injectable } from '@nestjs/common';

import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  EntityType,
  ENV,
  ImageDimensionData,
  ImageDimensionType,
  PostState,
} from '@dark-rush-photography/shared-types';
import { Env } from '@dark-rush-photography/serverless/types';
import { AzureStorageProvider } from './azure-storage.provider';
import { findAzureStorageContainerType } from '@dark-rush-photography/serverless/util';

@Injectable()
export class DataUriVideoProvider {
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
    state: PostState
  ): Observable<ImageDimensionData> {
    return from(
      this.azureStorageProvider.dataUriForBlob$(
        this.env.azureStorageConnectionString,
        findAzureStorageContainerType(state),
        `best-of/${entityType.toLowerCase()}/${imageDimensionType.toLowerCase()}/${imageSlug.toLowerCase()}.jpg`
      )
    ).pipe(
      map(
        (dataUri) =>
          ({
            type: imageDimensionType,
            entityId,
            imageId,
            dataUri,
          } as ImageDimensionData)
      )
    );
  }
}
