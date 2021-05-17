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
): Promise<string> =>
  pipe(
    azureStorageConnectionString,
    getAzureStorageBlobServiceClient,
    getAzureStorageContainerClient(azureStorageContainerType),
    getAzureStorageBlockBlobClient(blobName),
    downloadAzureStorageBlobToFile(fileName)
  );

export const uploadBlobFromBuffer = (
  azureStorageConnectionString: string,
  azureStorageContainerType: AzureStorageContainerType,
  blobName: string,
  buffer: Buffer
): Promise<string | undefined> =>
  pipe(
    azureStorageConnectionString,
    getAzureStorageBlobServiceClient,
    getAzureStorageContainerClient(azureStorageContainerType),
    getAzureStorageBlockBlobClient(blobName),
    uploadBufferToAzureStorageBlob(buffer)
  );

export const uploadBlobFromStream = (
  azureStorageConnectionString: string,
  azureStorageContainerType: AzureStorageContainerType,
  blobName: string,
  stream: Readable
): Promise<string | undefined> =>
  pipe(
    azureStorageConnectionString,
    getAzureStorageBlobServiceClient,
    getAzureStorageContainerClient(azureStorageContainerType),
    getAzureStorageBlockBlobClient(blobName),
    uploadStreamToAzureStorageBlob(stream)
  );

export const getBlobsNames = (
  azureStorageConnectionString: string,
  azureStorageContainerType: AzureStorageContainerType
): Promise<string[]> =>
  pipe(
    azureStorageConnectionString,
    getAzureStorageBlobServiceClient,
    getAzureStorageContainerClient(azureStorageContainerType),
    getAzureStorageBlobNames
  );
