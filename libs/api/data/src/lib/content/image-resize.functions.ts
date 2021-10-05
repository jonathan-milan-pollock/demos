import * as fs from 'fs-extra';

import { Observable, tap, concatMap, combineLatest, of, map } from 'rxjs';

import { ImageDimension } from '@dark-rush-photography/shared/types';
import {
  downloadBlobToFile$,
  getAzureStorageBlobPath,
  resizeImage$,
  uploadStreamToBlob$,
  getAzureStorageBlobPathWithImageDimension,
} from '@dark-rush-photography/api/util';
import { Logger } from '@nestjs/common';

export const imageResize$ = (
  storageId: string,
  fileName: string,
  imageResolution: ImageDimension,
  azureStorageConnectionStringPublic: string,
  azureStorageBlobContainerNamePublic: string
): Observable<string> => {
  const logger = new Logger(imageResize$.name);
  return downloadBlobToFile$(
    azureStorageConnectionStringPublic,
    azureStorageBlobContainerNamePublic,
    getAzureStorageBlobPath(storageId, fileName),
    fileName
  ).pipe(
    tap(() => logger.log(`Resizing ${imageResolution.type} image ${fileName}`)),
    concatMap((filePath) => resizeImage$(fileName, filePath, imageResolution)),
    concatMap((filePath) =>
      combineLatest([
        of(filePath),
        uploadStreamToBlob$(
          azureStorageConnectionStringPublic,
          azureStorageBlobContainerNamePublic,
          fs.createReadStream(filePath),
          getAzureStorageBlobPathWithImageDimension(
            storageId,
            fileName,
            imageResolution.type
          )
        ),
      ])
    ),
    map(([filePath]) => filePath)
  );
};
