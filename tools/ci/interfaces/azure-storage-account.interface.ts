import { ResourceGroup } from '@pulumi/azure-native/resources';
import { StorageAccount } from '@pulumi/azure-native/storage';

export interface AzureStorageAccount {
  readonly resourceGroup: ResourceGroup;
  readonly storageAccount: StorageAccount;
}
