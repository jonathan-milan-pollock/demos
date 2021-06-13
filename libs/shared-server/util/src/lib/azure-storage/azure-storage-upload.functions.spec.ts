import { Readable } from 'stream';

import { Subscription } from 'rxjs';
import {
  BlobServiceClient,
  BlobUploadCommonResponse,
  BlockBlobClient,
  ContainerClient,
} from '@azure/storage-blob';
import {
  AzureStorageContainerType,
  AZURE_STORAGE_CONNECTION_STRING_DEV,
} from '@dark-rush-photography/shared-server/types';

import {
  uploadBufferToAzureStorageBlob$,
  uploadStreamToAzureStorageBlob$,
} from './azure-storage-upload.functions';

describe('Azure Storage Upload Functions', () => {
  beforeEach(() => {
    const mockStaticFromConnectionString = jest.fn().mockReturnValue({
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      getContainerClient(_containerName: string): ContainerClient {
        return {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          getBlockBlobClient(_blobName: string): BlockBlobClient {
            return {
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              uploadData(_data: Buffer): Promise<BlobUploadCommonResponse> {
                return Promise.resolve({
                  requestId: 'requestId',
                } as BlobUploadCommonResponse);
              },
              uploadStream(
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                _stream: Readable
              ): Promise<BlobUploadCommonResponse> {
                return Promise.resolve({
                  requestId: 'requestId',
                } as BlobUploadCommonResponse);
              },
            } as BlockBlobClient;
          },
        } as ContainerClient;
      },
    } as BlobServiceClient);

    BlobServiceClient.fromConnectionString = mockStaticFromConnectionString;
  });

  describe('uploadBufferToAzureStorageBlob$', () => {
    let uploadBufferSubscription: Subscription | undefined;

    it('should upload buffer to azure storage blob', () => {
      uploadBufferSubscription = uploadBufferToAzureStorageBlob$(
        Buffer.concat([]),
        AZURE_STORAGE_CONNECTION_STRING_DEV,
        AzureStorageContainerType.Private,
        'uploaded-image'
      ).subscribe((requestId) => {
        expect(requestId).toBe('requestId');
      });
    });

    afterEach(() => {
      if (uploadBufferSubscription) {
        uploadBufferSubscription.unsubscribe();
      }
    });
  });

  describe('uploadStreamToAzureStorageBlob$', () => {
    let uploadStreamSubscription: Subscription | undefined;

    it('should upload stream to azure storage blob', () => {
      uploadStreamSubscription = uploadStreamToAzureStorageBlob$(
        Readable.from(['']),
        AZURE_STORAGE_CONNECTION_STRING_DEV,
        AzureStorageContainerType.Private,
        'uploaded-image'
      ).subscribe((requestId) => {
        expect(requestId).toBe('requestId');
      });
    });

    afterEach(() => {
      if (uploadStreamSubscription) {
        uploadStreamSubscription.unsubscribe();
      }
    });
  });
});
