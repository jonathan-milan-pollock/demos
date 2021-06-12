import { forkJoin, Observable, of } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';

import { AzureStorageContainerType } from '@dark-rush-photography/shared-server/types';
import {
  createTempFile,
  writeStreamToFile,
} from '@dark-rush-photography/serverless/util';
import { downloadAzureStorageBlobAsStream$ } from './azure-storage-download-stream.functions';
import { Logger } from '@nestjs/common';

const logContext = 'downloadAzureStorageBlobToFile$';
export const downloadAzureStorageBlobToFile$ = (
  azureStorageConnectionString: string,
  azureStorageContainerType: AzureStorageContainerType,
  blobPath: string,
  fileName: string
): Observable<string> =>
  forkJoin([
    downloadAzureStorageBlobAsStream$(
      azureStorageConnectionString,
      azureStorageContainerType,
      blobPath
    ),
    createTempFile(fileName),
  ]).pipe(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    tap(([_stream, filePath]) =>
      Logger.log(`Writing stream to file ${filePath}`, logContext)
    ),
    mergeMap(([stream, filePath]) => writeStreamToFile(stream, filePath))
  );
