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
import * as entityValidationFunctions from '../entities/entity-validate-document-model.functions';

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
          useValue: new MockDocumentModel(),
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
    it('should add the new image and image blob', (done: any) => {
      jest
        .spyOn(apiUtil, 'getOrderFromGoogleDriveImageFile')
        .mockReturnValue(faker.datatype.number());

      jest
        .spyOn(imageLoadDocumentModelFunctions, 'loadAddImage')
        .mockReturnValue({} as Image);

      jest
        .spyOn(entityRepositoryFunctions, 'findEntityById$')
        .mockReturnValue(of({} as DocumentModel));

      jest
        .spyOn(entityValidationFunctions, 'validateEntityFound')
        .mockReturnValue({} as DocumentModel);

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
        .subscribe(() => {
          expect(mockedAddImage$).toBeCalled();
          expect(mockedAddNewImageBlob$).toBeCalled();
          done();
        });
    });

    /*
    TODO
    it('should not add the new image or image blob when the entity is not found', (done: any) => {
      jest
        .spyOn(apiUtil, 'getOrderFromGoogleDriveImageFile')
        .mockReturnValue(faker.datatype.number());

      jest
        .spyOn(imageLoadDocumentModelFunctions, 'loadAddImage')
        .mockReturnValue({} as Image);

      jest
        .spyOn(entityRepositoryFunctions, 'findEntityById$')
        .mockReturnValue(of({} as DocumentModel));

      jest
        .spyOn(entityValidationFunctions, 'validateEntityFound')
        .mockImplementation(() => {
          throw new NotFoundException();
        });

      const mockedAddImageToEntity$ = jest.spyOn(
        imageRepositoryFunctions,
        'addImage$'
      );

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
        .subscribe(() => {
          expect(mockedAddImageToEntity$).not.toBeCalled();
          expect(mockedAddNewImageBlob$).not.toBeCalled();
          done();
        });
    });*/
  });
});
