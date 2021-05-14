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

import { AzureStorageAccount } from '../interfaces/azure-storage-account.interface';
import { AzureBlobContainer } from '../interfaces/azure-blob-container.interface';
import { AzureBlob } from '../interfaces/azure-blob.interface';

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

export const createSasKey = (accountName: string) => (
  accountKey: string
): string => {
  const startDate = new Date();
  const expiryDate = new Date();
  startDate.setTime(startDate.getTime() - 5 * 60 * 1000);
  expiryDate.setTime(expiryDate.getTime() + 24 * 60 * 60 * 1000);
  expiryDate.setTime(expiryDate.getTime() + 24 * 60 * 60 * 1000);
  return generateAccountSASQueryParameters(
    {
      expiresOn: expiryDate,
      permissions: AccountSASPermissions.parse('rwdlac'),
      protocol: SASProtocol.Https,
      resourceTypes: AccountSASResourceTypes.parse('sco').toString(),
      services: AccountSASServices.parse('b').toString(),
      startsOn: startDate,
      version: '2018-03-28',
    },
    new StorageSharedKeyCredential(accountName, accountKey)
  ).toString();
};

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
        sharedAccessExpiryTime: '2080-01-01',
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
  return interpolate`https://${storageAccountName}.blob.core.windows.net/${blobContainerName}/${blobName}?${blobSAS.serviceSasToken}`;
};
