/* eslint-disable @typescript-eslint/no-explicit-any */
import { Test } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { getModelToken } from '@nestjs/mongoose';

import { of } from 'rxjs';

import { Image, Video } from '@dark-rush-photography/shared/types';
import { Document, DocumentModel } from '../schema/document.schema';
import { ConfigProvider } from './config.provider';
import { ContentRemoveOneProvider } from './content-remove-one.provider';
import { ContentDeleteBlobsProvider } from './content-delete-blobs.provider';

jest.mock('../entities/entity-repository.functions', () => ({
  ...jest.requireActual('../entities/entity-repository.functions'),
}));
import * as entityRepositoryFunctions from '../entities/entity-repository.functions';

jest.mock('../content/content-repository.functions', () => ({
  ...jest.requireActual('../content/content-repository.functions'),
}));
import * as contentRepositoryFunctions from '../content/content-repository.functions';

describe('content-remove-one.provider', () => {
  let contentRemoveOneProvider: ContentRemoveOneProvider;
  let contentDeleteBlobsProvider: ContentDeleteBlobsProvider;

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
        ContentRemoveOneProvider,
        ContentDeleteBlobsProvider,
      ],
    }).compile();

    contentRemoveOneProvider = moduleRef.get<ContentRemoveOneProvider>(
      ContentRemoveOneProvider
    );
    contentDeleteBlobsProvider = moduleRef.get<ContentDeleteBlobsProvider>(
      ContentDeleteBlobsProvider
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('removeImage$', () => {
    it('should delete image blobs and remove an image for an entity', (done: any) => {
      const mockedDeleteImageBlobs$ = jest
        .spyOn(contentDeleteBlobsProvider, 'deleteImageBlobs$')
        .mockReturnValue(of(undefined));

      jest
        .spyOn(entityRepositoryFunctions, 'findEntityById$')
        .mockReturnValue(of({} as DocumentModel));

      const mockedRemoveImage$ = jest
        .spyOn(contentRepositoryFunctions, 'removeImage$')
        .mockReturnValue(of({} as DocumentModel));

      contentRemoveOneProvider.removeImage$({} as Image).subscribe(() => {
        expect(mockedDeleteImageBlobs$).toHaveBeenCalled();
        expect(mockedRemoveImage$).toHaveBeenCalled();
        done();
      });
    });
  });

  describe('removeVideo$', () => {
    it('should delete video blobs and remove a video for an entity', (done: any) => {
      const mockedDeleteVideoBlobs$ = jest
        .spyOn(contentDeleteBlobsProvider, 'deleteVideoBlob$')
        .mockReturnValue(of(undefined));

      jest
        .spyOn(entityRepositoryFunctions, 'findEntityById$')
        .mockReturnValue(of({} as DocumentModel));

      const mockedRemoveVideo$ = jest
        .spyOn(contentRepositoryFunctions, 'removeVideo$')
        .mockReturnValue(of({} as DocumentModel));

      contentRemoveOneProvider.removeVideo$({} as Video).subscribe(() => {
        expect(mockedDeleteVideoBlobs$).toHaveBeenCalled();
        expect(mockedRemoveVideo$).toHaveBeenCalled();
        done();
      });
    });
  });
});
