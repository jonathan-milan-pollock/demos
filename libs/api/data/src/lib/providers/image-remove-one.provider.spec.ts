/* eslint-disable @typescript-eslint/no-explicit-any */
import { Test } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { getModelToken } from '@nestjs/mongoose';

import faker from '@faker-js/faker';
import { of } from 'rxjs';

import { DUMMY_MONGODB_ID, Image } from '@dark-rush-photography/shared/types';
import { Document, DocumentModel } from '../schema/document.schema';
import { ConfigProvider } from './config.provider';
import { ImageRemoveOneProvider } from './image-remove-one.provider';
import { ImageDeleteBlobsProvider } from './image-delete-blobs.provider';

jest.mock('../entities/entity-repository.functions', () => ({
  ...jest.requireActual('../entities/entity-repository.functions'),
}));
import * as entityRepositoryFunctions from '../entities/entity-repository.functions';

jest.mock('../images/image-repository.functions', () => ({
  ...jest.requireActual('../images/image-repository.functions'),
}));
import * as imageRepositoryFunctions from '../images/image-repository.functions';

describe('image-remove-one.provider', () => {
  let imageRemoveOneProvider: ImageRemoveOneProvider;
  let imageDeleteBlobsProvider: ImageDeleteBlobsProvider;

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
        ImageRemoveOneProvider,
        ImageDeleteBlobsProvider,
      ],
    }).compile();

    imageRemoveOneProvider = moduleRef.get<ImageRemoveOneProvider>(
      ImageRemoveOneProvider
    );
    imageDeleteBlobsProvider = moduleRef.get<ImageDeleteBlobsProvider>(
      ImageDeleteBlobsProvider
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('removeImage$', () => {
    it('should delete image blobs and remove an image for an entity', (done: any) => {
      const mockedDeleteImageBlobs$ = jest
        .spyOn(imageDeleteBlobsProvider, 'deleteImageBlobs$')
        .mockReturnValue(of(undefined));

      const mockedFindEntityById$ = jest
        .spyOn(entityRepositoryFunctions, 'findEntityById$')
        .mockReturnValue(of({} as DocumentModel));

      const mockedRemoveImage$ = jest
        .spyOn(imageRepositoryFunctions, 'removeImage$')
        .mockReturnValue(of({} as DocumentModel));

      imageRemoveOneProvider.removeImage$({} as Image).subscribe(() => {
        expect(mockedDeleteImageBlobs$).toHaveBeenCalledTimes(1);
        expect(mockedFindEntityById$).toHaveBeenCalledTimes(1);
        expect(mockedRemoveImage$).toHaveBeenCalledTimes(1);
        done();
      });
    });

    it('should should not delete an image if entity is not found', (done: any) => {
      const mockedDeleteImageBlobs$ = jest
        .spyOn(imageDeleteBlobsProvider, 'deleteImageBlobs$')
        .mockReturnValue(of(undefined));

      const mockedFindEntityById$ = jest
        .spyOn(entityRepositoryFunctions, 'findEntityById$')
        .mockReturnValue(of(null));

      const mockedRemoveImage$ = jest.spyOn(
        imageRepositoryFunctions,
        'removeImage$'
      );

      imageRemoveOneProvider.removeImage$({} as Image).subscribe(() => {
        expect(mockedDeleteImageBlobs$).toHaveBeenCalledTimes(1);
        expect(mockedFindEntityById$).toHaveBeenCalledTimes(1);
        expect(mockedRemoveImage$).not.toHaveBeenCalled();
        done();
      });
    });
  });

  describe('removeImageVideo$', () => {
    it('should delete image video blobs and remove an image video for an entity', (done: any) => {
      const mockedFindEntityById$ = jest
        .spyOn(entityRepositoryFunctions, 'findEntityById$')
        .mockReturnValue(
          of({
            imageVideo: {
              storageId: faker.datatype.uuid(),
              slug: faker.lorem.word(),
            },
          } as DocumentModel)
        );

      const mockedDeleteImageVideoBlob$ = jest
        .spyOn(imageDeleteBlobsProvider, 'deleteImageVideoBlob$')
        .mockReturnValue(of(undefined));

      const mockedRemoveImageVideo$ = jest
        .spyOn(imageRepositoryFunctions, 'removeImageVideo$')
        .mockReturnValue(of({} as DocumentModel));

      imageRemoveOneProvider
        .removeImageVideo$(DUMMY_MONGODB_ID)
        .subscribe(() => {
          expect(mockedFindEntityById$).toHaveBeenCalledTimes(1);
          expect(mockedDeleteImageVideoBlob$).toHaveBeenCalledTimes(1);
          expect(mockedRemoveImageVideo$).toHaveBeenCalledTimes(1);
          done();
        });
    });

    it('should not delete image video blobs and remove an image video when entity is not found', (done: any) => {
      const mockedFindEntityById$ = jest
        .spyOn(entityRepositoryFunctions, 'findEntityById$')
        .mockReturnValue(of(null));

      const mockedDeleteImageVideoBlob$ = jest.spyOn(
        imageDeleteBlobsProvider,
        'deleteImageVideoBlob$'
      );

      const mockedRemoveImageVideo$ = jest.spyOn(
        imageRepositoryFunctions,
        'removeImageVideo$'
      );

      imageRemoveOneProvider
        .removeImageVideo$(DUMMY_MONGODB_ID)
        .subscribe(() => {
          expect(mockedFindEntityById$).toHaveBeenCalledTimes(1);
          expect(mockedDeleteImageVideoBlob$).not.toHaveBeenCalled();
          expect(mockedRemoveImageVideo$).not.toHaveBeenCalled();
          done();
        });
    });

    it('should not delete image video blobs and remove an image video when entity does not have an image video', (done: any) => {
      const mockedFindEntityById$ = jest
        .spyOn(entityRepositoryFunctions, 'findEntityById$')
        .mockReturnValue(of({} as DocumentModel));

      const mockedDeleteImageVideoBlob$ = jest.spyOn(
        imageDeleteBlobsProvider,
        'deleteImageVideoBlob$'
      );

      const mockedRemoveImageVideo$ = jest.spyOn(
        imageRepositoryFunctions,
        'removeImageVideo$'
      );

      imageRemoveOneProvider
        .removeImageVideo$(DUMMY_MONGODB_ID)
        .subscribe(() => {
          expect(mockedFindEntityById$).toHaveBeenCalledTimes(1);
          expect(mockedDeleteImageVideoBlob$).not.toHaveBeenCalled();
          expect(mockedRemoveImageVideo$).not.toHaveBeenCalled();
          done();
        });
    });

    it('should not delete image video blobs and remove an image video when image video does not have a storage id', (done: any) => {
      const mockedFindEntityById$ = jest
        .spyOn(entityRepositoryFunctions, 'findEntityById$')
        .mockReturnValue(
          of({
            imageVideo: {
              storageId: '',
              slug: faker.lorem.word(),
            },
          } as DocumentModel)
        );

      const mockedDeleteImageVideoBlob$ = jest.spyOn(
        imageDeleteBlobsProvider,
        'deleteImageVideoBlob$'
      );

      const mockedRemoveImageVideo$ = jest.spyOn(
        imageRepositoryFunctions,
        'removeImageVideo$'
      );

      imageRemoveOneProvider
        .removeImageVideo$(DUMMY_MONGODB_ID)
        .subscribe(() => {
          expect(mockedFindEntityById$).toHaveBeenCalledTimes(1);
          expect(mockedDeleteImageVideoBlob$).not.toHaveBeenCalled();
          expect(mockedRemoveImageVideo$).not.toHaveBeenCalled();
          done();
        });
    });

    it('should not delete image video blobs and remove an image video when image video does not have a slug', (done: any) => {
      const mockedFindEntityById$ = jest
        .spyOn(entityRepositoryFunctions, 'findEntityById$')
        .mockReturnValue(
          of({
            imageVideo: {
              storageId: faker.lorem.word(),
              slug: '',
            },
          } as DocumentModel)
        );

      const mockedDeleteImageVideoBlob$ = jest.spyOn(
        imageDeleteBlobsProvider,
        'deleteImageVideoBlob$'
      );

      const mockedRemoveImageVideo$ = jest.spyOn(
        imageRepositoryFunctions,
        'removeImageVideo$'
      );

      imageRemoveOneProvider
        .removeImageVideo$(DUMMY_MONGODB_ID)
        .subscribe(() => {
          expect(mockedFindEntityById$).toHaveBeenCalledTimes(1);
          expect(mockedDeleteImageVideoBlob$).not.toHaveBeenCalled();
          expect(mockedRemoveImageVideo$).not.toHaveBeenCalled();
          done();
        });
    });

    it('should not delete image video blobs and remove an image video when image video does not have a storage id or slug', (done: any) => {
      const mockedFindEntityById$ = jest
        .spyOn(entityRepositoryFunctions, 'findEntityById$')
        .mockReturnValue(
          of({
            imageVideo: {
              storageId: '',
              slug: '',
            },
          } as DocumentModel)
        );

      const mockedDeleteImageVideoBlob$ = jest.spyOn(
        imageDeleteBlobsProvider,
        'deleteImageVideoBlob$'
      );

      const mockedRemoveImageVideo$ = jest.spyOn(
        imageRepositoryFunctions,
        'removeImageVideo$'
      );

      imageRemoveOneProvider
        .removeImageVideo$(DUMMY_MONGODB_ID)
        .subscribe(() => {
          expect(mockedFindEntityById$).toHaveBeenCalledTimes(1);
          expect(mockedDeleteImageVideoBlob$).not.toHaveBeenCalled();
          expect(mockedRemoveImageVideo$).not.toHaveBeenCalled();
          done();
        });
    });
  });
});
