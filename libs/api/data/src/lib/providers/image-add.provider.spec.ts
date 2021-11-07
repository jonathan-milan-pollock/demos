/* eslint-disable @typescript-eslint/no-explicit-any */
import { Test } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getModelToken } from '@nestjs/mongoose';

import * as faker from 'faker';
import { of } from 'rxjs';
import { drive_v3 } from 'googleapis';

import {
  DUMMY_MONGODB_ID,
  GoogleDriveFile,
  Image,
} from '@dark-rush-photography/shared/types';
import { Document, DocumentModel } from '../schema/document.schema';
import { ConfigProvider } from './config.provider';
import { ImageAddProvider } from './image-add.provider';
import { ImageAddBlobProvider } from './image-add-blob.provider';

jest.mock('@dark-rush-photography/api/util', () => ({
  ...jest.requireActual('@dark-rush-photography/api/util'),
}));
import * as apiUtil from '@dark-rush-photography/api/util';

jest.mock('../entities/entity-repository.functions', () => ({
  ...jest.requireActual('../entities/entity-repository.functions'),
}));
import * as entityRepositoryFunctions from '../entities/entity-repository.functions';

jest.mock('../entities/entity-validation.functions', () => ({
  ...jest.requireActual('../entities/entity-validation.functions'),
}));
import * as entityValidationFunctions from '../entities/entity-validation.functions';

jest.mock('../images/image-load-document-model.functions', () => ({
  ...jest.requireActual('../images/image-load-document-model.functions'),
}));
import * as imageLoadDocumentModelFunctions from '../images/image-load-document-model.functions';

jest.mock('../images/image-repository.functions', () => ({
  ...jest.requireActual('../images/image-repository.functions'),
}));
import * as imageRepositoryFunctions from '../images/image-repository.functions';

describe('image-add.provider', () => {
  let imageAddProvider: ImageAddProvider;
  let imageAddBlobProvider: ImageAddBlobProvider;

  beforeEach(async () => {
    class MockConfigProvider {
      get azureStorageConnectionStringPublic(): string {
        return faker.lorem.word();
      }
      get azureStorageBlobContainerNamePublic(): string {
        return faker.lorem.word();
      }
    }
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
        ImageAddProvider,
        ImageAddBlobProvider,
      ],
    }).compile();

    imageAddProvider = moduleRef.get<ImageAddProvider>(ImageAddProvider);
    imageAddBlobProvider =
      moduleRef.get<ImageAddBlobProvider>(ImageAddBlobProvider);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('addNewImage$', () => {
    it('should add a new image and image blob', (done: any) => {
      const mockedFindEntityById$ = jest
        .spyOn(entityRepositoryFunctions, 'findEntityById$')
        .mockReturnValue(of({} as DocumentModel));

      const mockedValidateEntityFound = jest
        .spyOn(entityValidationFunctions, 'validateEntityFound')
        .mockImplementation((documentModel) => documentModel as DocumentModel);

      const mockedGetOrderFromGoogleDriveImageFile = jest
        .spyOn(apiUtil, 'getOrderFromGoogleDriveImageFile')
        .mockReturnValue(faker.datatype.number());

      const mockedLoadNewImage = jest
        .spyOn(imageLoadDocumentModelFunctions, 'loadNewImage')
        .mockReturnValue({} as Image);

      const mockedAddImage$ = jest
        .spyOn(imageRepositoryFunctions, 'addImage$')
        .mockReturnValue(of({} as DocumentModel));

      const mockedAddNewImageBlob$ = jest
        .spyOn(imageAddBlobProvider, 'addNewImageBlob$')
        .mockReturnValue(of(undefined));

      imageAddProvider
        .addNewImage$(
          {} as drive_v3.Drive,
          {} as GoogleDriveFile,
          DUMMY_MONGODB_ID
        )
        .subscribe((image) => {
          expect(mockedFindEntityById$).toBeCalledTimes(1);
          expect(mockedValidateEntityFound).toBeCalledTimes(1);
          expect(mockedGetOrderFromGoogleDriveImageFile).toBeCalledTimes(1);
          expect(mockedLoadNewImage).toBeCalledTimes(1);
          expect(mockedAddImage$).toBeCalledTimes(1);
          expect(mockedAddNewImageBlob$).toBeCalledTimes(1);
          expect(image).toBeDefined();
          done();
        });
    });

    it('should not add a new image and image blob when the entity is not found', (done: any) => {
      const mockedFindEntityById$ = jest
        .spyOn(entityRepositoryFunctions, 'findEntityById$')
        .mockReturnValue(of(null));

      const mockedValidateEntityFound = jest
        .spyOn(entityValidationFunctions, 'validateEntityFound')
        .mockImplementation(() => {
          throw new NotFoundException();
        });

      const mockedGetOrderFromGoogleDriveImageFile = jest.spyOn(
        apiUtil,
        'getOrderFromGoogleDriveImageFile'
      );

      const mockedLoadNewImage = jest.spyOn(
        imageLoadDocumentModelFunctions,
        'loadNewImage'
      );

      const mockedAddImage$ = jest.spyOn(imageRepositoryFunctions, 'addImage$');

      const mockedAddNewImageBlob$ = jest.spyOn(
        imageAddBlobProvider,
        'addNewImageBlob$'
      );

      imageAddProvider
        .addNewImage$(
          {} as drive_v3.Drive,
          {} as GoogleDriveFile,
          DUMMY_MONGODB_ID
        )
        .subscribe({
          next: () => {
            done();
          },
          error: (error) => {
            expect(mockedFindEntityById$).toBeCalledTimes(1);
            expect(mockedValidateEntityFound).toBeCalledTimes(1);
            expect(mockedGetOrderFromGoogleDriveImageFile).not.toBeCalled();
            expect(mockedLoadNewImage).not.toBeCalled();
            expect(mockedAddImage$).not.toBeCalled();
            expect(mockedAddNewImageBlob$).not.toBeCalled();
            expect(error).toBeInstanceOf(NotFoundException);
            done();
          },
          complete: () => {
            done();
          },
        });
    });
  });

  describe('addImagePostImage$', () => {
    it('should add an image post image and blob', (done: any) => {
      const mockedFindEntityById$ = jest
        .spyOn(entityRepositoryFunctions, 'findEntityById$')
        .mockReturnValue(of({} as DocumentModel));

      const mockedValidateEntityFound = jest
        .spyOn(entityValidationFunctions, 'validateEntityFound')
        .mockImplementation((documentModel) => documentModel as DocumentModel);

      const mockedLoadAddImagePostImage = jest
        .spyOn(imageLoadDocumentModelFunctions, 'loadAddImagePostImage')
        .mockReturnValue({} as Image);

      const mockedAddImage$ = jest
        .spyOn(imageRepositoryFunctions, 'addImage$')
        .mockReturnValue(of({} as DocumentModel));

      const mockedAddImagePostImageBlob$ = jest
        .spyOn(imageAddBlobProvider, 'addImagePostImageBlob$')
        .mockReturnValue(of(undefined));

      imageAddProvider
        .addImagePostImage$(DUMMY_MONGODB_ID, {} as Express.Multer.File)
        .subscribe(() => {
          expect(mockedFindEntityById$).toBeCalledTimes(1);
          expect(mockedValidateEntityFound).toBeCalledTimes(1);
          expect(mockedLoadAddImagePostImage).toBeCalledTimes(1);
          expect(mockedAddImage$).toBeCalledTimes(1);
          expect(mockedAddImagePostImageBlob$).toBeCalledTimes(1);
          done();
        });
    });

    it('should not add an image post image and blob when the entity is not found', (done: any) => {
      const mockedFindEntityById$ = jest
        .spyOn(entityRepositoryFunctions, 'findEntityById$')
        .mockReturnValue(of(null));

      const mockedValidateEntityFound = jest
        .spyOn(entityValidationFunctions, 'validateEntityFound')
        .mockImplementation(() => {
          throw new NotFoundException();
        });

      const mockedLoadAddImagePostImage = jest.spyOn(
        imageLoadDocumentModelFunctions,
        'loadAddImagePostImage'
      );

      const mockedAddImage$ = jest.spyOn(imageRepositoryFunctions, 'addImage$');

      const mockedAddImagePostImageBlob$ = jest.spyOn(
        imageAddBlobProvider,
        'addImagePostImageBlob$'
      );

      imageAddProvider
        .addImagePostImage$(DUMMY_MONGODB_ID, {} as Express.Multer.File)
        .subscribe({
          next: () => {
            done();
          },
          error: (error) => {
            expect(mockedFindEntityById$).toBeCalledTimes(1);
            expect(mockedValidateEntityFound).toBeCalledTimes(1);
            expect(mockedLoadAddImagePostImage).not.toBeCalled();
            expect(mockedAddImage$).not.toBeCalled();
            expect(mockedAddImagePostImageBlob$).not.toBeCalled();
            expect(error).toBeInstanceOf(NotFoundException);
            done();
          },
          complete: () => {
            done();
          },
        });
    });
  });

  describe('addTestImage$', () => {
    it('should add a test image', (done: any) => {
      const mockedFindEntityById$ = jest
        .spyOn(entityRepositoryFunctions, 'findEntityById$')
        .mockReturnValue(of({} as DocumentModel));

      const mockedValidateEntityFound = jest
        .spyOn(entityValidationFunctions, 'validateEntityFound')
        .mockImplementation((documentModel) => documentModel as DocumentModel);

      const mockedLoadAddTestImage = jest
        .spyOn(imageLoadDocumentModelFunctions, 'loadAddTestImage')
        .mockReturnValue({} as Image);

      const mockedAddImage$ = jest
        .spyOn(imageRepositoryFunctions, 'addImage$')
        .mockReturnValue(of({} as DocumentModel));

      imageAddProvider.addTestImage$(DUMMY_MONGODB_ID).subscribe((image) => {
        expect(mockedFindEntityById$).toBeCalledTimes(1);
        expect(mockedValidateEntityFound).toBeCalledTimes(1);
        expect(mockedLoadAddTestImage).toBeCalledTimes(1);
        expect(mockedAddImage$).toBeCalledTimes(1);
        expect(image).toBeDefined();
        done();
      });
    });

    it('should not add a test image when the entity is not found', (done: any) => {
      const mockedFindEntityById$ = jest
        .spyOn(entityRepositoryFunctions, 'findEntityById$')
        .mockReturnValue(of(null));

      const mockedValidateEntityFound = jest
        .spyOn(entityValidationFunctions, 'validateEntityFound')
        .mockImplementation(() => {
          throw new NotFoundException();
        });

      const mockedLoadAddTestImage = jest.spyOn(
        imageLoadDocumentModelFunctions,
        'loadAddTestImage'
      );

      const mockedAddImage$ = jest.spyOn(imageRepositoryFunctions, 'addImage$');

      imageAddProvider.addTestImage$(DUMMY_MONGODB_ID).subscribe({
        next: () => {
          done();
        },
        error: (error) => {
          expect(mockedFindEntityById$).toBeCalledTimes(1);
          expect(mockedValidateEntityFound).toBeCalledTimes(1);
          expect(mockedLoadAddTestImage).not.toBeCalled();
          expect(mockedAddImage$).not.toBeCalled();
          expect(error).toBeInstanceOf(NotFoundException);
          done();
        },
        complete: () => {
          done();
        },
      });
    });
  });
});
