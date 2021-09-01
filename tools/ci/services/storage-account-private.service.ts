import { ResourceGroup } from '@pulumi/azure-native/resources';
import { StorageAccount, SkuName, Kind } from '@pulumi/azure-native/storage';

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
