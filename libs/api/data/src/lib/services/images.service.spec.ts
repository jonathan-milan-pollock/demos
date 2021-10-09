/* eslint-disable @typescript-eslint/no-explicit-any */
import { Test } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { getModelToken } from '@nestjs/mongoose';

import * as faker from 'faker';
import { of } from 'rxjs';

import {
  DUMMY_MONGODB_ID,
  Image,
  ImageAdmin,
  ImageUpdate,
  ThreeSixtyImageAdd,
} from '@dark-rush-photography/shared/types';
import { Document } from '../schema/document.schema';
import { ConfigProvider } from '../providers/config.provider';
import { ImageAddProvider } from '../providers/image-add.provider';
import { ImageUpdateProvider } from '../providers/image-update.provider';
import { ImageStateChangeProvider } from '../providers/image-state-change.provider';
import { ImageRemoveProvider } from '../providers/image-remove.provider';
import { ImageFindProvider } from '../providers/image-find.provider';
import { ContentAddBlobProvider } from '../providers/content-add-blob.provider';
import { ContentRemoveProvider } from '../providers/content-remove.provider';
import { ContentRemoveOneProvider } from '../providers/content-remove-one.provider';
import { ContentDeleteBlobsProvider } from '../providers/content-delete-blobs.provider';
import { ImagesService } from './images.service';

jest.mock('../content/content-load.functions', () => ({
  ...jest.requireActual('../content/content-load.functions'),
}));
import * as contentLoadFunctions from '../content/content-load.functions';

describe('images.service', () => {
  let imagesService: ImagesService;
  let imageAddProvider: ImageAddProvider;
  let imageUpdateProvider: ImageUpdateProvider;
  let imageStateChangeProvider: ImageStateChangeProvider;
  let imageRemoveProvider: ImageRemoveProvider;

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
        ImagesService,
        ImageAddProvider,
        ImageUpdateProvider,
        ImageStateChangeProvider,
        ImageRemoveProvider,
        ImageFindProvider,
        ContentAddBlobProvider,
        ContentRemoveProvider,
        ContentRemoveOneProvider,
        ContentDeleteBlobsProvider,
      ],
    }).compile();

    imagesService = moduleRef.get<ImagesService>(ImagesService);
    imageAddProvider = moduleRef.get<ImageAddProvider>(ImageAddProvider);
    imageUpdateProvider =
      moduleRef.get<ImageUpdateProvider>(ImageUpdateProvider);
    imageStateChangeProvider = moduleRef.get<ImageStateChangeProvider>(
      ImageStateChangeProvider
    );
    imageRemoveProvider =
      moduleRef.get<ImageRemoveProvider>(ImageRemoveProvider);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('addThreeSixtyImage$', () => {
    it('should add a three sixty image', (done: any) => {
      const mockedAddThreeSixtyImage$ = jest
        .spyOn(imageAddProvider, 'addThreeSixtyImage$')
        .mockReturnValue(of({} as Image));

      jest
        .spyOn(contentLoadFunctions, 'loadImageAdmin')
        .mockReturnValue({} as ImageAdmin);

      imagesService
        .addThreeSixtyImage$(DUMMY_MONGODB_ID, {} as ThreeSixtyImageAdd)
        .subscribe(() => {
          expect(mockedAddThreeSixtyImage$).toBeCalled();
          done();
        });
    });
  });

  describe('update$', () => {
    it('should update an image', (done: any) => {
      const mockedUpdateImage$ = jest
        .spyOn(imageUpdateProvider, 'updateImage$')
        .mockReturnValue(of({} as ImageAdmin));

      imagesService
        .update$(faker.datatype.uuid(), DUMMY_MONGODB_ID, {} as ImageUpdate)
        .subscribe(() => {
          expect(mockedUpdateImage$).toBeCalled();
          done();
        });
    });
  });

  describe('select$', () => {
    it('should select an image', (done: any) => {
      const mockedSelectImage$ = jest
        .spyOn(imageStateChangeProvider, 'selectImage$')
        .mockReturnValue(of({} as ImageAdmin));

      imagesService
        .select$(faker.datatype.uuid(), DUMMY_MONGODB_ID)
        .subscribe(() => {
          expect(mockedSelectImage$).toBeCalled();
          done();
        });
    });
  });

  describe('archive$', () => {
    it('should archive an image', (done: any) => {
      const mockedArchiveImage$ = jest
        .spyOn(imageStateChangeProvider, 'archiveImage$')
        .mockReturnValue(of({} as ImageAdmin));

      imagesService
        .archive$(faker.datatype.uuid(), DUMMY_MONGODB_ID)
        .subscribe(() => {
          expect(mockedArchiveImage$).toBeCalled();
          done();
        });
    });
  });

  describe('unarchive$', () => {
    it('should unarchive an image', (done: any) => {
      const mockedUnarchiveImage$ = jest
        .spyOn(imageStateChangeProvider, 'unarchiveImage$')
        .mockReturnValue(of({} as ImageAdmin));

      imagesService
        .unarchive$(faker.datatype.uuid(), DUMMY_MONGODB_ID)
        .subscribe(() => {
          expect(mockedUnarchiveImage$).toBeCalled();
          done();
        });
    });
  });

  describe('remove$', () => {
    it('should remove an image', (done: any) => {
      const mockedRemoveImage$ = jest
        .spyOn(imageRemoveProvider, 'removeImage$')
        .mockReturnValue(of(undefined));

      imagesService
        .remove$(faker.datatype.uuid(), DUMMY_MONGODB_ID)
        .subscribe(() => {
          expect(mockedRemoveImage$).toBeCalled();
          done();
        });
    });
  });
});
