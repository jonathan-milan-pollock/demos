import { ResourceGroup } from '@pulumi/azure-native/resources';
import {
  StorageAccount,
  SkuName,
  Kind,
  BlobContainer,
  PublicAccess,
} from '@pulumi/azure-native/storage';

export const createPublicStorageAccount = (
  publicStorageAccountName: string,
  resourceGroup: ResourceGroup
): StorageAccount =>
  new StorageAccount(publicStorageAccountName, {
    accountName: publicStorageAccountName,
    resourceGroupName: resourceGroup.name,
    location: resourceGroup.location,
    sku: {
      name: SkuName.Standard_LRS,
    },
    kind: Kind.StorageV2,
    allowBlobPublicAccess: true,
    enableHttpsTrafficOnly: true,
    minimumTlsVersion: 'TLS1_2',
  });

export const createPublicBlobContainer = (
  publicBlobContainerName: string,
  resourceGroup: ResourceGroup,
  storageAccount: StorageAccount
): BlobContainer =>
  new BlobContainer(publicBlobContainerName, {
    containerName: publicBlobContainerName,
    resourceGroupName: resourceGroup.name,
    accountName: storageAccount.name,
    publicAccess: PublicAccess.Blob,
  });
