import { Injectable, Logger } from '@nestjs/common';

import { concatMap, from, last, map, Observable } from 'rxjs';

import {
  deleteAzureStorageBlobIfExists$,
  getAzureStorageBlobPath,
  getAzureStorageBlobPathWithImageDimension,
  getImageDimensions,
} from '@dark-rush-photography/api/util';
import { ConfigProvider } from './config.provider';

@Injectable()
export class ImageDeleteBlobsProvider {
  private readonly logger;

  constructor(private readonly configProvider: ConfigProvider) {
    this.logger = new Logger(deleteAzureStorageBlobIfExists$.name);
  }

  deleteImageBlobs$(storageId: string, fileName: string): Observable<void> {
    return from(getImageDimensions()).pipe(
      concatMap((imageDimension) =>
        deleteAzureStorageBlobIfExists$(
          getAzureStorageBlobPathWithImageDimension(
            storageId,
            fileName,
            imageDimension.type
          ),
          this.configProvider.azureStorageConnectionStringPublic,
          this.configProvider.azureStorageBlobContainerNamePublic
        )
      ),
      last(),
      concatMap(() => {
        const blobPath = getAzureStorageBlobPath(storageId, fileName);
        this.logger.log(`Deleting blob ${blobPath}`);
        return deleteAzureStorageBlobIfExists$(
          blobPath,
          this.configProvider.azureStorageConnectionStringPublic,
          this.configProvider.azureStorageBlobContainerNamePublic
        );
      }),
      map(() => undefined)
    );
  }

  deleteImageVideoBlob$(storageId: string, fileName: string): Observable<void> {
    return deleteAzureStorageBlobIfExists$(
      getAzureStorageBlobPath(storageId, fileName),
      this.configProvider.azureStorageConnectionStringPublic,
      this.configProvider.azureStorageBlobContainerNamePublic
    ).pipe(map(() => undefined));
  }
}
