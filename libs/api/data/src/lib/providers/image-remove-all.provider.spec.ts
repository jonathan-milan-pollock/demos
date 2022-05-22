/* eslint-disable @typescript-eslint/no-explicit-any */
import { Test } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getModelToken } from '@nestjs/mongoose';

import { of } from 'rxjs';

import {
  DUMMY_MONGODB_ID,
  Image,
  ImageState,
} from '@dark-rush-photography/shared/types';
import { Document, DocumentModel } from '../schema/document.schema';
import { ConfigProvider } from './config.provider';
import { ImageRemoveAllProvider } from './image-remove-all.provider';
import { ImageRemoveOneProvider } from './image-remove-one.provider';
import { ImageDeleteBlobsProvider } from './image-delete-blobs.provider';

jest.mock('../entities/entity-repository.functions', () => ({
  ...jest.requireActual('../entities/entity-repository.functions'),
}));
import * as entityRepositoryFunctions from '../entities/entity-repository.functions';

jest.mock('../entities/entity-validation.functions', () => ({
  ...jest.requireActual('../entities/entity-validation.functions'),
}));
import * as entityValidationFunctions from '../entities/entity-validation.functions';

describe('image-remove-all.provider', () => {
  let imageRemoveAllProvider: ImageRemoveAllProvider;
  let imageRemoveOneProvider: ImageRemoveOneProvider;

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
        ImageRemoveAllProvider,
        ImageRemoveOneProvider,
        ImageDeleteBlobsProvider,
      ],
    }).compile();

    imageRemoveAllProvider = moduleRef.get<ImageRemoveAllProvider>(
      ImageRemoveAllProvider
    );
    imageRemoveOneProvider = moduleRef.get<ImageRemoveOneProvider>(
      ImageRemoveOneProvider
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('removeAllImages$', () => {
    it('should remove all images of an entity', (done: any) => {
      const mockedFindEntityById$ = jest
        .spyOn(entityRepositoryFunctions, 'findEntityById$')
        .mockReturnValue(
          of({
            images: [{} as Image, {} as Image],
          } as DocumentModel)
        );

      const mockedValidateEntityFound = jest
        .spyOn(entityValidationFunctions, 'validateEntityFound')
        .mockImplementation((documentModel) => documentModel as DocumentModel);

      const mockedRemoveImage$ = jest
        .spyOn(imageRemoveOneProvider, 'removeImage$')
        .mockReturnValue(of(undefined));

      imageRemoveAllProvider
        .removeAllImages$(DUMMY_MONGODB_ID)
        .subscribe(() => {
          expect(mockedFindEntityById$).toHaveBeenCalledTimes(1);
          expect(mockedValidateEntityFound).toHaveBeenCalledTimes(1);
          expect(mockedRemoveImage$).toHaveBeenCalledTimes(2);
          done();
        });
    });

    it('should not remove all images of entity when entity is not found', (done: any) => {
      const mockedFindEntityById$ = jest
        .spyOn(entityRepositoryFunctions, 'findEntityById$')
        .mockReturnValue(of(null));

      const mockedValidateEntityFound = jest
        .spyOn(entityValidationFunctions, 'validateEntityFound')
        .mockImplementation(() => {
          throw new NotFoundException();
        });

      const mockedRemoveImage$ = jest.spyOn(
        imageRemoveOneProvider,
        'removeImage$'
      );

      imageRemoveAllProvider.removeAllImages$(DUMMY_MONGODB_ID).subscribe({
        next: () => {
          done();
        },
        error: (error) => {
          expect(mockedFindEntityById$).toBeCalledTimes(1);
          expect(mockedValidateEntityFound).toBeCalledTimes(1);
          expect(mockedRemoveImage$).not.toBeCalled();
          expect(error).toBeInstanceOf(NotFoundException);
          done();
        },
        complete: () => {
          done();
        },
      });
    });
  });

  describe('removeAllNewImages$', () => {
    it('should remove all new images of an entity', (done: any) => {
      const mockedFindEntityById$ = jest
        .spyOn(entityRepositoryFunctions, 'findEntityById$')
        .mockReturnValue(
          of({
            images: [
              { state: ImageState.New } as Image,
              { state: ImageState.New } as Image,
            ],
          } as DocumentModel)
        );

      const mockedValidateEntityFound = jest
        .spyOn(entityValidationFunctions, 'validateEntityFound')
        .mockImplementation((documentModel) => documentModel as DocumentModel);

      const mockedRemoveImage$ = jest
        .spyOn(imageRemoveOneProvider, 'removeImage$')
        .mockReturnValue(of(undefined));

      imageRemoveAllProvider
        .removeAllNewImages$(DUMMY_MONGODB_ID)
        .subscribe(() => {
          expect(mockedFindEntityById$).toHaveBeenCalledTimes(1);
          expect(mockedValidateEntityFound).toHaveBeenCalledTimes(1);
          expect(mockedRemoveImage$).toHaveBeenCalledTimes(2);
          done();
        });
    });

    it('should not remove new images of an entity when entity is not found', (done: any) => {
      const mockedFindEntityById$ = jest
        .spyOn(entityRepositoryFunctions, 'findEntityById$')
        .mockReturnValue(of(null));

      const mockedValidateEntityFound = jest
        .spyOn(entityValidationFunctions, 'validateEntityFound')
        .mockImplementation(() => {
          throw new NotFoundException();
        });

      const mockedRemoveImage$ = jest.spyOn(
        imageRemoveOneProvider,
        'removeImage$'
      );

      imageRemoveAllProvider.removeAllNewImages$(DUMMY_MONGODB_ID).subscribe({
        next: () => {
          done();
        },
        error: (error) => {
          expect(mockedFindEntityById$).toHaveBeenCalledTimes(1);
          expect(mockedValidateEntityFound).toHaveBeenCalledTimes(1);
          expect(mockedRemoveImage$).not.toHaveBeenCalled();
          expect(error).toBeInstanceOf(NotFoundException);
          done();
        },
        complete: () => {
          done();
        },
      });
    });

    it('should not remove new images of an entity when entity does not have any images', (done: any) => {
      const mockedFindEntityById$ = jest
        .spyOn(entityRepositoryFunctions, 'findEntityById$')
        .mockReturnValue(
          of({
            images: [] as Image[],
          } as DocumentModel)
        );

      const mockedValidateEntityFound = jest
        .spyOn(entityValidationFunctions, 'validateEntityFound')
        .mockImplementation((documentModel) => documentModel as DocumentModel);

      const mockedRemoveImage$ = jest.spyOn(
        imageRemoveOneProvider,
        'removeImage$'
      );

      imageRemoveAllProvider
        .removeAllNewImages$(DUMMY_MONGODB_ID)
        .subscribe(() => {
          expect(mockedFindEntityById$).toHaveBeenCalledTimes(1);
          expect(mockedValidateEntityFound).toHaveBeenCalledTimes(1);
          expect(mockedRemoveImage$).not.toHaveBeenCalled();
          done();
        });
    });

    it('should not remove new images of an entity when entity does not have any images that are new', (done: any) => {
      const mockedFindEntityById$ = jest
        .spyOn(entityRepositoryFunctions, 'findEntityById$')
        .mockReturnValue(
          of({
            images: [
              { state: ImageState.Selected } as Image,
              { state: ImageState.Public } as Image,
              { state: ImageState.Archived } as Image,
            ] as Image[],
          } as DocumentModel)
        );

      const mockedValidateEntityFound = jest
        .spyOn(entityValidationFunctions, 'validateEntityFound')
        .mockImplementation((documentModel) => documentModel as DocumentModel);

      const mockedRemoveImage$ = jest.spyOn(
        imageRemoveOneProvider,
        'removeImage$'
      );

      imageRemoveAllProvider
        .removeAllNewImages$(DUMMY_MONGODB_ID)
        .subscribe(() => {
          expect(mockedFindEntityById$).toHaveBeenCalledTimes(1);
          expect(mockedValidateEntityFound).toHaveBeenCalledTimes(1);
          expect(mockedRemoveImage$).not.toHaveBeenCalled();
          done();
        });
    });
  });
});
