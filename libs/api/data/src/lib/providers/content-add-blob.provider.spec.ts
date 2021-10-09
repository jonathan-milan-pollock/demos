/* eslint-disable @typescript-eslint/no-explicit-any */
import { Test } from '@nestjs/testing';
import { ReadStream } from 'fs';
import { Readable } from 'stream';
import { ConfigService } from '@nestjs/config';

import * as faker from 'faker';
import { of } from 'rxjs';
import { drive_v3 } from 'googleapis';

import {
  GoogleDriveFile,
  Image,
  ImageDimensionType,
} from '@dark-rush-photography/shared/types';
import { ConfigProvider } from './config.provider';
import { ContentAddBlobProvider } from './content-add-blob.provider';

jest.mock('fs-extra', () => ({
  ...jest.requireActual('fs-extra'),
}));
import * as fsExtra from 'fs-extra';

jest.mock('@dark-rush-photography/api/util', () => ({
  ...jest.requireActual('@dark-rush-photography/api/util'),
}));
import * as apiUtils from '@dark-rush-photography/api/util';

describe('content-add-blob.provider', () => {
  let contentAddBlobProvider: ContentAddBlobProvider;

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
        ContentAddBlobProvider,
      ],
    }).compile();

    contentAddBlobProvider = moduleRef.get<ContentAddBlobProvider>(
      ContentAddBlobProvider
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('addNewImageBlob$', () => {
    it('should download an image file from google drive and upload to azure', (done: any) => {
      const mockedDownloadGoogleDriveImageFile = jest
        .spyOn(apiUtils, 'downloadGoogleDriveImageFile')
        .mockReturnValue(Promise.resolve(faker.system.filePath()));

      jest.spyOn(fsExtra, 'createReadStream').mockReturnValue({} as ReadStream);

      jest
        .spyOn(apiUtils, 'getAzureStorageBlobPath')
        .mockReturnValue(faker.lorem.word());

      const mockedUploadAzureStorageStreamToBlob$ = jest
        .spyOn(apiUtils, 'uploadAzureStorageStreamToBlob$')
        .mockReturnValue(of(undefined));

      contentAddBlobProvider
        .addNewImageBlob$(
          {} as drive_v3.Drive,
          {} as GoogleDriveFile,
          {} as Image
        )
        .subscribe(() => {
          expect(mockedDownloadGoogleDriveImageFile).toBeCalled();
          expect(mockedUploadAzureStorageStreamToBlob$).toBeCalled();
          done();
        });
    });
  });

  describe('addUploadImageBlob$', () => {
    it('should upload an image to azure', (done: any) => {
      jest.spyOn(Readable, 'from').mockReturnValue({} as Readable);

      jest
        .spyOn(apiUtils, 'getAzureStorageBlobPath')
        .mockReturnValue(faker.lorem.word());

      const mockedUploadAzureStorageStreamToBlob$ = jest
        .spyOn(apiUtils, 'uploadAzureStorageStreamToBlob$')
        .mockReturnValue(of(undefined));

      contentAddBlobProvider
        .addUploadImageBlob$({} as Image, {} as Express.Multer.File)
        .subscribe(() => {
          expect(mockedUploadAzureStorageStreamToBlob$).toBeCalled();
          done();
        });
    });
  });

  describe('addImageDimensionBlob$', () => {
    it('should upload an image dimension to azure', (done: any) => {
      jest.spyOn(fsExtra, 'createReadStream').mockReturnValue({} as ReadStream);

      jest
        .spyOn(apiUtils, 'getAzureStorageBlobPathWithImageDimension')
        .mockReturnValue(faker.lorem.word());

      const mockedUploadAzureStorageStreamToBlob$ = jest
        .spyOn(apiUtils, 'uploadAzureStorageStreamToBlob$')
        .mockReturnValue(of(undefined));

      contentAddBlobProvider
        .addImageDimensionBlob$(
          faker.datatype.uuid(),
          faker.system.fileName(),
          faker.random.arrayElement(Object.values(ImageDimensionType)),
          faker.system.filePath()
        )
        .subscribe(() => {
          expect(mockedUploadAzureStorageStreamToBlob$).toBeCalled();
          done();
        });
    });
  });
});
