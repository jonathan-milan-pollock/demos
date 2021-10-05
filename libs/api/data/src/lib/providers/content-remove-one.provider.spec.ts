/* eslint-disable @typescript-eslint/no-explicit-any */
import { Test } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { getModelToken } from '@nestjs/mongoose';

import { of } from 'rxjs';

import {
  DUMMY_MONGODB_ID,
  Image,
  Video,
} from '@dark-rush-photography/shared/types';
import { Document, DocumentModel } from '../schema/document.schema';
import { ConfigProvider } from './config.provider';
import { ContentRemoveOneProvider } from './content-remove-one.provider';
import { ContentDeleteBlobsProvider } from './content-delete-blobs.provider';

jest.mock('../entities/entity-repository.functions', () => ({
  ...jest.requireActual('../entities/entity-repository.functions'),
}));
import * as entityRepositoryFunctions from '../entities/entity-repository.functions';

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

      const mockedRemoveImageFromEntity$ = jest
        .spyOn(entityRepositoryFunctions, 'removeImageFromEntity$')
        .mockReturnValue(of({} as DocumentModel));

      contentRemoveOneProvider
        .removeImage$(DUMMY_MONGODB_ID, {} as Image, {} as DocumentModel)
        .subscribe(() => {
          expect(mockedDeleteImageBlobs$).toHaveBeenCalled();
          expect(mockedRemoveImageFromEntity$).toHaveBeenCalled();
          done();
        });
    });
  });

  describe('removeVideo$', () => {
    it('should delete video blobs and remove a video for an entity', (done: any) => {
      const mockedDeleteVideoBlobs$ = jest
        .spyOn(contentDeleteBlobsProvider, 'deleteVideoBlob$')
        .mockReturnValue(of(undefined));

      const mockedRemoveVideoFromEntity$ = jest
        .spyOn(entityRepositoryFunctions, 'removeVideoFromEntity$')
        .mockReturnValue(of({} as DocumentModel));

      contentRemoveOneProvider
        .removeVideo$(DUMMY_MONGODB_ID, {} as Video, {} as DocumentModel)
        .subscribe(() => {
          expect(mockedDeleteVideoBlobs$).toHaveBeenCalled();
          expect(mockedRemoveVideoFromEntity$).toHaveBeenCalled();
          done();
        });
    });
  });
});
