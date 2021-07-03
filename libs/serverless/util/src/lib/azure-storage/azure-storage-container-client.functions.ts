import { Logger } from '@nestjs/common';

import { ContainerClient, BlobServiceClient } from '@azure/storage-blob';
import { Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { AzureStorageType } from '@dark-rush-photography/serverless/types';

export const getAzureStorageContainerClient$ = (
  azureStorageConnectionString: string,
  azureStorageType: AzureStorageType
): Observable<ContainerClient> =>
  of(BlobServiceClient.fromConnectionString(azureStorageConnectionString)).pipe(
    tap(() =>
      Logger.log(
        `Getting container client for container type ${azureStorageType}`,
        getAzureStorageContainerClient$.name
      )
    ),
    map((blobServiceClient) =>
      blobServiceClient.getContainerClient(azureStorageType)
    )
  );
