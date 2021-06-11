import { Subscription } from 'rxjs';

import {
  AzureStorageContainerType,
  AZURE_STORAGE_CONNECTION_STRING_DEV,
} from '@dark-rush-photography/shared-server-types';

import {
  getAzureStorageBlockBlobClient$,
  getAzureStorageContainerClient$,
} from './azure-storage-client.functions';
import {
  BlobServiceClient,
  BlockBlobClient,
  ContainerClient,
} from '@azure/storage-blob';

describe('Azure Storage Client Functions', () => {
  beforeEach(() => {
    const mockStaticFromConnectionString = jest.fn().mockReturnValue({
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      getContainerClient(_containerName: string): ContainerClient {
        return {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          getBlockBlobClient(_blobName: string): BlockBlobClient {
            return {} as BlockBlobClient;
          },
        } as ContainerClient;
      },
    } as BlobServiceClient);

    BlobServiceClient.fromConnectionString = mockStaticFromConnectionString;
  });

  describe('containerClient$', () => {
    let containerClientSubscription: Subscription | undefined;

    it('should provide a container client for the private container', () => {
      containerClientSubscription = getAzureStorageContainerClient$(
        AZURE_STORAGE_CONNECTION_STRING_DEV,
        AzureStorageContainerType.Private
      ).subscribe((containerClient) => {
        expect(containerClient).toBeDefined();
      });
    });

    it('should provide a container client for the public container', () => {
      containerClientSubscription = getAzureStorageContainerClient$(
        AZURE_STORAGE_CONNECTION_STRING_DEV,
        AzureStorageContainerType.Public
      ).subscribe((containerClient) => {
        expect(containerClient).toBeDefined();
      });
    });

    afterEach(() => {
      if (containerClientSubscription) {
        containerClientSubscription.unsubscribe();
      }
    });
  });

  describe('blockBlobClient$', () => {
    let blockBlobClientSubscription: Subscription | undefined;

    it('should provide a block blob client for the private container', () => {
      blockBlobClientSubscription = getAzureStorageBlockBlobClient$(
        AZURE_STORAGE_CONNECTION_STRING_DEV,
        AzureStorageContainerType.Private,
        'uploaded-image'
      ).subscribe((blockBlobClient) => {
        expect(blockBlobClient).toBeDefined();
      });
    });

    it('should provide a block blob client for the public container', () => {
      blockBlobClientSubscription = getAzureStorageBlockBlobClient$(
        AZURE_STORAGE_CONNECTION_STRING_DEV,
        AzureStorageContainerType.Public,
        'uploaded-image'
      ).subscribe((blockBlobClient) => {
        expect(blockBlobClient).toBeDefined();
      });
    });

    afterEach(() => {
      if (blockBlobClientSubscription) {
        blockBlobClientSubscription.unsubscribe();
      }
    });
  });
});
