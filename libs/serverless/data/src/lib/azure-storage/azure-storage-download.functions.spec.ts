import { Readable } from 'stream';

import { Subscription } from 'rxjs';
import {
  BlobDownloadResponseParsed,
  BlobServiceClient,
  BlockBlobClient,
  ContainerClient,
} from '@azure/storage-blob';

import { AZURE_STORAGE_CONNECTION_STRING } from '@dark-rush-photography/shared-server-types';
import {
  downloadAzureStorageBlobAsStream$,
  downloadAzureStorageBlobToFile$,
} from './azure-storage-download.functions';

const blockBlobClientStream = {
  download(): Promise<BlobDownloadResponseParsed> {
    return Promise.resolve({
      get readableStreamBody(): NodeJS.ReadableStream | undefined {
        return Readable.from(['']);
      },
    } as BlobDownloadResponseParsed);
  },
} as BlockBlobClient;

const blockBlobClientUndefinedStream = {
  download(): Promise<BlobDownloadResponseParsed> {
    return Promise.resolve({
      get readableStreamBody(): NodeJS.ReadableStream | undefined {
        return undefined;
      },
    } as BlobDownloadResponseParsed);
  },
} as BlockBlobClient;

const mockBlobServiceClient = (blockBlobClient: BlockBlobClient) => {
  const mockStaticFromConnectionString = jest.fn().mockReturnValue({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getContainerClient(_containerName: string): ContainerClient {
      return {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        getBlockBlobClient(_blobName: string): BlockBlobClient {
          return blockBlobClient;
        },
      } as ContainerClient;
    },
  } as BlobServiceClient);

  BlobServiceClient.fromConnectionString = mockStaticFromConnectionString;
};

describe('Azure Storage Download Functions', () => {
  describe('downloadAzureStorageBlobAsStream$', () => {
    let downloadAsStreamSubscription: Subscription | undefined;

    it('should return readable stream', () => {
      mockBlobServiceClient(blockBlobClientStream);
      downloadAsStreamSubscription = downloadAzureStorageBlobAsStream$(
        AZURE_STORAGE_CONNECTION_STRING,
        'private',
        'uploaded-image'
      ).subscribe((readableStreamBody) => {
        expect(readableStreamBody).toBeDefined();
      });
    });

    it('should error when stream undefined', () => {
      mockBlobServiceClient(blockBlobClientUndefinedStream);
      downloadAsStreamSubscription = downloadAzureStorageBlobAsStream$(
        AZURE_STORAGE_CONNECTION_STRING,
        'private',
        'uploaded-image'
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ).subscribe(
        () => {
          expect(true).toBe(false);
        },
        (error) =>
          expect(error.message).toBe('Readable stream body was undefined')
      );
    });

    afterEach(() => {
      if (downloadAsStreamSubscription) {
        downloadAsStreamSubscription.unsubscribe();
      }
    });
  });
});
