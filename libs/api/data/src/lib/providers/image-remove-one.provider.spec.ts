/* eslint-disable @typescript-eslint/no-explicit-any */
import { Test } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { getModelToken } from '@nestjs/mongoose';

import { of } from 'rxjs';

import { Image, ImageVideo } from '@dark-rush-photography/shared/types';
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
          useValue: new MockDocumentModel(),
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

      jest
        .spyOn(entityRepositoryFunctions, 'findEntityById$')
        .mockReturnValue(of({} as DocumentModel));

      const mockedRemoveImage$ = jest
        .spyOn(imageRepositoryFunctions, 'removeImage$')
        .mockReturnValue(of({} as DocumentModel));

      imageRemoveOneProvider.removeImage$({} as Image).subscribe(() => {
        expect(mockedDeleteImageBlobs$).toHaveBeenCalled();
        expect(mockedRemoveImage$).toHaveBeenCalled();
        done();
      });
    });
  });

  describe('removeVideo$', () => {
    it('should delete video blobs and remove a video for an entity', (done: any) => {
      const mockedDeleteVideoBlobs$ = jest
        .spyOn(imageDeleteBlobsProvider, 'deleteVideoBlob$')
        .mockReturnValue(of(undefined));

      jest
        .spyOn(entityRepositoryFunctions, 'findEntityById$')
        .mockReturnValue(of({} as DocumentModel));

      const mockedRemoveVideo$ = jest
        .spyOn(imageRepositoryFunctions, 'removeVideo$')
        .mockReturnValue(of({} as DocumentModel));

      imageRemoveOneProvider
        .removeImageVideo$({} as ImageVideo)
        .subscribe(() => {
          expect(mockedDeleteVideoBlobs$).toHaveBeenCalled();
          expect(mockedRemoveVideo$).toHaveBeenCalled();
          done();
        });
    });
  });
});
