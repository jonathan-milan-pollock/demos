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
        ContentDeleteBlobsProvider,
      ],
    }).compile();

    contentDeleteBlobsProvider = moduleRef.get<ContentDeleteBlobsProvider>(
      ContentDeleteBlobsProvider
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('deleteImageBlobs$', () => {
    it('should delete image dimension and image blobs for an entity', (done: any) => {
      const imageDimensionType = faker.random.arrayElement(
        Object.values(ImageDimensionType)
      );
      jest
        .spyOn(apiUtils, 'getImageDimensions')
        .mockReturnValue([
          { type: imageDimensionType } as ImageDimensionStandard,
        ]);

      const mockedDeleteAzureStorageBlobIfExists$ = jest
        .spyOn(apiUtils, 'deleteAzureStorageBlobIfExists$')
        .mockReturnValue(of(undefined));

      const storageId = faker.datatype.uuid();
      const fileName = faker.system.fileName();
      contentDeleteBlobsProvider
        .deleteImageBlobs$(storageId, fileName)
        .subscribe(() => {
          expect(mockedDeleteAzureStorageBlobIfExists$).toBeCalledTimes(2);

          const [imageDimensionBlobPath] =
            mockedDeleteAzureStorageBlobIfExists$.mock.calls[0];
          expect(imageDimensionBlobPath).toBe(
            `${storageId}/${imageDimensionType.toLowerCase()}/${fileName}`
          );

          const [imageBlobPath] =
            mockedDeleteAzureStorageBlobIfExists$.mock.calls[1];
          expect(imageBlobPath).toBe(`${storageId}/${fileName}`);
          done();
        });
    });
  });

  describe('deleteVideoBlob$', () => {
    it('should delete video blob for an entity', (done: any) => {
      jest
        .spyOn(apiUtils, 'getAzureStorageBlobPath')
        .mockReturnValue(faker.lorem.word());

      const mockedDeleteAzureStorageBlobIfExists$ = jest
        .spyOn(apiUtils, 'deleteAzureStorageBlobIfExists$')
        .mockReturnValue(of(undefined));

      contentDeleteBlobsProvider
        .deleteVideoBlob$(faker.datatype.uuid(), faker.system.fileName())
        .subscribe(() => {
          expect(mockedDeleteAzureStorageBlobIfExists$).toBeCalled();
          done();
        });
    });
  });
});
