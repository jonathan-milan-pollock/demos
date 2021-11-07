/* eslint-disable @typescript-eslint/no-explicit-any */
import { Test } from '@nestjs/testing';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getModelToken } from '@nestjs/mongoose';

import * as faker from 'faker';
import { of } from 'rxjs';

import {
  CronProcessType,
  DUMMY_MONGODB_ID,
  EntityType,
  Image,
  ImageAdmin,
  ImageOrders,
  ImageSelections,
  ImageState,
  ImageUpdate,
} from '@dark-rush-photography/shared/types';
import { Document, DocumentModel } from '../schema/document.schema';
import { CronProcessTable } from '../tables/cron-process.table';
import { ConfigProvider } from '../providers/config.provider';
import { ImageAddProvider } from '../providers/image-add.provider';
import { ImageAddBlobProvider } from '../providers/image-add-blob.provider';
import { ImageOrderProvider } from '../providers/image-order.provider';
import { ImageStateChangeProvider } from '../providers/image-state-change.provider';
import { ImageRemoveOneProvider } from '../providers/image-remove-one.provider';
import { ImageDeleteBlobsProvider } from '../providers/image-delete-blobs.provider';
import { CronProcessRepositoryProvider } from '../providers/cron-process-repository.provider';
import { ImagesService } from './images.service';

jest.mock('../entities/entity-repository.functions', () => ({
  ...jest.requireActual('../entities/entity-repository.functions'),
}));
import * as entityRepositoryFunctions from '../entities/entity-repository.functions';

jest.mock('../entities/entity-validation.functions', () => ({
  ...jest.requireActual('../entities/entity-validation.functions'),
}));
import * as entityValidationFunctions from '../entities/entity-validation.functions';

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

jest.mock('../cron-processes/cron-process-start.functions', () => ({
  ...jest.requireActual('../cron-processes/cron-process-start.functions'),
}));
import * as cronProcessStartFunctions from '../cron-processes/cron-process-start.functions';

describe('images.service', () => {
  let imagesService: ImagesService;
  let imageAddProvider: ImageAddProvider;
  let imageOrderProvider: ImageOrderProvider;
  let imageStateChangeProvider: ImageStateChangeProvider;
  let imageRemoveOneProvider: ImageRemoveOneProvider;

  const mockedCronProcessRepositoryProvider = {
    create$: jest.fn().mockReturnValue(of(undefined)),
  };

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
        {
          provide: CronProcessRepositoryProvider.name,
          useValue: mockedCronProcessRepositoryProvider,
        },
        ImagesService,
        ImageAddProvider,
        ImageAddBlobProvider,
        ImageOrderProvider,
        ImageStateChangeProvider,
        ImageRemoveOneProvider,
        ImageDeleteBlobsProvider,
      ],
    }).compile();

    imagesService = moduleRef.get<ImagesService>(ImagesService);
    imageAddProvider = moduleRef.get<ImageAddProvider>(ImageAddProvider);
    imageOrderProvider = moduleRef.get<ImageOrderProvider>(ImageOrderProvider);
    imageStateChangeProvider = moduleRef.get<ImageStateChangeProvider>(
      ImageStateChangeProvider
    );
    imageRemoveOneProvider = moduleRef.get<ImageRemoveOneProvider>(
      ImageRemoveOneProvider
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('addTestImage$', () => {
    it('should add a test image', (done: any) => {
      const mockedAddTestImage$ = jest
        .spyOn(imageAddProvider, 'addTestImage$')
        .mockReturnValue(of({} as Image));

      const mockedLoadImageAdmin = jest
        .spyOn(imageLoadFunctions, 'loadImageAdmin')
        .mockReturnValue({} as ImageAdmin);

      imagesService.addTestImage$(DUMMY_MONGODB_ID).subscribe(() => {
        expect(mockedAddTestImage$).toBeCalledTimes(1);
        expect(mockedLoadImageAdmin).toBeCalledTimes(1);
        done();
      });
    });
  });

  describe('loadImages$', () => {
    it('should load images for image states', (done: any) => {
      const imageState = faker.random.arrayElement(Object.values(ImageState));
      const mockedFindEntityById$ = jest
        .spyOn(entityRepositoryFunctions, 'findEntityById$')
        .mockReturnValue(
          of({ images: [{ state: imageState } as Image] } as DocumentModel)
        );

      const mockedValidateEntityFound = jest
        .spyOn(entityValidationFunctions, 'validateEntityFound')
        .mockImplementation((documentModel) => documentModel as DocumentModel);

      const mockedLoadImageAdmin = jest
        .spyOn(imageLoadFunctions, 'loadImageAdmin')
        .mockReturnValue({} as ImageAdmin);

      imagesService
        .loadImages$(DUMMY_MONGODB_ID, {
          imageStates: [imageState],
        })
        .subscribe((result) => {
          expect(mockedFindEntityById$).toBeCalledTimes(1);
          expect(mockedValidateEntityFound).toBeCalledTimes(1);
          expect(mockedLoadImageAdmin).toBeCalledTimes(1);
          expect(result).toBeDefined();
          done();
        });
    });

    it('should load images for multiple states', (done: any) => {
      const imageStateOne = faker.random.arrayElement(
        Object.values(ImageState)
      );
      const imageStateTwo = faker.random.arrayElement(
        Object.values(ImageState)
      );

      const mockedFindEntityById$ = jest
        .spyOn(entityRepositoryFunctions, 'findEntityById$')
        .mockReturnValue(
          of({
            images: [
              { state: imageStateOne } as Image,
              { state: imageStateTwo } as Image,
            ],
          } as DocumentModel)
        );

      const mockedValidateEntityFound = jest
        .spyOn(entityValidationFunctions, 'validateEntityFound')
        .mockImplementation((documentModel) => documentModel as DocumentModel);

      const mockedLoadImageAdmin = jest
        .spyOn(imageLoadFunctions, 'loadImageAdmin')
        .mockImplementation(() => ({} as ImageAdmin));

      imagesService
        .loadImages$(DUMMY_MONGODB_ID, {
          imageStates: [imageStateOne, imageStateTwo],
        })
        .subscribe((result) => {
          expect(mockedFindEntityById$).toBeCalledTimes(1);
          expect(mockedValidateEntityFound).toBeCalledTimes(1);
          expect(mockedLoadImageAdmin).toBeCalledTimes(2);
          expect(result.length).toBe(2);
          done();
        });
    });

    it('should load images for provided state', (done: any) => {
      const imageStateOne = ImageState.New;
      const imageStateTwo = ImageState.Selected;

      const mockedFindEntityById$ = jest
        .spyOn(entityRepositoryFunctions, 'findEntityById$')
        .mockReturnValue(
          of({
            images: [
              { state: imageStateOne } as Image,
              { state: imageStateTwo } as Image,
            ],
          } as DocumentModel)
        );

      const mockedValidateEntityFound = jest
        .spyOn(entityValidationFunctions, 'validateEntityFound')
        .mockImplementation((documentModel) => documentModel as DocumentModel);

      const mockedLoadImageAdmin = jest
        .spyOn(imageLoadFunctions, 'loadImageAdmin')
        .mockImplementation(() => ({} as ImageAdmin));

      imagesService
        .loadImages$(DUMMY_MONGODB_ID, {
          imageStates: [imageStateOne],
        })
        .subscribe((result) => {
          expect(mockedFindEntityById$).toBeCalledTimes(1);
          expect(mockedValidateEntityFound).toBeCalledTimes(1);
          expect(mockedLoadImageAdmin).toBeCalledTimes(1);
          expect(result.length).toBe(1);
          done();
        });
    });

    it('should return images in ascending order', (done: any) => {
      const imageState = faker.random.arrayElement(Object.values(ImageState));

      const mockedFindEntityById$ = jest
        .spyOn(entityRepositoryFunctions, 'findEntityById$')
        .mockReturnValue(
          of({
            images: [
              { state: imageState, order: 2 } as Image,
              { state: imageState, order: 1 } as Image,
            ],
          } as DocumentModel)
        );

      const mockedValidateEntityFound = jest
        .spyOn(entityValidationFunctions, 'validateEntityFound')
        .mockImplementation((documentModel) => documentModel as DocumentModel);

      const mockedLoadImageAdmin = jest
        .spyOn(imageLoadFunctions, 'loadImageAdmin')
        .mockImplementation(
          (image) => ({ ...image, seoKeywords: [] } as ImageAdmin)
        );

      imagesService
        .loadImages$(DUMMY_MONGODB_ID, {
          imageStates: [imageState],
        })
        .subscribe((result) => {
          expect(mockedFindEntityById$).toBeCalledTimes(1);
          expect(mockedValidateEntityFound).toBeCalledTimes(1);
          expect(mockedLoadImageAdmin).toBeCalledTimes(2);
          expect(result[0].order).toBe(1);
          expect(result[1].order).toBe(2);
          done();
        });
    });

    it('should return an empty array of images if none are found', (done: any) => {
      const imageState = faker.random.arrayElement(Object.values(ImageState));

      const mockedFindEntityById$ = jest
        .spyOn(entityRepositoryFunctions, 'findEntityById$')
        .mockReturnValue(of({ images: [] as Image[] } as DocumentModel));

      const mockedValidateEntityFound = jest
        .spyOn(entityValidationFunctions, 'validateEntityFound')
        .mockImplementation((documentModel) => documentModel as DocumentModel);

      const mockedLoadImageAdmin = jest.spyOn(
        imageLoadFunctions,
        'loadImageAdmin'
      );

      imagesService
        .loadImages$(DUMMY_MONGODB_ID, {
          imageStates: [imageState],
        })
        .subscribe((result) => {
          expect(mockedFindEntityById$).toBeCalledTimes(1);
          expect(mockedValidateEntityFound).toBeCalledTimes(1);
          expect(mockedLoadImageAdmin).not.toBeCalled();
          expect(result.length).toBe(0);
          done();
        });
    });

    it('should throw a not found exception when entity is not found', (done: any) => {
      const mockedFindEntityById$ = jest
        .spyOn(entityRepositoryFunctions, 'findEntityById$')
        .mockReturnValue(of(null));

      const mockedValidateEntityFound = jest
        .spyOn(entityValidationFunctions, 'validateEntityFound')
        .mockImplementation(() => {
          throw new NotFoundException();
        });

      const mockedLoadImageAdmin = jest.spyOn(
        imageLoadFunctions,
        'loadImageAdmin'
      );

      imagesService
        .loadImages$(DUMMY_MONGODB_ID, {
          imageStates: [],
        })
        .subscribe({
          next: () => {
            done();
          },
          error: (error) => {
            expect(mockedFindEntityById$).toBeCalledTimes(1);
            expect(mockedValidateEntityFound).toBeCalledTimes(1);
            expect(mockedLoadImageAdmin).not.toBeCalled();
            expect(error).toBeInstanceOf(NotFoundException);
            done();
          },
          complete: () => {
            done();
          },
        });
    });
  });

  describe('updateNewImages$', () => {
    it('should update new images', (done: any) => {
      const mockedFindEntityById$ = jest
        .spyOn(entityRepositoryFunctions, 'findEntityById$')
        .mockReturnValue(of({} as DocumentModel));

      const mockedValidateEntityFound = jest
        .spyOn(entityValidationFunctions, 'validateEntityFound')
        .mockImplementation((documentModel) => documentModel as DocumentModel);

      const mockedStartCronProcessType = jest
        .spyOn(cronProcessStartFunctions, 'startCronProcessType')
        .mockReturnValue({} as CronProcessTable);

      const mockedCreate$ = jest
        .spyOn(mockedCronProcessRepositoryProvider, 'create$')
        .mockReturnValue(of(undefined));

      imagesService.updateNewImages$(DUMMY_MONGODB_ID).subscribe(() => {
        expect(mockedFindEntityById$).toBeCalledTimes(1);
        expect(mockedValidateEntityFound).toBeCalledTimes(1);
        expect(mockedStartCronProcessType).toBeCalledTimes(1);
        const [cronProcessType] = mockedStartCronProcessType.mock.calls[0];
        expect(cronProcessType).toBe(CronProcessType.UpdateNewImages);
        expect(mockedCreate$).toBeCalledTimes(1);
        done();
      });
    });

    it('should not update new images when the entity type is test', (done: any) => {
      const mockedFindEntityById$ = jest
        .spyOn(entityRepositoryFunctions, 'findEntityById$')
        .mockReturnValue(of({ type: EntityType.Test } as DocumentModel));

      const mockedValidateEntityFound = jest
        .spyOn(entityValidationFunctions, 'validateEntityFound')
        .mockImplementation((documentModel) => documentModel as DocumentModel);

      const mockedStartCronProcessType = jest.spyOn(
        cronProcessStartFunctions,
        'startCronProcessType'
      );

      const mockedCreate$ = jest.spyOn(
        mockedCronProcessRepositoryProvider,
        'create$'
      );

      imagesService.updateNewImages$(DUMMY_MONGODB_ID).subscribe(() => {
        expect(mockedFindEntityById$).toBeCalledTimes(1);
        expect(mockedValidateEntityFound).toBeCalledTimes(1);
        expect(mockedStartCronProcessType).not.toBeCalled();
        expect(mockedCreate$).not.toBeCalled();
        done();
      });
    });

    it('should throw a not found exception when entity is not found', (done: any) => {
      const mockedFindEntityById$ = jest
        .spyOn(entityRepositoryFunctions, 'findEntityById$')
        .mockReturnValue(of(null));

      const mockedValidateEntityFound = jest
        .spyOn(entityValidationFunctions, 'validateEntityFound')
        .mockImplementation(() => {
          throw new NotFoundException();
        });

      const mockedStartCronProcessType = jest.spyOn(
        cronProcessStartFunctions,
        'startCronProcessType'
      );

      const mockedCreate$ = jest.spyOn(
        mockedCronProcessRepositoryProvider,
        'create$'
      );

      imagesService
        .loadImages$(DUMMY_MONGODB_ID, {
          imageStates: [],
        })
        .subscribe({
          next: () => {
            done();
          },
          error: (error) => {
            expect(mockedFindEntityById$).toBeCalledTimes(1);
            expect(mockedValidateEntityFound).toBeCalledTimes(1);
            expect(mockedStartCronProcessType).not.toBeCalled();
            expect(mockedCreate$).not.toBeCalled();
            expect(error).toBeInstanceOf(NotFoundException);
            done();
          },
          complete: () => {
            done();
          },
        });
    });
  });

  describe('orderImages$', () => {
    it('should order images', (done: any) => {
      const mockedOrderImages$ = jest
        .spyOn(imageOrderProvider, 'orderImages$')
        .mockReturnValue(of(undefined));

      imagesService
        .orderImages$(DUMMY_MONGODB_ID, {} as ImageOrders)
        .subscribe(() => {
          expect(mockedOrderImages$).toBeCalledTimes(1);
          done();
        });
    });
  });

  describe('selectNewImages$', () => {
    it('should select new images', (done: any) => {
      const mockedSelectNewImages$ = jest
        .spyOn(imageStateChangeProvider, 'selectNewImages$')
        .mockReturnValue(of(undefined));

      imagesService
        .selectNewImages$(DUMMY_MONGODB_ID, {} as ImageSelections)
        .subscribe(() => {
          expect(mockedSelectNewImages$).toBeCalledTimes(1);
          done();
        });
    });
  });

  describe('updatePublishImage$', () => {
    it('should update a publish image', (done: any) => {
      const mockedFindEntityById$ = jest
        .spyOn(entityRepositoryFunctions, 'findEntityById$')
        .mockReturnValue(of({} as DocumentModel));

      const mockedValidateEntityFound = jest
        .spyOn(entityValidationFunctions, 'validateEntityFound')
        .mockImplementation((documentModel) => documentModel as DocumentModel);

      const mockedValidateImageFound = jest
        .spyOn(imageValidationFunctions, 'validateImageFound')
        .mockImplementation(() => ({} as Image));

      const mockedValidatePublishImage = jest
        .spyOn(imageValidationFunctions, 'validatePublishImage')
        .mockImplementation(() => ({} as Image));

      const mockedUpdateImage$ = jest
        .spyOn(imageRepositoryFunctions, 'updateImage$')
        .mockReturnValue(of({} as DocumentModel));

      imagesService
        .updatePublishImage$(
          faker.datatype.uuid(),
          DUMMY_MONGODB_ID,
          {} as ImageUpdate
        )
        .subscribe(() => {
          expect(mockedFindEntityById$).toBeCalledTimes(1);
          expect(mockedValidateEntityFound).toBeCalledTimes(1);
          expect(mockedValidateImageFound).toBeCalledTimes(1);
          expect(mockedValidatePublishImage).toBeCalledTimes(1);
          expect(mockedUpdateImage$).toBeCalledTimes(1);
          done();
        });
    });

    it('should throw a not found exception when entity is not found', (done: any) => {
      const mockedFindEntityById$ = jest
        .spyOn(entityRepositoryFunctions, 'findEntityById$')
        .mockReturnValue(of(null));

      const mockedValidateEntityFound = jest
        .spyOn(entityValidationFunctions, 'validateEntityFound')
        .mockImplementation(() => {
          throw new NotFoundException();
        });

      const mockedValidateImageFound = jest.spyOn(
        imageValidationFunctions,
        'validateImageFound'
      );

      const mockedValidatePublishImage = jest.spyOn(
        imageValidationFunctions,
        'validatePublishImage'
      );

      const mockedUpdateImage$ = jest.spyOn(
        imageRepositoryFunctions,
        'updateImage$'
      );

      imagesService
        .updatePublishImage$(
          faker.datatype.uuid(),
          DUMMY_MONGODB_ID,
          {} as ImageUpdate
        )
        .subscribe({
          next: () => {
            done();
          },
          error: (error) => {
            expect(mockedFindEntityById$).toBeCalledTimes(1);
            expect(mockedValidateEntityFound).toBeCalledTimes(1);
            expect(mockedValidateImageFound).not.toBeCalled();
            expect(mockedValidatePublishImage).not.toBeCalled();
            expect(mockedUpdateImage$).not.toBeCalled();
            expect(error).toBeInstanceOf(NotFoundException);
            done();
          },
          complete: () => {
            done();
          },
        });
    });

    it('should throw a not found exception when image is not found', (done: any) => {
      const mockedFindEntityById$ = jest
        .spyOn(entityRepositoryFunctions, 'findEntityById$')
        .mockReturnValue(of({} as DocumentModel));

      const mockedValidateEntityFound = jest
        .spyOn(entityValidationFunctions, 'validateEntityFound')
        .mockImplementation((documentModel) => documentModel as DocumentModel);

      const mockedValidateImageFound = jest
        .spyOn(imageValidationFunctions, 'validateImageFound')
        .mockImplementation(() => {
          throw new NotFoundException();
        });

      const mockedValidatePublishImage = jest.spyOn(
        imageValidationFunctions,
        'validatePublishImage'
      );

      const mockedUpdateImage$ = jest.spyOn(
        imageRepositoryFunctions,
        'updateImage$'
      );

      imagesService
        .updatePublishImage$(
          faker.datatype.uuid(),
          DUMMY_MONGODB_ID,
          {} as ImageUpdate
        )
        .subscribe({
          next: () => {
            done();
          },
          error: (error) => {
            expect(mockedFindEntityById$).toBeCalledTimes(1);
            expect(mockedValidateEntityFound).toBeCalledTimes(1);
            expect(mockedValidateImageFound).toBeCalledTimes(1);
            expect(mockedValidatePublishImage).not.toBeCalled();
            expect(mockedUpdateImage$).not.toBeCalled();
            expect(error).toBeInstanceOf(NotFoundException);
            done();
          },
          complete: () => {
            done();
          },
        });
    });

    it('should throw a conflict exception when image is not a publish image', (done: any) => {
      const mockedFindEntityById$ = jest
        .spyOn(entityRepositoryFunctions, 'findEntityById$')
        .mockReturnValue(of({} as DocumentModel));

      const mockedValidateEntityFound = jest
        .spyOn(entityValidationFunctions, 'validateEntityFound')
        .mockImplementation((documentModel) => documentModel as DocumentModel);

      const mockedValidateImageFound = jest
        .spyOn(imageValidationFunctions, 'validateImageFound')
        .mockImplementation(() => ({} as Image));

      const mockedValidatePublishImage = jest
        .spyOn(imageValidationFunctions, 'validatePublishImage')
        .mockImplementation(() => {
          throw new ConflictException();
        });

      const mockedUpdateImage$ = jest.spyOn(
        imageRepositoryFunctions,
        'updateImage$'
      );

      imagesService
        .updatePublishImage$(
          faker.datatype.uuid(),
          DUMMY_MONGODB_ID,
          {} as ImageUpdate
        )
        .subscribe({
          next: () => {
            done();
          },
          error: (error) => {
            expect(mockedFindEntityById$).toBeCalledTimes(1);
            expect(mockedValidateEntityFound).toBeCalledTimes(1);
            expect(mockedValidateImageFound).toBeCalledTimes(1);
            expect(mockedValidatePublishImage).toBeCalledTimes(1);
            expect(mockedUpdateImage$).not.toBeCalled();
            expect(error).toBeInstanceOf(ConflictException);
            done();
          },
          complete: () => {
            done();
          },
        });
    });
  });

  describe('archiveImage$', () => {
    it('should archive an image', (done: any) => {
      const mockedArchiveImage$ = jest
        .spyOn(imageStateChangeProvider, 'archiveImage$')
        .mockReturnValue(of(undefined));

      imagesService
        .archiveImage$(faker.datatype.uuid(), DUMMY_MONGODB_ID)
        .subscribe(() => {
          expect(mockedArchiveImage$).toBeCalledTimes(1);
          done();
        });
    });
  });

  describe('unarchiveImage$', () => {
    it('should unarchive an image', (done: any) => {
      const mockedUnarchiveImage$ = jest
        .spyOn(imageStateChangeProvider, 'unarchiveImage$')
        .mockReturnValue(of(undefined));

      imagesService
        .unarchiveImage$(faker.datatype.uuid(), DUMMY_MONGODB_ID)
        .subscribe(() => {
          expect(mockedUnarchiveImage$).toBeCalledTimes(1);
          done();
        });
    });
  });

  describe('removePublishImage$', () => {
    it('should remove a publish image when image state is selected', (done: any) => {
      const imageId = faker.datatype.uuid();

      const mockedFindEntityById$ = jest
        .spyOn(entityRepositoryFunctions, 'findEntityById$')
        .mockReturnValue(
          of({
            images: [{ id: imageId, state: ImageState.Selected } as Image],
          } as DocumentModel)
        );

      const mockedRemoveImage$ = jest
        .spyOn(imageRemoveOneProvider, 'removeImage$')
        .mockReturnValue(of(undefined));

      imagesService
        .removePublishImage$(imageId, DUMMY_MONGODB_ID)
        .subscribe(() => {
          expect(mockedFindEntityById$).toBeCalledTimes(1);
          expect(mockedRemoveImage$).toBeCalledTimes(1);
          done();
        });
    });

    it('should remove a publish image when image state is public', (done: any) => {
      const imageId = faker.datatype.uuid();

      const mockedFindEntityById$ = jest
        .spyOn(entityRepositoryFunctions, 'findEntityById$')
        .mockReturnValue(
          of({
            images: [{ id: imageId, state: ImageState.Public } as Image],
          } as DocumentModel)
        );

      const mockedRemoveImage$ = jest
        .spyOn(imageRemoveOneProvider, 'removeImage$')
        .mockReturnValue(of(undefined));

      imagesService
        .removePublishImage$(imageId, DUMMY_MONGODB_ID)
        .subscribe(() => {
          expect(mockedFindEntityById$).toBeCalledTimes(1);
          expect(mockedRemoveImage$).toBeCalledTimes(1);
          done();
        });
    });

    it('should not remove a publish image when entity is not found', (done: any) => {
      const mockedFindEntityById$ = jest
        .spyOn(entityRepositoryFunctions, 'findEntityById$')
        .mockReturnValue(of(null));

      const mockedValidatePublishImage = jest.spyOn(
        imageValidationFunctions,
        'validatePublishImage'
      );

      const mockedRemoveImage$ = jest.spyOn(
        imageRemoveOneProvider,
        'removeImage$'
      );

      imagesService
        .removePublishImage$(faker.datatype.uuid(), DUMMY_MONGODB_ID)
        .subscribe(() => {
          expect(mockedFindEntityById$).toBeCalledTimes(1);
          expect(mockedValidatePublishImage).not.toBeCalled();
          expect(mockedRemoveImage$).not.toBeCalled();
          done();
        });
    });

    it('should not remove a publish image if image is not found', (done: any) => {
      const imageId = faker.datatype.uuid();

      const mockedFindEntityById$ = jest
        .spyOn(entityRepositoryFunctions, 'findEntityById$')
        .mockReturnValue(
          of({ images: [{ id: imageId } as Image] } as DocumentModel)
        );

      const mockedValidatePublishImage = jest.spyOn(
        imageValidationFunctions,
        'validatePublishImage'
      );

      const mockedRemoveImage$ = jest.spyOn(
        imageRemoveOneProvider,
        'removeImage$'
      );

      imagesService
        .removePublishImage$(faker.datatype.uuid(), DUMMY_MONGODB_ID)
        .subscribe(() => {
          expect(mockedFindEntityById$).toBeCalledTimes(1);
          expect(mockedValidatePublishImage).not.toBeCalled();
          expect(mockedRemoveImage$).not.toBeCalled();
          done();
        });
    });

    it('should not remove a publish image if image is new', (done: any) => {
      const imageId = faker.datatype.uuid();

      const mockedFindEntityById$ = jest
        .spyOn(entityRepositoryFunctions, 'findEntityById$')
        .mockReturnValue(
          of({
            images: [{ id: imageId, state: ImageState.New } as Image],
          } as DocumentModel)
        );

      const mockedValidatePublishImage = jest.spyOn(
        imageValidationFunctions,
        'validatePublishImage'
      );

      const mockedRemoveImage$ = jest.spyOn(
        imageRemoveOneProvider,
        'removeImage$'
      );

      imagesService
        .removePublishImage$(faker.datatype.uuid(), DUMMY_MONGODB_ID)
        .subscribe(() => {
          expect(mockedFindEntityById$).toBeCalledTimes(1);
          expect(mockedValidatePublishImage).not.toBeCalled();
          expect(mockedRemoveImage$).not.toBeCalled();
          done();
        });
    });

    it('should not remove a publish image if image is archived', (done: any) => {
      const imageId = faker.datatype.uuid();

      const mockedFindEntityById$ = jest
        .spyOn(entityRepositoryFunctions, 'findEntityById$')
        .mockReturnValue(
          of({
            images: [{ id: imageId, state: ImageState.Archived } as Image],
          } as DocumentModel)
        );

      const mockedValidatePublishImage = jest.spyOn(
        imageValidationFunctions,
        'validatePublishImage'
      );

      const mockedRemoveImage$ = jest.spyOn(
        imageRemoveOneProvider,
        'removeImage$'
      );

      imagesService
        .removePublishImage$(faker.datatype.uuid(), DUMMY_MONGODB_ID)
        .subscribe(() => {
          expect(mockedFindEntityById$).toBeCalledTimes(1);
          expect(mockedValidatePublishImage).not.toBeCalled();
          expect(mockedRemoveImage$).not.toBeCalled();
          done();
        });
    });
  });
});
