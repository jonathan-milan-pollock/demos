import { Inject, Injectable } from '@nestjs/common';

import { ENV } from '@dark-rush-photography/shared-types';
import { Env } from '@dark-rush-photography/api/types';
import { BlobServiceClient } from '@azure/storage-blob';
import { EMPTY, Observable, of } from 'rxjs';
import { map, pluck, startWith } from 'rxjs/operators';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const datauri = require('datauri/parser');

@Injectable()
export class ImagesService {
  constructor(@Inject(ENV) private readonly env: Env) {}
  async getImages(): Promise<string[]> {
    const blobServiceClient = BlobServiceClient.fromConnectionString(
      this.env.azureStorageConnectionString
    );
    const containerClient = blobServiceClient.getContainerClient('private');
    const blobs: string[] = [];
    for await (const blob of containerClient.listBlobsFlat({
      prefix: 'resized-image/Home/images',
    })) {
      blobs.push(blob.name);
    }
    return [...blobs];
  }

  getImagesTwo(prefix: string): Observable<string[]> {
    return EMPTY.pipe(
      startWith(this.env.azureStorageConnectionString),
      map((azureStorageConnectionString) =>
        BlobServiceClient.fromConnectionString(azureStorageConnectionString)
      ),
      map((blobServiceClient) =>
        blobServiceClient.getContainerClient('private')
      ),
      map((containerClient) => containerClient.listBlobsFlat({ prefix })),
      pluck('name')
    );
  }

  async getImage(blobName: string): Promise<string> {
    const blobServiceClient = BlobServiceClient.fromConnectionString(
      this.env.azureStorageConnectionString
    );
    const containerClient = blobServiceClient.getContainerClient('private');
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    const blobDownloadResponseParsed = await blockBlobClient.download(0);
    if (!blobDownloadResponseParsed.readableStreamBody)
      throw new Error('Readable stream body was undefined');

    const chunks: Buffer[] = [];
    for await (const chunk of blobDownloadResponseParsed.readableStreamBody) {
      chunks.push(Buffer.from(chunk));
    }
    const parser = new datauri();
    return parser.format('.jpg', Buffer.concat(chunks)).content;
  }
}
