import { AzureStorageContainerType } from '@dark-rush-photography/shared-server/types';
import { Readable } from 'node:stream';

import {
  getAzureStorageBlobServiceClient,
  getAzureStorageContainerClient,
  getAzureStorageBlockBlobClient,
  downloadAzureStorageBlobToFile,
  uploadBufferToAzureStorageBlob,
  uploadStreamToAzureStorageBlob,
  getAzureStorageBlobNames,
} from './azure-storage.functions';

export const downloadBlob = (
  azureStorageConnectionString: string,
  azureStorageContainerType: AzureStorageContainerType,
  blobName: string,
  fileName: string
): Promise<string> => {
  const azureStorageBlobServiceClient = getAzureStorageBlobServiceClient(
    azureStorageConnectionString
  );
  const azureStorageContainerClient = getAzureStorageContainerClient(
    azureStorageContainerType
  )(azureStorageBlobServiceClient);
  const azureStorageBlockBlobClient = getAzureStorageBlockBlobClient(blobName)(
    azureStorageContainerClient
  );
  return downloadAzureStorageBlobToFile(fileName)(azureStorageBlockBlobClient);
};

export const uploadBlobFromBuffer = (
  azureStorageConnectionString: string,
  azureStorageContainerType: AzureStorageContainerType,
  blobName: string,
  buffer: Buffer
): Promise<string | undefined> => {
  const azureStorageBlobServiceClient = getAzureStorageBlobServiceClient(
    azureStorageConnectionString
  );
  const azureStorageContainerClient = getAzureStorageContainerClient(
    azureStorageContainerType
  )(azureStorageBlobServiceClient);
  const azureStorageBlockBlobClient = getAzureStorageBlockBlobClient(blobName)(
    azureStorageContainerClient
  );
  return uploadBufferToAzureStorageBlob(buffer)(azureStorageBlockBlobClient);
};

export const uploadBlobFromStream = (
  azureStorageConnectionString: string,
  azureStorageContainerType: AzureStorageContainerType,
  blobName: string,
  stream: Readable
): Promise<string | undefined> => {
  const azureStorageBlobServiceClient = getAzureStorageBlobServiceClient(
    azureStorageConnectionString
  );
  const azureStorageContainerClient = getAzureStorageContainerClient(
    azureStorageContainerType
  )(azureStorageBlobServiceClient);
  const azureStorageBlockBlobClient = getAzureStorageBlockBlobClient(blobName)(
    azureStorageContainerClient
  );
  return uploadStreamToAzureStorageBlob(stream)(azureStorageBlockBlobClient);
};

export const getBlobsNames = (
  azureStorageConnectionString: string,
  azureStorageContainerType: AzureStorageContainerType
): Promise<string[]> => {
  const azureStorageBlobServiceClient = getAzureStorageBlobServiceClient(
    azureStorageConnectionString
  );
  const azureStorageContainerClient = getAzureStorageContainerClient(
    azureStorageContainerType
  )(azureStorageBlobServiceClient);
  return getAzureStorageBlobNames(azureStorageContainerClient);
};
