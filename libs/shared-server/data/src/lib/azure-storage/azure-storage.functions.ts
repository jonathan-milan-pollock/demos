import { Readable } from 'node:stream';

import {
  BlobDownloadResponseParsed,
  BlobServiceClient,
  BlockBlobClient,
  ContainerClient,
} from '@azure/storage-blob';

import { AzureStorageContainerType } from '@dark-rush-photography/shared-server/types';
import {
  writeStreamToFile,
  createTempFile,
} from '@dark-rush-photography/shared-server/util';

export const getAzureStorageBlobServiceClient = (
  azureStorageConnectionString: string
): BlobServiceClient => {
  return new BlobServiceClient(
    'https://127.0.0.1:10000/devstoreaccount1/private'
  );
};

export const getAzureStorageContainerClient = (
  azureStorageContainerType: AzureStorageContainerType
) => (blobServiceClient: BlobServiceClient): ContainerClient =>
  blobServiceClient.getContainerClient(azureStorageContainerType);

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

export async function getAzureStorageBlobNames(
  containerClient: ContainerClient
): Promise<string[]> {
  const blobs: string[] = [];
  for await (const blob of containerClient.listBlobsFlat({
    prefix: 'resized-image/Home/images',
  })) {
    blobs.push(blob.name);
  }
  return blobs;
}
