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
import { EntityLoadNewImagesProvider } from './entity-load-new-images.provider';
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

jest.mock('@dark-rush-photography/api/util', () => ({
  ...jest.requireActual('@dark-rush-photography/api/util'),
}));
import * as apiUtil from '@dark-rush-photography/api/util';

describe('entity-load-new-images.provider', () => {
  let entityLoadNewImagesProvider: EntityLoadNewImagesProvider;
  let imageFolderProvider: ImageFindFolderProvider;
  let imageAddProvider: ImageAddProvider;
  let imageProcessOneProvider: ImageProcessOneProvider;
  let imageRemoveProvider: ImageRemoveAllProvider;

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
          useValue: new MockDocumentModel(),
        },
        EntityLoadNewImagesProvider,
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

    entityLoadNewImagesProvider = moduleRef.get<EntityLoadNewImagesProvider>(
      EntityLoadNewImagesProvider
    );
    imageRemoveProvider = moduleRef.get<ImageRemoveAllProvider>(
      ImageRemoveAllProvider
    );
    imageFolderProvider = moduleRef.get<ImageFindFolderProvider>(
      ImageFindFolderProvider
    );
    imageAddProvider = moduleRef.get<ImageAddProvider>(ImageAddProvider);
    imageProcessOneProvider = moduleRef.get<ImageProcessOneProvider>(
      ImageProcessOneProvider
    );
    imageRemoveProvider = moduleRef.get<ImageRemoveAllProvider>(
      ImageRemoveAllProvider
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('loadNewImages$', () => {
    beforeEach(() => {
      jest
        .spyOn(apiUtil, 'getGoogleDrive')
        .mockReturnValue({} as drive_v3.Drive);
    });

    it('should remove, add, and process new images', (done: any) => {
      const mockedRemoveAllImagesForState$ = jest
        .spyOn(imageRemoveProvider, 'removeAllImagesForState$')
        .mockReturnValue(of(undefined));

      jest
        .spyOn(imageFolderProvider, 'findNewImagesFolder$')
        .mockReturnValue(of({} as GoogleDriveFolder));

      jest
        .spyOn(apiUtil, 'getGoogleDriveImageFiles$')
        .mockReturnValue(of([{} as GoogleDriveFile] as GoogleDriveFile[]));

      const mockedAddNewImage$ = jest
        .spyOn(imageAddProvider, 'addNewImage$')
        .mockReturnValue(of({} as Image));

      const mockedProcessNewImage$ = jest
        .spyOn(imageProcessOneProvider, 'processNewImage$')
        .mockReturnValue(of(undefined));

      entityLoadNewImagesProvider
        .loadNewImages$(DUMMY_MONGODB_ID)
        .subscribe(() => {
          expect(mockedRemoveAllImagesForState$).toBeCalled();
          expect(mockedAddNewImage$).toBeCalled();
          expect(mockedProcessNewImage$).toBeCalled();
          done();
        });
    });

    it('should not add or process new images when google drive image folder is not found', (done: any) => {
      jest
        .spyOn(imageRemoveProvider, 'removeAllImagesForState$')
        .mockReturnValue(of(undefined));

      jest
        .spyOn(imageFolderProvider, 'findNewImagesFolder$')
        .mockReturnValue(of(undefined));

      jest.spyOn(apiUtil, 'getGoogleDriveImageFiles$');

      const mockedAddNewImage = jest.spyOn(imageAddProvider, 'addNewImage$');
      const mockedProcessNewImage$ = jest.spyOn(
        imageProcessOneProvider,
        'processNewImage$'
      );

      entityLoadNewImagesProvider
        .loadNewImages$(DUMMY_MONGODB_ID)
        .subscribe(() => {
          expect(mockedAddNewImage).not.toBeCalled();
          expect(mockedProcessNewImage$).not.toBeCalled();
          done();
        });
    });

    it('should not add or process new images when google drive files are empty', (done: any) => {
      jest
        .spyOn(imageRemoveProvider, 'removeAllImagesForState$')
        .mockReturnValue(of(undefined));

      jest
        .spyOn(imageFolderProvider, 'findNewImagesFolder$')
        .mockReturnValue(of({} as GoogleDriveFolder));

      jest
        .spyOn(apiUtil, 'getGoogleDriveImageFiles$')
        .mockReturnValue(of([] as GoogleDriveFile[]));

      const mockedAddNewImage$ = jest.spyOn(imageAddProvider, 'addNewImage$');

      const mockedProcessNewImage$ = jest.spyOn(
        imageProcessOneProvider,
        'processNewImage$'
      );

      entityLoadNewImagesProvider
        .loadNewImages$(DUMMY_MONGODB_ID)
        .subscribe(() => {
          expect(mockedAddNewImage$).not.toBeCalled();
          expect(mockedProcessNewImage$).not.toBeCalled();
          done();
        });
    });

    it('should add and process multiple new images', (done: any) => {
      jest
        .spyOn(imageRemoveProvider, 'removeAllImagesForState$')
        .mockReturnValue(of(undefined));

      jest
        .spyOn(imageFolderProvider, 'findNewImagesFolder$')
        .mockReturnValue(of({} as GoogleDriveFolder));

      jest
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

      entityLoadNewImagesProvider
        .loadNewImages$(DUMMY_MONGODB_ID)
        .subscribe(() => {
          expect(mockedAddNewImage$).toBeCalledTimes(2);
          expect(mockedProcessNewImage$).toBeCalledTimes(2);
          done();
        });
    });
  });
});
