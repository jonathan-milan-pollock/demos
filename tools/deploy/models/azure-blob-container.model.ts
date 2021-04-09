import { ResourceGroup } from '@pulumi/azure-native/resources';
import { StorageAccount, BlobContainer } from '@pulumi/azure-native/storage';

export interface AzureBlobContainer {
  readonly resourceGroup: ResourceGroup;
  readonly storageAccount: StorageAccount;
  readonly blobContainer: BlobContainer;
}
