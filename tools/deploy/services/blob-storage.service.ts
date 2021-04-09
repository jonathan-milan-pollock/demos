import { all, interpolate, Output } from '@pulumi/pulumi';
import { Asset } from '@pulumi/pulumi/asset';
import {
  BlobContainer,
  PublicAccess,
  Blob,
  listStorageAccountServiceSAS,
  HttpProtocol,
  SignedResource,
  Permissions,
} from '@pulumi/azure-native/storage';

import { AzureStorageAccount } from '../models/azure-storage-account.model';
import { AzureBlobContainer } from '../models/azure-blob-container.model';
import { AzureBlob } from '../models/azure-blob.model';

export const createPrivateBlobContainer = (blobContainerName: string) => (
  azureStorageAccount: AzureStorageAccount
): AzureBlobContainer => ({
  ...azureStorageAccount,
  blobContainer: new BlobContainer(blobContainerName, {
    containerName: blobContainerName,
    resourceGroupName: azureStorageAccount.resourceGroup.name,
    accountName: azureStorageAccount.storageAccount.name,
  }),
});

export const createPublicBlobContainer = (blobContainerName: string) => (
  azureStorageAccount: AzureStorageAccount
): AzureBlobContainer => ({
  ...azureStorageAccount,
  blobContainer: new BlobContainer(blobContainerName, {
    containerName: blobContainerName,
    resourceGroupName: azureStorageAccount.resourceGroup.name,
    accountName: azureStorageAccount.storageAccount.name,
    publicAccess: PublicAccess.Blob,
  }),
});

export const createBlobWithAsset = (blobName: string) => (asset: Asset) => (
  azureBlobContainer: AzureBlobContainer
): AzureBlob => ({
  ...azureBlobContainer,
  blob: new Blob(blobName, {
    resourceGroupName: azureBlobContainer.resourceGroup.name,
    accountName: azureBlobContainer.storageAccount.name,
    containerName: azureBlobContainer.blobContainer.name,
    source: asset,
  }),
});

export const getSignedBlobUrl = (azureBlob: AzureBlob): Output<string> => {
  const {
    resourceGroup: { name: resourceGroupName },
    storageAccount: { name: storageAccountName },
    blobContainer: { name: blobContainerName },
    blob: { name: blobName },
  } = azureBlob;

  const blobSAS = all<string>([
    resourceGroupName,
    storageAccountName,
    blobContainerName,
    blobName,
  ]).apply(
    ([resourceGroupName, storageAccountName, blobContainerName, blobName]) => {
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
    }
  );
  return interpolate`https://${storageAccountName}.blob.core.windows.net/${blobContainerName}/${blob.name}?${blobSAS.serviceSasToken}`;
};
