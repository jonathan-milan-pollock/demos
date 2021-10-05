import { BadRequestException } from '@nestjs/common';

import { from, map, Observable } from 'rxjs';
import {
  BlobDownloadResponseParsed,
  BlockBlobClient,
} from '@azure/storage-blob';

export const downloadBlobAsStream$ = (
  blockBlobClient: BlockBlobClient
): Observable<NodeJS.ReadableStream> => {
  return from(blockBlobClient.download()).pipe(
    map((response: BlobDownloadResponseParsed) => {
      if (!response.readableStreamBody) {
        throw new BadRequestException('Readable stream body was undefined');
      }
      return response.readableStreamBody;
    })
  );
};
