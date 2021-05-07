import { BlockBlobUploadResponse } from '@azure/storage-blob';
import { pipe } from 'fp-ts/lib/function';

import {
  IMAGE_UPLOADS_BLOB_CONNECTION_STRING,
  IMAGE_UPLOADS_BLOB_CONTAINER_NAME,
  getEnvVar,
} from '../constants/environment-variables';
import {
  getBlockBlobClient,
  getContainerClient,
  getBlobServiceClient,
  uploadToBlob,
} from './azure-storage-blob-service';

export const uploadImageBlob = (
  blobName: string,
  data: Buffer
): Promise<BlockBlobUploadResponse> => {
  return pipe(
    getEnvVar(IMAGE_UPLOADS_BLOB_CONNECTION_STRING),
    getBlobServiceClient,
    getContainerClient(getEnvVar(IMAGE_UPLOADS_BLOB_CONTAINER_NAME)),
    getBlockBlobClient(blobName),
    uploadToBlob(data)
  );
};
