/* eslint-disable @typescript-eslint/no-explicit-any */
import { Test } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';

import faker from '@faker-js/faker';
import { of } from 'rxjs';

import {
  ImageDimensionStandard,
  ImageDimensionType,
} from '@dark-rush-photography/shared/types';
import { ConfigProvider } from './config.provider';
import { ImageDeleteBlobsProvider } from './image-delete-blobs.provider';

jest.mock('@dark-rush-photography/api/util', () => ({
  ...jest.requireActual('@dark-rush-photography/api/util'),
}));
import * as apiUtil from '@dark-rush-photography/api/util';

describe('image-delete-blobs.provider', () => {
  let imageDeleteBlobsProvider: ImageDeleteBlobsProvider;

  beforeEach(async () => {
    class MockConfigProvider {
      get azureStorageConnectionStringPublic(): string {
        return faker.lorem.word();
      }
      get azureStorageBlobContainerNamePublic(): string {
        return faker.lorem.word();
      }
    }

    const moduleRef = await Test.createTestingModule({
      providers: [
        ConfigService,
        {
          provide: ConfigProvider,
          useClass: MockConfigProvider,
        },
        ImageDeleteBlobsProvider,
      ],
    }).compile();

    imageDeleteBlobsProvider = moduleRef.get<ImageDeleteBlobsProvider>(
      ImageDeleteBlobsProvider
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('deleteImageBlobs$', () => {
    it('should delete image dimension and image blobs for an entity', (done: any) => {
      const mockedGetImageDimensions = jest
        .spyOn(apiUtil, 'getImageDimensions')
        .mockReturnValue([
          {
            type: faker.random.arrayElement(Object.values(ImageDimensionType)),
          } as ImageDimensionStandard,
          {
            type: faker.random.arrayElement(Object.values(ImageDimensionType)),
          } as ImageDimensionStandard,
        ]);

      const mockedGetAzureStorageBlobPathWithImageDimension = jest
        .spyOn(apiUtil, 'getAzureStorageBlobPathWithImageDimension')
        .mockReturnValue(faker.internet.url());

      const mockedGetAzureStorageBlobPath = jest
        .spyOn(apiUtil, 'getAzureStorageBlobPath')
        .mockReturnValue(faker.internet.url());

      const mockedDeleteAzureStorageBlobIfExists$ = jest
        .spyOn(apiUtil, 'deleteAzureStorageBlobIfExists$')
        .mockReturnValue(of(undefined));

      const storageId = faker.datatype.uuid();
      const pathname = faker.lorem.word();

      imageDeleteBlobsProvider
        .deleteImageBlobs$(storageId, pathname)
        .subscribe(() => {
          expect(mockedGetImageDimensions).toBeCalledTimes(1);
          expect(
            mockedGetAzureStorageBlobPathWithImageDimension
          ).toBeCalledTimes(2);
          expect(mockedGetAzureStorageBlobPath).toBeCalledTimes(1);
          expect(mockedDeleteAzureStorageBlobIfExists$).toBeCalledTimes(3);
          done();
        });
    });
  });

  describe('deleteVideoBlob$', () => {
    it('should delete video blob for an entity', (done: any) => {
      const mockedGetAzureStorageBlobPath = jest
        .spyOn(apiUtil, 'getAzureStorageBlobPath')
        .mockReturnValue(faker.lorem.word());

      const mockedDeleteAzureStorageBlobIfExists$ = jest
        .spyOn(apiUtil, 'deleteAzureStorageBlobIfExists$')
        .mockReturnValue(of(undefined));

      imageDeleteBlobsProvider
        .deleteImageVideoBlob$(faker.datatype.uuid(), faker.lorem.word())
        .subscribe(() => {
          expect(mockedGetAzureStorageBlobPath).toBeCalledTimes(1);
          expect(mockedDeleteAzureStorageBlobIfExists$).toBeCalledTimes(1);
          done();
        });
    });
  });
});
