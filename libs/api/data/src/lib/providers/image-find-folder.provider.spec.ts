/* eslint-disable @typescript-eslint/no-explicit-any */
import { Test } from '@nestjs/testing';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';

import * as faker from 'faker';
import { of } from 'rxjs';
import { drive_v3 } from 'googleapis';

import {
  DUMMY_MONGODB_ID,
  GoogleDriveFolder,
} from '@dark-rush-photography/shared/types';
import { Document, DocumentModel } from '../schema/document.schema';
import { ImageFindFolderProvider } from './image-find-folder.provider';

jest.mock('@dark-rush-photography/shared/util', () => ({
  ...jest.requireActual('@dark-rush-photography/shared/util'),
}));
import * as sharedUtil from '@dark-rush-photography/shared/util';

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

jest.mock('../entities/entity-field-validation.functions', () => ({
  ...jest.requireActual('../entities/entity-field-validation.functions'),
}));
import * as entityFieldValidationFunctions from '../entities/entity-field-validation.functions';

describe('image-find-folder.provider', () => {
  let imageFindFolderProvider: ImageFindFolderProvider;

  beforeEach(async () => {
    class MockDocumentModel {}

    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: getModelToken(Document.name),
          useClass: MockDocumentModel,
        },
        ImageFindFolderProvider,
      ],
    }).compile();

    imageFindFolderProvider = moduleRef.get<ImageFindFolderProvider>(
      ImageFindFolderProvider
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findNewImagesFolder$', () => {
    it('should find the new images folder by name', (done: any) => {
      const mockedFindEntityById$ = jest
        .spyOn(entityRepositoryFunctions, 'findEntityById$')
        .mockReturnValue(of({} as DocumentModel));

      const mockedValidateEntityFound = jest
        .spyOn(entityValidationFunctions, 'validateEntityFound')
        .mockImplementation((documentModel) => documentModel as DocumentModel);

      const mockedValidateEntityGoogleDriveFolderId = jest
        .spyOn(
          entityFieldValidationFunctions,
          'validateEntityGoogleDriveFolderId'
        )
        .mockReturnValue(faker.datatype.uuid());

      const mockedGetEntityTypeNewImagesFolderName = jest
        .spyOn(sharedUtil, 'getEntityTypeNewImagesFolderName')
        .mockReturnValue(faker.lorem.word());

      const mockedFindGoogleDriveFolderByName$ = jest
        .spyOn(apiUtil, 'findGoogleDriveFolderByName$')
        .mockReturnValue(of({} as GoogleDriveFolder));

      const mockedFindGoogleDriveFolderById$ = jest.spyOn(
        apiUtil,
        'findGoogleDriveFolderById$'
      );

      imageFindFolderProvider
        .findNewImagesFolder$({} as drive_v3.Drive, DUMMY_MONGODB_ID)
        .subscribe(() => {
          expect(mockedFindEntityById$).toBeCalledTimes(1);
          expect(mockedValidateEntityFound).toBeCalledTimes(1);
          expect(mockedValidateEntityGoogleDriveFolderId).toBeCalledTimes(1);
          expect(mockedGetEntityTypeNewImagesFolderName).toBeCalledTimes(1);
          expect(mockedFindGoogleDriveFolderByName$).toBeCalledTimes(1);
          expect(mockedFindGoogleDriveFolderById$).not.toBeCalled();
          done();
        });
    });

    it('should find the new images folder by id when it does not have a name', (done: any) => {
      const mockedFindEntityById$ = jest
        .spyOn(entityRepositoryFunctions, 'findEntityById$')
        .mockReturnValue(of({} as DocumentModel));

      const mockedValidateEntityFound = jest
        .spyOn(entityValidationFunctions, 'validateEntityFound')
        .mockImplementation((documentModel) => documentModel as DocumentModel);

      const mockedValidateEntityGoogleDriveFolderId = jest
        .spyOn(
          entityFieldValidationFunctions,
          'validateEntityGoogleDriveFolderId'
        )
        .mockReturnValue(faker.datatype.uuid());

      const mockedGetEntityTypeNewImagesFolderName = jest
        .spyOn(sharedUtil, 'getEntityTypeNewImagesFolderName')
        .mockReturnValue(undefined);

      const mockedFindGoogleDriveFolderByName$ = jest.spyOn(
        apiUtil,
        'findGoogleDriveFolderByName$'
      );

      const mockedFindGoogleDriveFolderById$ = jest
        .spyOn(apiUtil, 'findGoogleDriveFolderById$')
        .mockReturnValue(of({} as GoogleDriveFolder));

      imageFindFolderProvider
        .findNewImagesFolder$({} as drive_v3.Drive, DUMMY_MONGODB_ID)
        .subscribe(() => {
          expect(mockedFindEntityById$).toBeCalledTimes(1);
          expect(mockedValidateEntityFound).toBeCalledTimes(1);
          expect(mockedValidateEntityGoogleDriveFolderId).toBeCalledTimes(1);
          expect(mockedGetEntityTypeNewImagesFolderName).toBeCalledTimes(1);
          expect(mockedFindGoogleDriveFolderByName$).not.toBeCalled();
          expect(mockedFindGoogleDriveFolderById$).toBeCalledTimes(1);
          done();
        });
    });

    it('should not find the new images folder by name or id when entity does not exist', (done: any) => {
      const mockedFindEntityById$ = jest
        .spyOn(entityRepositoryFunctions, 'findEntityById$')
        .mockReturnValue(of(null));

      const mockedValidateEntityFound = jest
        .spyOn(entityValidationFunctions, 'validateEntityFound')
        .mockImplementation(() => {
          throw new NotFoundException();
        });

      const mockedValidateEntityGoogleDriveFolderId = jest.spyOn(
        entityFieldValidationFunctions,
        'validateEntityGoogleDriveFolderId'
      );

      const mockedGetEntityTypeNewImagesFolderName = jest.spyOn(
        sharedUtil,
        'getEntityTypeNewImagesFolderName'
      );

      const mockedFindGoogleDriveFolderByName$ = jest.spyOn(
        apiUtil,
        'findGoogleDriveFolderByName$'
      );

      const mockedFindGoogleDriveFolderById$ = jest.spyOn(
        apiUtil,
        'findGoogleDriveFolderById$'
      );

      imageFindFolderProvider
        .findNewImagesFolder$({} as drive_v3.Drive, DUMMY_MONGODB_ID)
        .subscribe({
          next: () => {
            done();
          },
          error: (error) => {
            expect(mockedFindEntityById$).toBeCalledTimes(1);
            expect(mockedValidateEntityFound).toBeCalledTimes(1);
            expect(mockedValidateEntityGoogleDriveFolderId).not.toBeCalled();
            expect(mockedGetEntityTypeNewImagesFolderName).not.toBeCalled();
            expect(mockedFindGoogleDriveFolderByName$).not.toBeCalled();
            expect(mockedFindGoogleDriveFolderById$).not.toBeCalled();
            expect(error).toBeInstanceOf(NotFoundException);
            done();
          },
          complete: () => {
            done();
          },
        });
    });

    it('should not find the new images folder by name or id when google drive folder id is not found', (done: any) => {
      const mockedFindEntityById$ = jest
        .spyOn(entityRepositoryFunctions, 'findEntityById$')
        .mockReturnValue(of({} as DocumentModel));

      const mockedValidateEntityFound = jest
        .spyOn(entityValidationFunctions, 'validateEntityFound')
        .mockImplementation((documentModel) => documentModel as DocumentModel);

      const mockedValidateEntityGoogleDriveFolderId = jest
        .spyOn(
          entityFieldValidationFunctions,
          'validateEntityGoogleDriveFolderId'
        )
        .mockImplementation(() => {
          throw new ConflictException();
        });

      const mockedGetEntityTypeNewImagesFolderName = jest.spyOn(
        sharedUtil,
        'getEntityTypeNewImagesFolderName'
      );

      const mockedFindGoogleDriveFolderByName$ = jest.spyOn(
        apiUtil,
        'findGoogleDriveFolderByName$'
      );

      const mockedFindGoogleDriveFolderById$ = jest.spyOn(
        apiUtil,
        'findGoogleDriveFolderById$'
      );

      imageFindFolderProvider
        .findNewImagesFolder$({} as drive_v3.Drive, DUMMY_MONGODB_ID)
        .subscribe({
          next: () => {
            done();
          },
          error: (error) => {
            expect(mockedFindEntityById$).toBeCalledTimes(1);
            expect(mockedValidateEntityFound).toBeCalledTimes(1);
            expect(mockedValidateEntityGoogleDriveFolderId).toBeCalledTimes(1);
            expect(mockedGetEntityTypeNewImagesFolderName).not.toBeCalled();
            expect(mockedFindGoogleDriveFolderByName$).not.toBeCalled();
            expect(mockedFindGoogleDriveFolderById$).not.toBeCalled();
            expect(error).toBeInstanceOf(ConflictException);
            done();
          },
          complete: () => {
            done();
          },
        });
    });
  });
});
