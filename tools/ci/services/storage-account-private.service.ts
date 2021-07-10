import { ResourceGroup } from '@pulumi/azure-native/resources';
import {
  StorageAccount,
  SkuName,
  Kind,
  BlobContainer,
  Table,
} from '@pulumi/azure-native/storage';

export const createPrivateStorageAccount = (
  privateStorageAccountName: string,
  resourceGroup: ResourceGroup
): StorageAccount =>
  new StorageAccount(privateStorageAccountName, {
    accountName: privateStorageAccountName,
    resourceGroupName: resourceGroup.name,
    location: resourceGroup.location,
    sku: {
      name: SkuName.Standard_LRS,
    },
    kind: Kind.StorageV2,
    allowBlobPublicAccess: false,
    enableHttpsTrafficOnly: true,
    minimumTlsVersion: 'TLS1_2',
  });

export const createPrivateBlobContainer = (
  privateBlobContainerName: string,
  resourceGroup: ResourceGroup,
  storageAccount: StorageAccount
): BlobContainer =>
  new BlobContainer(privateBlobContainerName, {
    containerName: privateBlobContainerName,
    resourceGroupName: resourceGroup.name,
    accountName: storageAccount.name,
  });

export const createPrivateTable = (
  privateTableName: string,
  resourceGroup: ResourceGroup,
  storageAccount: StorageAccount
): Table =>
  new Table(privateTableName, {
    tableName: privateTableName,
    resourceGroupName: resourceGroup.name,
    accountName: storageAccount.name,
  });
