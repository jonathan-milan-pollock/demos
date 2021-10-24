/* eslint-disable @typescript-eslint/no-explicit-any */
import { Test } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { getModelToken } from '@nestjs/mongoose';

import * as faker from 'faker';
import { of } from 'rxjs';

import { EntityMinimalAdmin } from '@dark-rush-photography/shared/types';
import { Document, DocumentModel } from '../schema/document.schema';
import { ConfigProvider } from '../providers/config.provider';
import { ImageAddProvider } from '../providers/image-add.provider';
import { ImageAddBlobProvider } from '../providers/image-add-blob.provider';
import { ImagePostsService } from './image-posts.service';

jest.mock('../entities/entity-repository.functions', () => ({
  ...jest.requireActual('../entities/entity-repository.functions'),
}));
import * as entityRepositoryFunctions from '../entities/entity-repository.functions';

jest.mock('../entities/entity-load-admin.functions', () => ({
  ...jest.requireActual('../entities/entity-load-admin.functions'),
}));
import * as entityLoadAdminFunctions from '../entities/entity-load-admin.functions';

describe('image-posts.service', () => {
  let imagePostsService: ImagePostsService;
  let imageAddProvider: ImageAddProvider;

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
        ImagePostsService,
        ImageAddProvider,
        ImageAddBlobProvider,
      ],
    }).compile();

    imagePostsService = moduleRef.get<ImagePostsService>(ImagePostsService);
    imageAddProvider = moduleRef.get<ImageAddProvider>(ImageAddProvider);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create$', () => {
    it('should create an image post and upload an image', (done: any) => {
      const mockedCreateImagePostEntity$ = jest
        .spyOn(entityRepositoryFunctions, 'createImagePostEntity$')
        .mockReturnValue(of({} as DocumentModel));

      const mockedAddUploadImage$ = jest
        .spyOn(imageAddProvider, 'addImagePostImage$')
        .mockReturnValue(of(undefined));

      jest
        .spyOn(entityRepositoryFunctions, 'findEntityById$')
        .mockReturnValue(of({} as DocumentModel));

      jest
        .spyOn(entityLoadAdminFunctions, 'loadEntityMinimalAdmin')
        .mockReturnValue({} as EntityMinimalAdmin);

      imagePostsService
        .create$(faker.lorem.sentence(), {} as Express.Multer.File)
        .subscribe(() => {
          expect(mockedCreateImagePostEntity$).toBeCalled();
          expect(mockedAddUploadImage$).toBeCalled();
          done();
        });
    });

    it('should not load a minimal admin entity if entity not found', (done: any) => {
      jest
        .spyOn(entityRepositoryFunctions, 'createImagePostEntity$')
        .mockReturnValue(of({} as DocumentModel));

      jest
        .spyOn(imageAddProvider, 'addImagePostImage$')
        .mockReturnValue(of(undefined));

      jest
        .spyOn(entityRepositoryFunctions, 'findEntityById$')
        .mockReturnValue(of(null));

      const mockedLoadEntityMinimalAdmin = jest.spyOn(
        entityLoadAdminFunctions,
        'loadEntityMinimalAdmin'
      );

      imagePostsService
        .create$(faker.lorem.sentence(), {} as Express.Multer.File)
        .subscribe({
          next: () => {
            done();
          },
          error: () => {
            expect(mockedLoadEntityMinimalAdmin).not.toHaveBeenCalled();
            done();
          },
          complete: () => {
            done();
          },
        });
    });
  });
});
