import { ResourceGroup } from '@pulumi/azure-native/resources';
import {
  StorageAccount,
  BlobContainer,
  Blob,
} from '@pulumi/azure-native/storage';

export interface AzureBlob {
  readonly resourceGroup: ResourceGroup;
  readonly storageAccount: StorageAccount;
  readonly blobContainer: BlobContainer;
  readonly blob: Blob;
}
