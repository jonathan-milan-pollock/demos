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
  downloadFromBlob,
  getStreamFromBlobDownload,
} from './azure-storage-blob-service';
import { writeStreamToFile } from './image-file-service';

export const downloadImageBlobToFile = (
  blobName: string,
  fileName: string
): Promise<void> => {
  const imageUploadsBlockBlobClient = pipe(
    getEnvVar(IMAGE_UPLOADS_BLOB_CONNECTION_STRING),
    getBlobServiceClient,
    getContainerClient(getEnvVar(IMAGE_UPLOADS_BLOB_CONTAINER_NAME)),
    getBlockBlobClient(blobName)
  );

  return downloadFromBlob(imageUploadsBlockBlobClient)
    .then(getStreamFromBlobDownload)
    .then((readableStream) => writeStreamToFile(readableStream, fileName));
};

/**
 *     const body: Buffer[] = [];
    req.on('data', (chunk: string) => {
      console.log(chunk);
      body.push(Buffer.from(chunk));
    });
    return req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1];
      return fs.promises
        .writeFile('message.txt', message)
        .then(() => {
          res.statusCode = 302;
          res.setHeader('Location', '/');
          return res.end();
        })
        .catch((err: string) => {
          console.log(err);
          res.statusCode = 500;
          return res.end();
        });
    });
  }
 * 
 */
