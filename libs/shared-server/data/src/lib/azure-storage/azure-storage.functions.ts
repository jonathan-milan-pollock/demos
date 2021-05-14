import { Readable } from 'node:stream';

import {
  BlobDownloadResponseParsed,
  BlobServiceClient,
  BlockBlobClient,
  ContainerClient,
} from '@azure/storage-blob';

import {
  writeStreamToFile,
  createTempFile,
} from '@dark-rush-photography/shared-server/util';

export const getAzureStorageBlobServiceClient = (
  azureStorageConnectionString: string
): BlobServiceClient => {
  return BlobServiceClient.fromConnectionString(azureStorageConnectionString);
};

export const getAzureStorageContainerClient = (containerName: string) => (
  blobServiceClient: BlobServiceClient
): ContainerClient => blobServiceClient.getContainerClient(containerName);

export const getAzureStorageBlockBlobClient = (blobName: string) => (
  containerClient: ContainerClient
): BlockBlobClient => containerClient.getBlockBlobClient(blobName);

export const downloadAzureStorageBlobToFile = (fileName: string) => (
  blockBlobClient: BlockBlobClient
): Promise<string> =>
  new Promise<string>((resolve, reject) => {
    blockBlobClient
      .download(0)
      .then((blobDownloadResponseParsed: BlobDownloadResponseParsed) => {
        return blobDownloadResponseParsed.readableStreamBody;
      })
      .then((readableStreamBody) =>
        createTempFile(fileName).then((tempFilePath) => {
          if (!readableStreamBody)
            return reject('Readable stream body was undefined');
          return resolve(writeStreamToFile(tempFilePath)(readableStreamBody));
        })
      );
  });

export const uploadBufferToAzureStorageBlob = (buffer: Buffer) => (
  blockBlobClient: BlockBlobClient
): Promise<string | undefined> =>
  new Promise<string | undefined>((resolve, reject) => {
    blockBlobClient
      .uploadData(buffer)
      .then((uploadBlobResponse) => resolve(uploadBlobResponse.requestId))
      .catch(reject);
  });

export const uploadStreamToAzureStorageBlob = (stream: Readable) => (
  blockBlobClient: BlockBlobClient
): Promise<string | undefined> =>
  new Promise<string | undefined>((resolve, reject) => {
    blockBlobClient
      .uploadStream(stream)
      .then((uploadBlobResponse) => resolve(uploadBlobResponse.requestId))
      .catch(reject);
  });
