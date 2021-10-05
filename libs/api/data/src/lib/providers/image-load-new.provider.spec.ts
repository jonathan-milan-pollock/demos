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
} from '@dark-rush-photography/shared/types';
import { Document } from '../schema/document.schema';
import { ConfigProvider } from './config.provider';
import { ImageLoadNewProvider } from './image-load-new.provider';
import { ImageFolderProvider } from './image-folder.provider';
import { ImageAddNewProvider } from './image-add-new.provider';
import { ImageProcessProvider } from './image-process.provider';
import { ContentRemoveProvider } from './content-remove.provider';
import { ContentRemoveOneProvider } from './content-remove-one.provider';
import { ContentDeleteBlobsProvider } from './content-delete-blobs.provider';

jest.mock('@dark-rush-photography/api/util', () => ({
  ...jest.requireActual('@dark-rush-photography/api/util'),
}));
import * as apiUtil from '@dark-rush-photography/api/util';

describe('image-load-new.provider', () => {
  let imageLoadNewProvider: ImageLoadNewProvider;
  let contentRemoveProvider: ContentRemoveProvider;
  let imageFolderProvider: ImageFolderProvider;
  let imageAddNewProvider: ImageAddNewProvider;

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
        ImageLoadNewProvider,
        ImageFolderProvider,
        ImageAddNewProvider,
        ImageProcessProvider,
        ContentRemoveProvider,
        ContentRemoveOneProvider,
        ContentDeleteBlobsProvider,
      ],
    }).compile();

    imageLoadNewProvider =
      moduleRef.get<ImageLoadNewProvider>(ImageLoadNewProvider);
    contentRemoveProvider = moduleRef.get<ContentRemoveProvider>(
      ContentRemoveProvider
    );
    imageFolderProvider =
      moduleRef.get<ImageFolderProvider>(ImageFolderProvider);
    imageAddNewProvider =
      moduleRef.get<ImageAddNewProvider>(ImageAddNewProvider);
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

    it('should remove and add new images', (done: any) => {
      const mockedRemoveAllImagesForState$ = jest
        .spyOn(contentRemoveProvider, 'removeAllImagesForState$')
        .mockReturnValue(of(undefined));

      jest
        .spyOn(imageFolderProvider, 'findNewImagesFolder$')
        .mockReturnValue(of({} as GoogleDriveFolder));

      jest
        .spyOn(apiUtil, 'getGoogleDriveImageFiles$')
        .mockReturnValue(of([{} as GoogleDriveFile] as GoogleDriveFile[]));

      const mockedAddNewImage$ = jest
        .spyOn(imageAddNewProvider, 'addNewImage$')
        .mockReturnValue(of(undefined));

      imageLoadNewProvider.loadNewImages$(DUMMY_MONGODB_ID).subscribe(() => {
        expect(mockedRemoveAllImagesForState$).toBeCalled();
        expect(mockedAddNewImage$).toBeCalled();
        done();
      });
    });

    it('should not add new images when google drive image folder is not found', (done: any) => {
      jest
        .spyOn(contentRemoveProvider, 'removeAllImagesForState$')
        .mockReturnValue(of(undefined));

      jest
        .spyOn(imageFolderProvider, 'findNewImagesFolder$')
        .mockReturnValue(of(undefined));

      jest.spyOn(apiUtil, 'getGoogleDriveImageFiles$');

      const mockedAddNewImage = jest.spyOn(imageAddNewProvider, 'addNewImage$');

      imageLoadNewProvider.loadNewImages$(DUMMY_MONGODB_ID).subscribe(() => {
        expect(mockedAddNewImage).not.toBeCalled();
        done();
      });
    });

    it('should not add new images when google drive files are empty', (done: any) => {
      jest
        .spyOn(contentRemoveProvider, 'removeAllImagesForState$')
        .mockReturnValue(of(undefined));

      jest
        .spyOn(imageFolderProvider, 'findNewImagesFolder$')
        .mockReturnValue(of({} as GoogleDriveFolder));

      jest
        .spyOn(apiUtil, 'getGoogleDriveImageFiles$')
        .mockReturnValue(of([] as GoogleDriveFile[]));

      const mockedAddNewImage$ = jest.spyOn(
        imageAddNewProvider,
        'addNewImage$'
      );

      imageLoadNewProvider.loadNewImages$(DUMMY_MONGODB_ID).subscribe(() => {
        expect(mockedAddNewImage$).not.toBeCalled();
        done();
      });
    });
  });
});
