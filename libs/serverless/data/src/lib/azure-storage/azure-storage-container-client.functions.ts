import { Logger } from '@nestjs/common';

import { ContainerClient, BlobServiceClient } from '@azure/storage-blob';
import { Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { AzureStorageContainerType } from '@dark-rush-photography/shared-server/types';

const logContext = 'getAzureStorageContainerClient$';
export const getAzureStorageContainerClient$ = (
  azureStorageConnectionString: string,
  azureStorageContainerType: AzureStorageContainerType
): Observable<ContainerClient> =>
  of(BlobServiceClient.fromConnectionString(azureStorageConnectionString)).pipe(
    tap(() =>
      Logger.log(
        `Getting container client for container type ${azureStorageContainerType}`,
        logContext
      )
    ),
    map((blobServiceClient) =>
      blobServiceClient.getContainerClient(azureStorageContainerType)
    )
  );
