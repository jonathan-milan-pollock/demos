/* eslint-disable @typescript-eslint/no-explicit-any */
import * as faker from 'faker';
import {
  BlobDeleteIfExistsResponse,
  BlobDownloadResponseParsed,
  BlobServiceClient,
  BlobUploadCommonResponse,
  BlockBlobClient,
  ContainerClient,
} from '@azure/storage-blob';

import { deleteAzureStorageBlobIfExists$ } from './azure-storage.functions';

jest.mock('@azure/storage-blob', () => ({
  ...jest.requireActual('@azure/storage-blob'),
}));
import * as azureStorageBlob from '@azure/storage-blob';

describe('azure-storage.functions', () => {
  let mockedUploadData: any;
  let mockedDownload: any;
  let mockedDeleteIfExists: any;

  beforeEach(() => {
    mockedUploadData = jest
      .fn()
      .mockReturnValue(Promise.resolve({} as BlobUploadCommonResponse));
    mockedDownload = jest
      .fn()
      .mockResolvedValue(Promise.resolve({} as BlobDownloadResponseParsed));
    mockedDeleteIfExists = jest
      .fn()
      .mockReturnValue(Promise.resolve({} as BlobDeleteIfExistsResponse));

    jest
      .spyOn(azureStorageBlob.BlobServiceClient, 'fromConnectionString')
      .mockReturnValue({
        getContainerClient: jest.fn().mockReturnValue({
          getBlockBlobClient: jest.fn().mockReturnValue({
            uploadData: mockedUploadData,
            download: mockedDownload,
            deleteIfExists: mockedDeleteIfExists,
          } as BlockBlobClient),
        } as unknown as ContainerClient),
      } as unknown as BlobServiceClient);
  });

  describe('deleteBlob$', () => {
    it('should delete a blob', (done: any) => {
      deleteAzureStorageBlobIfExists$(
        faker.lorem.word(),
        faker.internet.url(),
        faker.lorem.word()
      ).subscribe(() => {
        expect(mockedDeleteIfExists).toBeCalledTimes(1);
        done();
      });
    });
  });

  describe('deleteBlob$', () => {
    it('should delete a blob', (done: any) => {
      deleteAzureStorageBlobIfExists$(
        faker.lorem.word(),
        faker.internet.url(),
        faker.lorem.word()
      ).subscribe(() => {
        expect(mockedDeleteIfExists).toBeCalledTimes(1);
        done();
      });
    });
  });
});
