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
import { ImageAddBlobProvider } from './image-add-blob.provider';

jest.mock('fs-extra', () => ({
  ...jest.requireActual('fs-extra'),
}));
import * as fsExtra from 'fs-extra';

jest.mock('@dark-rush-photography/api/util', () => ({
  ...jest.requireActual('@dark-rush-photography/api/util'),
}));
import * as apiUtil from '@dark-rush-photography/api/util';

describe('image-add-blob.provider', () => {
  let imageAddBlobProvider: ImageAddBlobProvider;

  beforeEach(async () => {
    const mockedConfigProvider = {
      azureStorageConnectionStringPublic: jest
        .fn()
        .mockReturnValue(faker.lorem.word()),
      azureStorageBlobContainerNamePublic: jest
        .fn()
        .mockReturnValue(faker.lorem.word()),
    };

    const moduleRef = await Test.createTestingModule({
      providers: [
        ConfigService,
        {
          provide: ConfigProvider,
          useValue: mockedConfigProvider,
        },
        ImageAddBlobProvider,
      ],
    }).compile();

    imageAddBlobProvider =
      moduleRef.get<ImageAddBlobProvider>(ImageAddBlobProvider);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('addNewImageBlob$', () => {
    it('should download an image file from google drive and upload to azure', (done: any) => {
      const mockedDownloadGoogleDriveImageFile = jest
        .spyOn(apiUtil, 'downloadGoogleDriveImageFile')
        .mockReturnValue(Promise.resolve(faker.system.filePath()));

      const mockedCreateReadStream = jest
        .spyOn(fsExtra, 'createReadStream')
        .mockReturnValue({} as ReadStream);

      const mockedGetAzureStorageBlobPath = jest
        .spyOn(apiUtil, 'getAzureStorageBlobPath')
        .mockReturnValue(faker.lorem.word());

      const mockedUploadAzureStorageStreamToBlob$ = jest
        .spyOn(apiUtil, 'uploadAzureStorageStreamToBlob$')
        .mockReturnValue(of(undefined));

      imageAddBlobProvider
        .addNewImageBlob$(
          {} as drive_v3.Drive,
          {} as GoogleDriveFile,
          {} as Image
        )
        .subscribe(() => {
          expect(mockedDownloadGoogleDriveImageFile).toBeCalledTimes(1);
          expect(mockedCreateReadStream).toBeCalledTimes(1);
          expect(mockedGetAzureStorageBlobPath).toBeCalledTimes(1);
          expect(mockedUploadAzureStorageStreamToBlob$).toBeCalledTimes(1);
          done();
        });
    });
  });

  describe('addUploadImageBlob$', () => {
    it('should upload an image to azure', (done: any) => {
      const mockedReadableFrom = jest
        .spyOn(Readable, 'from')
        .mockReturnValue({} as Readable);

      const mockedGetAzureStorageBlobPath = jest
        .spyOn(apiUtil, 'getAzureStorageBlobPath')
        .mockReturnValue(faker.lorem.word());

      const mockedUploadAzureStorageStreamToBlob$ = jest
        .spyOn(apiUtil, 'uploadAzureStorageStreamToBlob$')
        .mockReturnValue(of(undefined));

      imageAddBlobProvider
        .addImagePostImageBlob$({} as Image, {} as Express.Multer.File)
        .subscribe(() => {
          expect(mockedReadableFrom).toBeCalledTimes(1);
          expect(mockedGetAzureStorageBlobPath).toBeCalledTimes(1);
          expect(mockedUploadAzureStorageStreamToBlob$).toBeCalledTimes(1);
          done();
        });
    });
  });

  describe('addImageDimensionBlob$', () => {
    it('should upload an image dimension to azure', (done: any) => {
      const mockedCreateReadStream = jest
        .spyOn(fsExtra, 'createReadStream')
        .mockReturnValue({} as ReadStream);

      const mockedGetAzureStorageBlobPathWithImageDimension = jest
        .spyOn(apiUtil, 'getAzureStorageBlobPathWithImageDimension')
        .mockReturnValue(faker.lorem.word());

      const mockedUploadAzureStorageStreamToBlob$ = jest
        .spyOn(apiUtil, 'uploadAzureStorageStreamToBlob$')
        .mockReturnValue(of(undefined));

      imageAddBlobProvider
        .addImageDimensionBlob$(
          faker.datatype.uuid(),
          faker.lorem.word(),
          faker.system.fileExt(),
          faker.random.arrayElement(Object.values(ImageDimensionType)),
          faker.system.filePath()
        )
        .subscribe(() => {
          expect(mockedCreateReadStream).toBeCalledTimes(1);
          expect(
            mockedGetAzureStorageBlobPathWithImageDimension
          ).toBeCalledTimes(1);
          expect(mockedUploadAzureStorageStreamToBlob$).toBeCalledTimes(1);
          done();
        });
    });
  });
});
