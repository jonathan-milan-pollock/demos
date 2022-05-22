import { all, interpolate, Output } from '@pulumi/pulumi';
import { ResourceGroup } from '@pulumi/azure-native/resources';
import { listStorageAccountKeys } from '@pulumi/azure-native/storage';

export const getStorageAccountConnectionString = (
  storageAccountName: string,
  resourceGroup: ResourceGroup
): Output<string> => {
  const storageAccountKeys = all([
    resourceGroup.name,
    storageAccountName,
  ]).apply(([resourceGroupName, storageAccountName]) =>
    listStorageAccountKeys({
      resourceGroupName,
      accountName: storageAccountName,
    })
  );
  const primaryStorageAccountKey = storageAccountKeys.keys[0].value;
  return interpolate`DefaultEndpointsProtocol=https;AccountName=${storageAccountName};AccountKey=${primaryStorageAccountKey};EndpointSuffix=core.windows.net`;
};
