import {
  BlobDownloadResponseParsed,
  BlobServiceClient,
  BlockBlobClient,
  BlockBlobUploadResponse,
  ContainerClient,
} from '@azure/storage-blob';

export const getBlobServiceClient = (
  connectionString: string
): BlobServiceClient =>
  BlobServiceClient.fromConnectionString(connectionString);

export const getContainerClient = (blobContainerName: string) => (
  blobServiceClient: BlobServiceClient
): ContainerClient => blobServiceClient.getContainerClient(blobContainerName);

export const getBlockBlobClient = (blobName: string) => (
  containerClient: ContainerClient
): BlockBlobClient => containerClient.getBlockBlobClient(blobName);

export const uploadToBlob = (data: Buffer) => (
  blockBlobClient: BlockBlobClient
): Promise<BlockBlobUploadResponse> =>
  blockBlobClient.upload(data, data.length);

export const downloadFromBlob = (
  blockBlobClient: BlockBlobClient
): Promise<BlobDownloadResponseParsed> => blockBlobClient.download(0);

export const getStreamFromBlobDownload = (
  blobDownloadResponseParsed: BlobDownloadResponseParsed
): Promise<NodeJS.ReadableStream> =>
  new Promise((resolve, reject) => {
    const readableStream = blobDownloadResponseParsed.readableStreamBody;
    if (readableStream === undefined) {
      reject('Unable to get stream from blob download');
      return;
    }
    resolve(readableStream);
  });
