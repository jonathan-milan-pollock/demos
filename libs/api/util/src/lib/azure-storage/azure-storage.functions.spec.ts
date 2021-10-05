/* eslint-disable @typescript-eslint/no-explicit-any */
import * as faker from 'faker';
import { of } from 'rxjs';
import {
  BlobDeleteIfExistsResponse,
  BlobServiceClient,
  BlockBlobClient,
  ContainerClient,
} from '@azure/storage-blob';

import { deleteAzureStorageBlockBlobIfExists$ } from './azure-storage.functions';

jest.mock('@azure/storage-blob', () => ({
  ...jest.requireActual('@azure/storage-blob'),
}));
import * as azureStorageBlob from '@azure/storage-blob';

describe('azure-storage.functions', () => {
  let mockedDeleteIfExists: any;

  beforeEach(() => {
    mockedDeleteIfExists = jest
      .fn()
      .mockReturnValue(of({} as BlobDeleteIfExistsResponse));

    jest
      .spyOn(azureStorageBlob.BlobServiceClient, 'fromConnectionString')
      .mockReturnValue({
        getContainerClient: jest.fn().mockReturnValue({
          getBlockBlobClient: jest.fn().mockReturnValue({
            deleteIfExists: mockedDeleteIfExists,
          } as BlockBlobClient),
        } as unknown as ContainerClient),
      } as unknown as BlobServiceClient);
  });

  describe('deleteBlob$', () => {
    it('should delete a blob', (done: any) => {
      deleteAzureStorageBlockBlobIfExists$(
        faker.internet.url(),
        faker.lorem.word(),
        faker.lorem.word()
      ).subscribe(() => {
        expect(mockedDeleteIfExists).toBeCalled();
        done();
      });
    });
  });
});
