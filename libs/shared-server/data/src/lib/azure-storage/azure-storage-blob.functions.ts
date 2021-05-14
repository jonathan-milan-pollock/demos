import { pipe } from 'fp-ts/lib/function';
import { Readable } from 'node:stream';

import {
  getAzureStorageBlobServiceClient,
  getAzureStorageContainerClient,
  getAzureStorageBlockBlobClient,
  downloadAzureStorageBlobToFile,
  uploadBufferToAzureStorageBlob,
  uploadStreamToAzureStorageBlob,
} from './azure-storage.functions';

export const downloadBlob = (
  azureStorageConnectionString: string,
  containerName: string,
  blobName: string,
  fileName: string
): Promise<string> => {
  return pipe(
    azureStorageConnectionString,
    getAzureStorageBlobServiceClient,
    getAzureStorageContainerClient(containerName),
    getAzureStorageBlockBlobClient(blobName),
    downloadAzureStorageBlobToFile(fileName)
  );
};

export const uploadBlobFromBuffer = (
  azureStorageConnectionString: string,
  containerName: string,
  blobName: string,
  buffer: Buffer
): Promise<string | undefined> => {
  return pipe(
    azureStorageConnectionString,
    getAzureStorageBlobServiceClient,
    getAzureStorageContainerClient(containerName),
    getAzureStorageBlockBlobClient(blobName),
    uploadBufferToAzureStorageBlob(buffer)
  );
};

export const uploadBlobFromStream = (
  azureStorageConnectionString: string,
  containerName: string,
  blobName: string,
  stream: Readable
): Promise<string | undefined> => {
  return pipe(
    azureStorageConnectionString,
    getAzureStorageBlobServiceClient,
    getAzureStorageContainerClient(containerName),
    getAzureStorageBlockBlobClient(blobName),
    uploadStreamToAzureStorageBlob(stream)
  );
};
