/* eslint-disable @typescript-eslint/no-explicit-any */
import { Test } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { getModelToken } from '@nestjs/mongoose';

import { of } from 'rxjs';

import { DUMMY_MONGODB_ID } from '@dark-rush-photography/shared/types';
import { Document, DocumentModel } from '../schema/document.schema';
import { ConfigProvider } from './config.provider';
import { ImageRemoveAllProvider } from './image-remove-all.provider';
import { ImageRemoveOneProvider } from './image-remove-one.provider';
import { ImageDeleteBlobsProvider } from './image-delete-blobs.provider';
import { EntityDeleteProvider } from './entity-delete.provider';

jest.mock('../entities/entity-repository.functions', () => ({
  ...jest.requireActual('../entities/entity-repository.functions'),
}));
import * as entityRepositoryFunctions from '../entities/entity-repository.functions';

describe('entity-delete.provider', () => {
  let entityDeleteProvider: EntityDeleteProvider;
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
        EntityDeleteProvider,
        ImageRemoveAllProvider,
        ImageRemoveOneProvider,
        ImageDeleteBlobsProvider,
      ],
    }).compile();

    entityDeleteProvider =
      moduleRef.get<EntityDeleteProvider>(EntityDeleteProvider);
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

  describe('delete$', () => {
    it('should delete an entity and blobs', (done: any) => {
      const mockedFindEntityById$ = jest
        .spyOn(entityRepositoryFunctions, 'findEntityById$')
        .mockReturnValue(of({} as DocumentModel));

      const mockedRemoveAllImages$ = jest
        .spyOn(imageRemoveAllProvider, 'removeAllImages$')
        .mockReturnValue(of(undefined));

      const mockedRemoveImageVideo$ = jest
        .spyOn(imageRemoveOneProvider, 'removeImageVideo$')
        .mockReturnValue(of(undefined));

      const mockedFindEntityByIdAndDelete = jest
        .spyOn(entityRepositoryFunctions, 'findEntityByIdAndDelete$')
        .mockReturnValue(of({} as DocumentModel));

      entityDeleteProvider.deleteEntity$(DUMMY_MONGODB_ID).subscribe(() => {
        expect(mockedFindEntityById$).toHaveBeenCalledTimes(1);
        expect(mockedRemoveAllImages$).toHaveBeenCalledTimes(1);
        expect(mockedRemoveImageVideo$).toHaveBeenCalledTimes(1);
        expect(mockedFindEntityByIdAndDelete).toHaveBeenCalledTimes(1);
        done();
      });
    });

    it('should not delete an entity and blobs if entity is not found', (done: any) => {
      const mockedFindEntityById$ = jest
        .spyOn(entityRepositoryFunctions, 'findEntityById$')
        .mockReturnValue(of(null));

      const mockedRemoveAllImages$ = jest.spyOn(
        imageRemoveAllProvider,
        'removeAllImages$'
      );

      const mockedRemoveImageVideo$ = jest.spyOn(
        imageRemoveOneProvider,
        'removeImageVideo$'
      );

      const mockedFindEntityByIdAndDelete = jest.spyOn(
        entityRepositoryFunctions,
        'findEntityByIdAndDelete$'
      );

      entityDeleteProvider.deleteEntity$(DUMMY_MONGODB_ID).subscribe(() => {
        expect(mockedFindEntityById$).toBeCalledTimes(1);
        expect(mockedRemoveAllImages$).not.toHaveBeenCalled();
        expect(mockedRemoveImageVideo$).not.toHaveBeenCalled();
        expect(mockedFindEntityByIdAndDelete).not.toHaveBeenCalled();
        done();
      });
    });
  });
});
