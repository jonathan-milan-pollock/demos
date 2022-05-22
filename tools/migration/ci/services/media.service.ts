import { ResourceGroup } from '@pulumi/azure-native/resources';
import { StorageAccount, SkuName, Kind } from '@pulumi/azure-native/storage';
import { MediaService } from '@pulumi/azure-native/media';

export const createMediaServiceStorageAccount = (
  mediaServiceStorageAccountName: string,
  resourceGroup: ResourceGroup
): StorageAccount =>
  new StorageAccount(mediaServiceStorageAccountName, {
    accountName: mediaServiceStorageAccountName,
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

export const createMediaService = (
  mediaServiceName: string,
  resourceGroup: ResourceGroup,
  mediaServiceStorageAccount: StorageAccount
): MediaService =>
  new MediaService(mediaServiceName, {
    location: resourceGroup.location,
    resourceGroupName: resourceGroup.name,
    storageAccounts: [
      {
        id: mediaServiceStorageAccount.id,
        type: 'Primary',
      },
    ],
  });
