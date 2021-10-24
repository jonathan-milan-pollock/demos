/* eslint-disable @typescript-eslint/no-explicit-any */
import { Test } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';

import * as faker from 'faker';
import { of } from 'rxjs';
import { drive_v3 } from 'googleapis';

import {
  DUMMY_MONGODB_ID,
  GoogleDriveFolder,
} from '@dark-rush-photography/shared/types';
import { Document, DocumentModel } from '../schema/document.schema';
import { ImageFolderProvider } from './image-find-folder.provider';

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
import * as entityValidationFunctions from '../entities/entity-validate-document-model.functions';

jest.mock('../entities/entity-field-validation.functions', () => ({
  ...jest.requireActual('../entities/entity-field-validation.functions'),
}));
import * as entityFieldValidationFunctions from '../entities/entity-field-validation.functions';

describe('image-find-folder.provider', () => {
  let imageFolderProvider: ImageFolderProvider;

  beforeEach(async () => {
    class MockDocumentModel {}

    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: getModelToken(Document.name),
          useValue: new MockDocumentModel(),
        },
        ImageFolderProvider,
      ],
    }).compile();

    imageFolderProvider =
      moduleRef.get<ImageFolderProvider>(ImageFolderProvider);

    jest
      .spyOn(entityRepositoryFunctions, 'findEntityById$')
      .mockReturnValue(of({} as DocumentModel));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findNewImagesFolder$', () => {
    it('should find the new images folder by name', (done: any) => {
      jest
        .spyOn(entityValidationFunctions, 'validateEntityFound')
        .mockReturnValue({} as DocumentModel);

      jest
        .spyOn(
          entityFieldValidationFunctions,
          'validateEntityGoogleDriveFolderId'
        )
        .mockReturnValue(faker.datatype.uuid());

      jest
        .spyOn(apiUtil, 'getEntityTypeNewImagesFolderName')
        .mockReturnValue(faker.lorem.word());

      const mockedFindGoogleDriveFolderByName$ = jest
        .spyOn(apiUtil, 'findGoogleDriveFolderByName$')
        .mockReturnValue(of({} as GoogleDriveFolder));

      imageFolderProvider
        .findNewImagesFolder$({} as drive_v3.Drive, DUMMY_MONGODB_ID)
        .subscribe(() => {
          expect(mockedFindGoogleDriveFolderByName$).toBeCalled();
          done();
        });
    });

    it('should find the new images folder as the google drive entity folder', (done: any) => {
      jest
        .spyOn(entityValidationFunctions, 'validateEntityFound')
        .mockReturnValue({} as DocumentModel);

      jest
        .spyOn(
          entityFieldValidationFunctions,
          'validateEntityGoogleDriveFolderId'
        )
        .mockReturnValue(faker.datatype.uuid());

      jest
        .spyOn(apiUtil, 'getEntityTypeNewImagesFolderName')
        .mockReturnValue(undefined);

      const mockedFindGoogleDriveFolderById$ = jest
        .spyOn(apiUtil, 'findGoogleDriveFolderById$')
        .mockReturnValue(of({} as GoogleDriveFolder));

      imageFolderProvider
        .findNewImagesFolder$({} as drive_v3.Drive, DUMMY_MONGODB_ID)
        .subscribe(() => {
          expect(mockedFindGoogleDriveFolderById$).toBeCalled();
          done();
        });
    });

    it('should not find the new images folder when the entity is not found', (done: any) => {
      jest
        .spyOn(entityValidationFunctions, 'validateEntityFound')
        .mockImplementation(() => {
          throw new NotFoundException();
        });

      const mockedFindGoogleDriveFolderByName$ = jest.spyOn(
        apiUtil,
        'findGoogleDriveFolderByName$'
      );

      const mockedFindGoogleDriveFolderById$ = jest.spyOn(
        apiUtil,
        'findGoogleDriveFolderById$'
      );

      imageFolderProvider
        .findNewImagesFolder$({} as drive_v3.Drive, DUMMY_MONGODB_ID)
        .subscribe({
          next: () => {
            done();
          },
          error: () => {
            expect(mockedFindGoogleDriveFolderByName$).not.toBeCalled();
            expect(mockedFindGoogleDriveFolderById$).not.toBeCalled();
            done();
          },
          complete: () => {
            done();
          },
        });
    });
  });
});
