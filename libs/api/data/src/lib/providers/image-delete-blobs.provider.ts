import { Injectable } from '@nestjs/common';

import { concatMap, from, last, map, Observable } from 'rxjs';

import {
  IMAGE_FILE_EXTENSION,
  IMAGE_VIDEO_FILE_EXTENSION,
} from '@dark-rush-photography/shared/types';
import {
  deleteAzureStorageBlobIfExists$,
  getAzureStorageBlobPath,
  getAzureStorageBlobPathWithImageDimension,
  getImageDimensions,
} from '@dark-rush-photography/api/util';
import { ConfigProvider } from './config.provider';

@Injectable()
export class ImageDeleteBlobsProvider {
  constructor(private readonly configProvider: ConfigProvider) {}

  deleteImageBlobs$(storageId: string, pathname: string): Observable<void> {
    return from(getImageDimensions()).pipe(
      concatMap((imageDimension) =>
        deleteAzureStorageBlobIfExists$(
          getAzureStorageBlobPathWithImageDimension(
            storageId,
            pathname,
            IMAGE_FILE_EXTENSION,
            imageDimension.type
          ),
          this.configProvider.azureStorageConnectionStringPublic,
          this.configProvider.azureStorageBlobContainerNamePublic
        )
      ),
      last(),
      concatMap(() => {
        const blobPath = getAzureStorageBlobPath(
          storageId,
          pathname,
          IMAGE_FILE_EXTENSION
        );
        return deleteAzureStorageBlobIfExists$(
          blobPath,
          this.configProvider.azureStorageConnectionStringPublic,
          this.configProvider.azureStorageBlobContainerNamePublic
        );
      })
    );
  }

  deleteImageVideoBlob$(storageId: string, pathname: string): Observable<void> {
    return deleteAzureStorageBlobIfExists$(
      getAzureStorageBlobPath(storageId, pathname, IMAGE_VIDEO_FILE_EXTENSION),
      this.configProvider.azureStorageConnectionStringPublic,
      this.configProvider.azureStorageBlobContainerNamePublic
    ).pipe(map(() => undefined));
  }
}
