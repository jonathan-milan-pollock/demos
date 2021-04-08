import { all, interpolate, Output } from '@pulumi/pulumi';
import { Asset } from '@pulumi/pulumi/asset';

import { ResourceGroup } from '@pulumi/azure-native/resources';
import {
  StorageAccount,
  BlobContainer,
  PublicAccess,
  Blob,
  listStorageAccountServiceSAS,
  HttpProtocol,
  SignedResource,
  Permissions,
} from '@pulumi/azure-native/storage';

export const createPrivateBlobContainer = (blobContainerName: string) => (
  storage: [ResourceGroup, StorageAccount]
): [ResourceGroup, StorageAccount, BlobContainer] => {
  const [resourceGroup, storageAccount] = storage;
  return [
    resourceGroup,
    storageAccount,
    new BlobContainer(blobContainerName, {
      containerName: blobContainerName,
      resourceGroupName: resourceGroup.name,
      accountName: storageAccount.name,
    }),
  ];
};

export const createPublicBlobContainer = (blobContainerName: string) => (
  storage: [ResourceGroup, StorageAccount]
): [ResourceGroup, StorageAccount, BlobContainer] => {
  const [resourceGroup, storageAccount] = storage;
  return [
    resourceGroup,
    storageAccount,
    new BlobContainer(blobContainerName, {
      containerName: blobContainerName,
      resourceGroupName: resourceGroup.name,
      accountName: storageAccount.name,
      publicAccess: PublicAccess.Blob,
    }),
  ];
};

export const createBlobWithAsset = (blobName: string) => (asset: Asset) => (
  blobStorage: [ResourceGroup, StorageAccount, BlobContainer]
): [ResourceGroup, StorageAccount, BlobContainer, Blob] => {
  const [resourceGroup, storageAccount, blobContainer] = blobStorage;

  return [
    resourceGroup,
    storageAccount,
    blobContainer,
    new Blob(blobName, {
      resourceGroupName: resourceGroup.name,
      accountName: storageAccount.name,
      containerName: blobContainer.name,
      source: asset,
    }),
  ];
};

export const getSignedBlobUrl = (
  blobStorage: [ResourceGroup, StorageAccount, BlobContainer, Blob]
): Output<string> => {
  const [resourceGroup, storageAccount, blobContainer, blob] = blobStorage;

  const blobSAS = all<string>([
    resourceGroup.name,
    storageAccount.name,
    blobContainer.name,
    blob.name,
  ]).apply((blobStorage) => {
    const [
      resourceGroupName,
      storageAccountName,
      blobContainerName,
      blobName,
    ] = blobStorage;

    return listStorageAccountServiceSAS({
      accountName: storageAccountName,
      protocols: HttpProtocol.Https,
      sharedAccessExpiryTime: '2030-01-01',
      sharedAccessStartTime: '2021-01-01',
      resourceGroupName: resourceGroupName,
      resource: SignedResource.C,
      permissions: Permissions.R,
      canonicalizedResource: `/blob/${blobContainerName}/${blobName}`,
      contentType: 'application/json',
      cacheControl: 'max-age=5',
      contentDisposition: 'inline',
      contentEncoding: 'deflate',
    });
  });
  return interpolate`https://${storageAccount.name}.blob.core.windows.net/${blobContainer.name}/${blob.name}?${blobSAS.serviceSasToken}`;
};
