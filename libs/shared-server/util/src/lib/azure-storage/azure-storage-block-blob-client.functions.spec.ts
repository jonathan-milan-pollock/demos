import { Subscription } from 'rxjs';

import { getAzureStorageBlockBlobClient$ } from './azure-storage-block-blob-client.functions';
import { AzureStorageType } from '@dark-rush-photography/api/types';

describe('blockBlobClient$', () => {
  let blockBlobClientSubscription: Subscription | undefined;

  it('should provide a block blob client for the private container', () => {
    blockBlobClientSubscription = getAzureStorageBlockBlobClient$(
      '',
      AzureStorageType.Private,
      'uploaded-image'
    ).subscribe((blockBlobClient) => {
      expect(blockBlobClient).toBeDefined();
    });
  });

  it('should provide a block blob client for the public container', () => {
    blockBlobClientSubscription = getAzureStorageBlockBlobClient$(
      '',
      AzureStorageType.Public,
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
