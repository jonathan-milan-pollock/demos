import { all, interpolate, Output } from '@pulumi/pulumi';

import { ResourceGroup } from '@pulumi/azure-native/resources';
import {
  StorageAccount,
  SkuName,
  Kind,
  listStorageAccountKeys,
} from '@pulumi/azure-native/storage';

export const createStorageAccount = (storageAccountName: string) => (
  allowBlobPublicAccess: boolean
) => (resourceGroup: ResourceGroup): [ResourceGroup, StorageAccount] => [
  resourceGroup,
  new StorageAccount(storageAccountName, {
    accountName: storageAccountName,
    resourceGroupName: resourceGroup.name,
    location: resourceGroup.location,
    sku: {
      name: SkuName.Standard_LRS,
    },
    kind: Kind.StorageV2,
    allowBlobPublicAccess,
    enableHttpsTrafficOnly: true,
    minimumTlsVersion: 'TLS1_2',
  }),
];

export const getStorageAccountConnectionString = (
  storage: [ResourceGroup, StorageAccount]
): Output<string> => {
  const [resourceGroup, storageAccount] = storage;

  const storageAccountKeys = all([
    resourceGroup.name,
    storageAccount.name,
  ]).apply(([resourceGroupName, storageAccountName]) =>
    listStorageAccountKeys({
      resourceGroupName,
      accountName: storageAccountName,
    })
  );
  const primaryStorageAccountKey = storageAccountKeys.keys[0].value;
  return interpolate`DefaultEndpointsProtocol=https;AccountName=${storageAccount.name};AccountKey=${primaryStorageAccountKey}`;
};
