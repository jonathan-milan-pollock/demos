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
  ImageSelections,
  ImageState,
  ImageUpdate,
  ThreeSixtyImageAdd,
} from '@dark-rush-photography/shared/types';
import { Document, DocumentModel } from '../schema/document.schema';
import { ConfigProvider } from '../providers/config.provider';
import { ImageAddProvider } from '../providers/image-add.provider';
import { ImageAddBlobProvider } from '../providers/image-add-blob.provider';
import { ImageStateChangeProvider } from '../providers/image-state-change.provider';
import { ImageRemoveOneProvider } from '../providers/image-remove-one.provider';
import { ImageDeleteBlobsProvider } from '../providers/image-delete-blobs.provider';
import { CronProcessStartProvider } from '../providers/cron-process-start.provider';
import { CronProcessStartTypeProvider } from '../providers/cron-process-start-type.provider';
import { ImagesService } from './images.service';

jest.mock('../entities/entity-repository.functions', () => ({
  ...jest.requireActual('../entities/entity-repository.functions'),
}));
import * as entityRepositoryFunctions from '../entities/entity-repository.functions';

jest.mock('../entities/entity-validate-document-model.functions', () => ({
  ...jest.requireActual('../entities/entity-validate-document-model.functions'),
}));
import * as entityValidationFunctions from '../entities/entity-validate-document-model.functions';

jest.mock('../images/image-repository.functions', () => ({
  ...jest.requireActual('../images/image-repository.functions'),
}));
import * as imageRepositoryFunctions from '../images/image-repository.functions';

jest.mock('../images/image-load.functions', () => ({
  ...jest.requireActual('../images/image-load.functions'),
}));
import * as imageLoadFunctions from '../images/image-load.functions';

jest.mock('../images/image-validation.functions', () => ({
  ...jest.requireActual('../images/image-validation.functions'),
}));
import * as imageValidationFunctions from '../images/image-validation.functions';

describe('images.service', () => {
  let imagesService: ImagesService;
  let imageAddProvider: ImageAddProvider;
  let imageStateChangeProvider: ImageStateChangeProvider;
  let imageRemoveOneProvider: ImageRemoveOneProvider;
  let cronProcessStartProvider: CronProcessStartProvider;

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
        ImageAddBlobProvider,
        ImageStateChangeProvider,
        ImageRemoveOneProvider,
        ImageDeleteBlobsProvider,
        CronProcessStartProvider,
        CronProcessStartTypeProvider,
      ],
    }).compile();

    imagesService = moduleRef.get<ImagesService>(ImagesService);
    imageAddProvider = moduleRef.get<ImageAddProvider>(ImageAddProvider);
    imageStateChangeProvider = moduleRef.get<ImageStateChangeProvider>(
      ImageStateChangeProvider
    );
    imageRemoveOneProvider = moduleRef.get<ImageRemoveOneProvider>(
      ImageRemoveOneProvider
    );
    cronProcessStartProvider = moduleRef.get<CronProcessStartProvider>(
      CronProcessStartProvider
    );
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
        .spyOn(imageLoadFunctions, 'loadImageAdmin')
        .mockReturnValue({} as ImageAdmin);

      imagesService
        .addThreeSixtyImage$(DUMMY_MONGODB_ID, {} as ThreeSixtyImageAdd)
        .subscribe(() => {
          expect(mockedAddThreeSixtyImage$).toBeCalled();
          done();
        });
    });
  });

  describe('load$', () => {
    it('should load images for image states', (done: any) => {
      jest
        .spyOn(entityRepositoryFunctions, 'findEntityById$')
        .mockReturnValue(of({} as DocumentModel));

      const imageState = faker.random.arrayElement(Object.values(ImageState));

      jest
        .spyOn(entityValidationFunctions, 'validateEntityFound')
        .mockReturnValue({
          images: [{ state: imageState } as Image],
        } as DocumentModel);

      const mockedLoadImageAdmin = jest
        .spyOn(imageLoadFunctions, 'loadImageAdmin')
        .mockReturnValue({} as ImageAdmin);

      imagesService
        .load$(DUMMY_MONGODB_ID, {
          states: [imageState],
        })
        .subscribe(() => {
          expect(mockedLoadImageAdmin).toBeCalled();
          done();
        });
    });

    it('should not load images when entity is not found', (done: any) => {
      jest
        .spyOn(entityRepositoryFunctions, 'findEntityById$')
        .mockReturnValue(of({} as DocumentModel));

      const imageState = faker.random.arrayElement(Object.values(ImageState));

      jest
        .spyOn(entityValidationFunctions, 'validateEntityFound')
        .mockReturnValue({
          images: [{ state: imageState } as Image],
        } as DocumentModel);

      const mockedLoadImageAdmin = jest
        .spyOn(imageLoadFunctions, 'loadImageAdmin')
        .mockReturnValue({} as ImageAdmin);

      imagesService
        .load$(DUMMY_MONGODB_ID, {
          states: [imageState],
        })
        .subscribe(() => {
          expect(mockedLoadImageAdmin).toBeCalled();
          done();
        });
    });
  });

  describe('selectNewImages$', () => {
    it('should select new images', (done: any) => {
      const mockedSelectImage$ = jest
        .spyOn(imageStateChangeProvider, 'selectNewImages$')
        .mockReturnValue(of(undefined));

      imagesService
        .selectNewImages$(DUMMY_MONGODB_ID, {} as ImageSelections)
        .subscribe(() => {
          expect(mockedSelectImage$).toBeCalled();
          done();
        });
    });
  });

  describe('updateNewImages$', () => {
    it('should update an image', (done: any) => {
      const mockedUpdateImage$ = jest
        .spyOn(imageRepositoryFunctions, 'updateImage$')
        .mockReturnValue(of({} as DocumentModel));

      imagesService
        .update$(faker.datatype.uuid(), DUMMY_MONGODB_ID, {} as ImageUpdate)
        .subscribe(() => {
          expect(mockedUpdateImage$).toBeCalled();
          done();
        });
    });
  });

  describe('archive$', () => {
    it('should archive an image', (done: any) => {
      const mockedArchiveImage$ = jest
        .spyOn(imageStateChangeProvider, 'archiveImage$')
        .mockReturnValue(of(undefined));

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
        .mockReturnValue(of(undefined));

      imagesService
        .unarchive$(faker.datatype.uuid(), DUMMY_MONGODB_ID)
        .subscribe(() => {
          expect(mockedUnarchiveImage$).toBeCalled();
          done();
        });
    });
  });

  describe('removePublishImage$', () => {
    it('should remove an image', (done: any) => {
      const mockedRemoveImage$ = jest
        .spyOn(imageRemoveOneProvider, 'removeImage$')
        .mockReturnValue(of(undefined));

      imagesService
        .removePublishImage$(faker.datatype.uuid(), DUMMY_MONGODB_ID)
        .subscribe(() => {
          expect(mockedRemoveImage$).toBeCalled();
          done();
        });
    });
  });
});
