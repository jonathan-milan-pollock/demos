import { all, interpolate, Output } from '@pulumi/pulumi';

import { ResourceGroup } from '@pulumi/azure-native/resources';
import {
  StorageAccount,
  SkuName,
  Kind,
  listStorageAccountKeys,
} from '@pulumi/azure-native/storage';

import { AzureStorageAccount } from '../models/azure-storage-account.model';

export const createStorageAccount = (storageAccountName: string) => (
  allowBlobPublicAccess: boolean
) => (resourceGroup: ResourceGroup): AzureStorageAccount => ({
  resourceGroup,
  storageAccount: new StorageAccount(storageAccountName, {
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
});

export const getStorageAccountConnectionString = (
  azureStorageAccount: AzureStorageAccount
): Output<string> => {
  const {
    resourceGroup: { name: resourceGroupName },
    storageAccount: { name: storageAccountName },
  } = azureStorageAccount;
  const storageAccountKeys = all([resourceGroupName, storageAccountName]).apply(
    ([resourceGroupName, storageAccountName]) =>
      listStorageAccountKeys({
        resourceGroupName,
        accountName: storageAccountName,
      })
  );
  const primaryStorageAccountKey = storageAccountKeys.keys[0].value;
  return interpolate`DefaultEndpointsProtocol=https;AccountName=${storageAccountName};AccountKey=${primaryStorageAccountKey}`;
};
