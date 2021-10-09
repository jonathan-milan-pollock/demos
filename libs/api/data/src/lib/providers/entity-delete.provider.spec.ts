/* eslint-disable @typescript-eslint/no-explicit-any */
import { Test } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { getModelToken } from '@nestjs/mongoose';

import { of } from 'rxjs';

import { DUMMY_MONGODB_ID } from '@dark-rush-photography/shared/types';
import { Document, DocumentModel } from '../schema/document.schema';
import { ConfigProvider } from './config.provider';
import { EntityDeleteProvider } from './entity-delete.provider';
import { ContentRemoveProvider } from './content-remove.provider';
import { ContentRemoveOneProvider } from './content-remove-one.provider';
import { ContentDeleteBlobsProvider } from './content-delete-blobs.provider';

jest.mock('../entities/entity-repository.functions', () => ({
  ...jest.requireActual('../entities/entity-repository.functions'),
}));
import * as entityRepositoryFunctions from '../entities/entity-repository.functions';

describe('entity-delete.provider', () => {
  let entityDeleteProvider: EntityDeleteProvider;
  let contentRemoveProvider: ContentRemoveProvider;

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
        EntityDeleteProvider,
        ContentRemoveProvider,
        ContentRemoveOneProvider,
        ContentDeleteBlobsProvider,
      ],
    }).compile();

    entityDeleteProvider =
      moduleRef.get<EntityDeleteProvider>(EntityDeleteProvider);
    contentRemoveProvider = moduleRef.get<ContentRemoveProvider>(
      ContentRemoveProvider
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('delete$', () => {
    it('should delete an entity and its content', (done: any) => {
      jest
        .spyOn(entityRepositoryFunctions, 'findEntityById$')
        .mockReturnValue(of({} as DocumentModel));

      const mockedRemoveAllImages$ = jest
        .spyOn(contentRemoveProvider, 'removeAllImages$')
        .mockReturnValue(of(undefined));

      const mockedRemoveAllVideos$ = jest
        .spyOn(contentRemoveProvider, 'removeAllVideos$')
        .mockReturnValue(of(undefined));

      const mockedFindEntityByIdAndDelete = jest
        .spyOn(entityRepositoryFunctions, 'findEntityByIdAndDelete$')
        .mockReturnValue(of({} as DocumentModel));

      entityDeleteProvider.deleteEntity$(DUMMY_MONGODB_ID).subscribe(() => {
        expect(mockedRemoveAllImages$).toHaveBeenCalled();
        expect(mockedRemoveAllVideos$).toHaveBeenCalled();
        expect(mockedFindEntityByIdAndDelete).toHaveBeenCalled();
        done();
      });
    });

    it('should not delete an entity and its content if it is not found', (done: any) => {
      jest
        .spyOn(entityRepositoryFunctions, 'findEntityById$')
        .mockReturnValue(of(null));

      const mockedRemoveAllImages$ = jest.spyOn(
        contentRemoveProvider,
        'removeAllImages$'
      );

      const mockedRemoveAllVideos$ = jest.spyOn(
        contentRemoveProvider,
        'removeAllVideos$'
      );

      const mockedFindEntityByIdAndDelete = jest.spyOn(
        entityRepositoryFunctions,
        'findEntityByIdAndDelete$'
      );

      entityDeleteProvider.deleteEntity$(DUMMY_MONGODB_ID).subscribe(() => {
        expect(mockedRemoveAllImages$).not.toHaveBeenCalled();
        expect(mockedRemoveAllVideos$).not.toHaveBeenCalled();
        expect(mockedFindEntityByIdAndDelete).not.toHaveBeenCalled();
        done();
      });
    });
  });
});
