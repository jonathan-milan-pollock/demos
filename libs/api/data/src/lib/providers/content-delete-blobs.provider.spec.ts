/* eslint-disable @typescript-eslint/no-explicit-any */
import { Test } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';

import * as faker from 'faker';
import { of } from 'rxjs';

import {
  ImageDimensionStandard,
  ImageDimensionType,
} from '@dark-rush-photography/shared/types';
import { ConfigProvider } from './config.provider';
import { ContentDeleteBlobsProvider } from './content-delete-blobs.provider';

jest.mock('@dark-rush-photography/api/util', () => ({
  ...jest.requireActual('@dark-rush-photography/api/util'),
}));
import * as apiUtils from '@dark-rush-photography/api/util';

describe('content-delete-blobs.provider', () => {
  let contentDeleteBlobsProvider: ContentDeleteBlobsProvider;

  beforeEach(async () => {
    class MockConfigProvider {
      get azureStorageConnectionStringPublic(): string {
        return '';
      }
      get azureStorageBlobContainerNamePublic(): string {
        return '';
      }
    }

    const moduleRef = await Test.createTestingModule({
      providers: [
        ConfigService,
        {
          provide: ConfigProvider,
          useClass: MockConfigProvider,
        },
        ContentDeleteBlobsProvider,
      ],
    }).compile();

    contentDeleteBlobsProvider = moduleRef.get<ContentDeleteBlobsProvider>(
      ContentDeleteBlobsProvider
    );

    jest
      .spyOn(apiUtils, 'getAzureStorageBlobPath')
      .mockReturnValue(faker.lorem.word());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('deleteImageBlobs$', () => {
    beforeEach(() => {
      jest
        .spyOn(apiUtils, 'getAzureStorageBlobPathWithImageDimension')
        .mockReturnValue(faker.lorem.word());
    });

    it('should delete image blob and image dimension blobs for an entity', (done: any) => {
      const imageDimensionType = faker.random.arrayElement(
        Object.values(ImageDimensionType)
      );
      jest
        .spyOn(apiUtils, 'getImageDimensions')
        .mockReturnValue([
          { type: imageDimensionType } as ImageDimensionStandard,
        ]);

      const mockedDeleteAzureStorageBlockBlobIfExists$ = jest
        .spyOn(apiUtils, 'deleteAzureStorageBlockBlobIfExists$')
        .mockReturnValue(of(undefined));

      contentDeleteBlobsProvider
        .deleteImageBlobs$(faker.datatype.uuid(), faker.system.fileName())
        .subscribe(() => {
          expect(mockedDeleteAzureStorageBlockBlobIfExists$).toBeCalledTimes(2);
          done();
        });
    });
  });

  describe('deleteVideoBlob$', () => {
    it('should delete video blob for an entity', (done: any) => {
      const mockedDeleteAzureStorageBlockBlobIfExists$ = jest
        .spyOn(apiUtils, 'deleteAzureStorageBlockBlobIfExists$')
        .mockReturnValue(of(undefined));

      contentDeleteBlobsProvider
        .deleteVideoBlob$(faker.datatype.uuid(), faker.system.fileName())
        .subscribe(() => {
          expect(mockedDeleteAzureStorageBlockBlobIfExists$).toBeCalled();
          done();
        });
    });
  });
});
