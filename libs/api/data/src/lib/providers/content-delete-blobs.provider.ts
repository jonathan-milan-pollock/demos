import { Injectable } from '@nestjs/common';

import { concatMap, from, last, map, Observable } from 'rxjs';

import {
  deleteAzureStorageBlockBlobIfExists$,
  getAzureStorageBlobPath,
  getAzureStorageBlobPathWithImageDimension,
  getImageDimensions,
} from '@dark-rush-photography/api/util';
import { ConfigProvider } from './config.provider';

@Injectable()
export class ContentDeleteBlobsProvider {
  constructor(private readonly configProvider: ConfigProvider) {}

  deleteImageBlobs$(storageId: string, fileName: string): Observable<void> {
    return from(getImageDimensions()).pipe(
      concatMap((imageDimension) =>
        deleteAzureStorageBlockBlobIfExists$(
          this.configProvider.azureStorageConnectionStringPublic,
          this.configProvider.azureStorageBlobContainerNamePublic,
          getAzureStorageBlobPathWithImageDimension(
            storageId,
            fileName,
            imageDimension.type
          )
        )
      ),
      last(),
      concatMap(() =>
        deleteAzureStorageBlockBlobIfExists$(
          this.configProvider.azureStorageConnectionStringPublic,
          this.configProvider.azureStorageBlobContainerNamePublic,
          getAzureStorageBlobPath(storageId, fileName)
        )
      ),
      map(() => undefined)
    );
  }

  deleteVideoBlob$(storageId: string, fileName: string): Observable<void> {
    return deleteAzureStorageBlockBlobIfExists$(
      this.configProvider.azureStorageConnectionStringPublic,
      this.configProvider.azureStorageBlobContainerNamePublic,
      getAzureStorageBlobPath(storageId, fileName)
    ).pipe(map(() => undefined));
  }
}
