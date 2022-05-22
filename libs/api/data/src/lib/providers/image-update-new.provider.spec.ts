/* eslint-disable @typescript-eslint/no-explicit-any */
import { Test } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { getModelToken } from '@nestjs/mongoose';

import { of } from 'rxjs';
import { drive_v3 } from 'googleapis';

import {
  DUMMY_MONGODB_ID,
  GoogleDriveFile,
  GoogleDriveFolder,
  Image,
} from '@dark-rush-photography/shared/types';
import { Document } from '../schema/document.schema';
import { ConfigProvider } from './config.provider';
import { ImageFindFolderProvider } from './image-find-folder.provider';
import { ImageAddProvider } from './image-add.provider';
import { ImageAddBlobProvider } from './image-add-blob.provider';
import { ImageProcessOneProvider } from './image-process-one.provider';
import { ImageExifProvider } from './image-exif.provider';
import { ImageTinifyProvider } from './image-tinify.provider';
import { ImageResizeProvider } from './image-resize.provider';
import { ImageRemoveAllProvider } from './image-remove-all.provider';
import { ImageRemoveOneProvider } from './image-remove-one.provider';
import { ImageDeleteBlobsProvider } from './image-delete-blobs.provider';
import { ImageUpdateNewProvider } from './image-update-new.provider';

jest.mock('@dark-rush-photography/api/util', () => ({
  ...jest.requireActual('@dark-rush-photography/api/util'),
}));
import * as apiUtil from '@dark-rush-photography/api/util';

describe('image-update-new.provider', () => {
  let imageUpdateNewProvider: ImageUpdateNewProvider;
  let imageRemoveAllProvider: ImageRemoveAllProvider;
  let imageFindFolderProvider: ImageFindFolderProvider;
  let imageAddProvider: ImageAddProvider;
  let imageProcessOneProvider: ImageProcessOneProvider;

  beforeEach(async () => {
    class MockConfigProvider {}
    class MockDocumentModel {}

    const moduleRef = await Test.createTestingModule({
      providers: [
        ConfigService,
        {
          provide: ConfigProvider,
          useClass: MockConfigProvider,
        },
        {
          provide: getModelToken(Document.name),
          useClass: MockDocumentModel,
        },
        ImageUpdateNewProvider,
        ImageFindFolderProvider,
        ImageAddProvider,
        ImageProcessOneProvider,
        ImageTinifyProvider,
        ImageExifProvider,
        ImageResizeProvider,
        ImageAddBlobProvider,
        ImageRemoveAllProvider,
        ImageRemoveOneProvider,
        ImageDeleteBlobsProvider,
      ],
    }).compile();
    imageUpdateNewProvider = moduleRef.get<ImageUpdateNewProvider>(
      ImageUpdateNewProvider
    );
    imageRemoveAllProvider = moduleRef.get<ImageRemoveAllProvider>(
      ImageRemoveAllProvider
    );
    imageFindFolderProvider = moduleRef.get<ImageFindFolderProvider>(
      ImageFindFolderProvider
    );
    imageAddProvider = moduleRef.get<ImageAddProvider>(ImageAddProvider);
    imageProcessOneProvider = moduleRef.get<ImageProcessOneProvider>(
      ImageProcessOneProvider
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('updateNewImages$', () => {
    beforeEach(() => {
      jest
        .spyOn(apiUtil, 'getGoogleDrive')
        .mockReturnValue({} as drive_v3.Drive);
    });

    it('should update new images', (done: any) => {
      const mockedRemoveAllImages$ = jest
        .spyOn(imageRemoveAllProvider, 'removeAllNewImages$')
        .mockReturnValue(of(undefined));

      const mockedFindNewImagesFolder$ = jest
        .spyOn(imageFindFolderProvider, 'findNewImagesFolder$')
        .mockReturnValue(of({} as GoogleDriveFolder));

      const mockedGetGoogleDriveImageFiles$ = jest
        .spyOn(apiUtil, 'getGoogleDriveImageFiles$')
        .mockReturnValue(
          of([
            {} as GoogleDriveFile,
            {} as GoogleDriveFile,
          ] as GoogleDriveFile[])
        );

      const mockedAddNewImage$ = jest
        .spyOn(imageAddProvider, 'addNewImage$')
        .mockReturnValue(of({} as Image));

      const mockedProcessNewImage$ = jest
        .spyOn(imageProcessOneProvider, 'processNewImage$')
        .mockReturnValue(of(undefined));

      imageUpdateNewProvider
        .updateNewImages$({} as drive_v3.Drive, DUMMY_MONGODB_ID)
        .subscribe(() => {
          expect(mockedRemoveAllImages$).toBeCalledTimes(1);
          expect(mockedFindNewImagesFolder$).toBeCalledTimes(1);
          expect(mockedGetGoogleDriveImageFiles$).toBeCalledTimes(1);
          expect(mockedAddNewImage$).toBeCalledTimes(2);
          expect(mockedProcessNewImage$).toBeCalledTimes(2);
          done();
        });
    });

    it('should not update new images when new images folder is not found', (done: any) => {
      const mockedRemoveAllImages$ = jest
        .spyOn(imageRemoveAllProvider, 'removeAllNewImages$')
        .mockReturnValue(of(undefined));

      const mockedFindNewImagesFolder$ = jest
        .spyOn(imageFindFolderProvider, 'findNewImagesFolder$')
        .mockReturnValue(of(undefined));

      const mockedGetGoogleDriveImageFiles$ = jest.spyOn(
        apiUtil,
        'getGoogleDriveImageFiles$'
      );

      const mockedAddNewImage$ = jest.spyOn(imageAddProvider, 'addNewImage$');

      const mockedProcessNewImage$ = jest.spyOn(
        imageProcessOneProvider,
        'processNewImage$'
      );

      imageUpdateNewProvider
        .updateNewImages$({} as drive_v3.Drive, DUMMY_MONGODB_ID)
        .subscribe(() => {
          expect(mockedRemoveAllImages$).toBeCalledTimes(1);
          expect(mockedFindNewImagesFolder$).toBeCalledTimes(1);
          expect(mockedGetGoogleDriveImageFiles$).not.toBeCalled();
          expect(mockedAddNewImage$).not.toBeCalled();
          expect(mockedProcessNewImage$).not.toBeCalled();
          done();
        });
    });

    it('should not update new images when there are not any google drive image files', (done: any) => {
      const mockedRemoveAllImages$ = jest
        .spyOn(imageRemoveAllProvider, 'removeAllNewImages$')
        .mockReturnValue(of(undefined));

      const mockedFindNewImagesFolder$ = jest
        .spyOn(imageFindFolderProvider, 'findNewImagesFolder$')
        .mockReturnValue(of({} as GoogleDriveFolder));

      const mockedGetGoogleDriveImageFiles$ = jest
        .spyOn(apiUtil, 'getGoogleDriveImageFiles$')
        .mockReturnValue(of([] as GoogleDriveFile[]));

      const mockedAddNewImage$ = jest.spyOn(imageAddProvider, 'addNewImage$');

      const mockedProcessNewImage$ = jest.spyOn(
        imageProcessOneProvider,
        'processNewImage$'
      );

      imageUpdateNewProvider
        .updateNewImages$({} as drive_v3.Drive, DUMMY_MONGODB_ID)
        .subscribe(() => {
          expect(mockedRemoveAllImages$).toBeCalledTimes(1);
          expect(mockedFindNewImagesFolder$).toBeCalledTimes(1);
          expect(mockedGetGoogleDriveImageFiles$).toBeCalledTimes(1);
          expect(mockedAddNewImage$).not.toBeCalled();
          expect(mockedProcessNewImage$).not.toBeCalled();
          done();
        });
    });

    it('should not process a new image when a new image cannot be added', (done: any) => {
      const mockedRemoveAllImages$ = jest
        .spyOn(imageRemoveAllProvider, 'removeAllNewImages$')
        .mockReturnValue(of(undefined));

      const mockedFindNewImagesFolder$ = jest
        .spyOn(imageFindFolderProvider, 'findNewImagesFolder$')
        .mockReturnValue(of({} as GoogleDriveFolder));

      const mockedGetGoogleDriveImageFiles$ = jest
        .spyOn(apiUtil, 'getGoogleDriveImageFiles$')
        .mockReturnValue(
          of([
            {} as GoogleDriveFile,
            {} as GoogleDriveFile,
          ] as GoogleDriveFile[])
        );

      const mockedAddNewImage$ = jest
        .spyOn(imageAddProvider, 'addNewImage$')
        .mockReturnValue(of(undefined));

      const mockedProcessNewImage$ = jest.spyOn(
        imageProcessOneProvider,
        'processNewImage$'
      );

      imageUpdateNewProvider
        .updateNewImages$({} as drive_v3.Drive, DUMMY_MONGODB_ID)
        .subscribe(() => {
          expect(mockedRemoveAllImages$).toBeCalledTimes(1);
          expect(mockedFindNewImagesFolder$).toBeCalledTimes(1);
          expect(mockedGetGoogleDriveImageFiles$).toBeCalledTimes(1);
          expect(mockedAddNewImage$).toBeCalledTimes(2);
          expect(mockedProcessNewImage$).not.toBeCalled();
          done();
        });
    });
  });
});
