/* eslint-disable @typescript-eslint/no-explicit-any */
import { Test } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getModelToken } from '@nestjs/mongoose';

import * as faker from 'faker';
import { of } from 'rxjs';

import {
  DUMMY_MONGODB_ID,
  Image,
  ImageState,
  Video,
} from '@dark-rush-photography/shared/types';
import { Document, DocumentModel } from '../schema/document.schema';
import { ConfigProvider } from './config.provider';
import { ContentRemoveProvider } from './content-remove.provider';
import { ContentRemoveOneProvider } from './content-remove-one.provider';
import { ContentDeleteBlobsProvider } from './content-delete-blobs.provider';

jest.mock('../entities/entity-repository.functions', () => ({
  ...jest.requireActual('../entities/entity-repository.functions'),
}));
import * as entityRepositoryFunctions from '../entities/entity-repository.functions';

jest.mock('../entities/entity-validation.functions', () => ({
  ...jest.requireActual('../entities/entity-validation.functions'),
}));
import * as entityValidationFunctions from '../entities/entity-validation.functions';

describe('content-remove.provider', () => {
  let contentRemoveProvider: ContentRemoveProvider;
  let contentRemoveOneProvider: ContentRemoveOneProvider;

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
        ContentRemoveProvider,
        ContentRemoveOneProvider,
        ContentDeleteBlobsProvider,
      ],
    }).compile();

    contentRemoveProvider = moduleRef.get<ContentRemoveProvider>(
      ContentRemoveProvider
    );
    contentRemoveOneProvider = moduleRef.get<ContentRemoveOneProvider>(
      ContentRemoveOneProvider
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('removeAllImages$', () => {
    it('should remove all images of an entity', (done: any) => {
      jest
        .spyOn(entityRepositoryFunctions, 'findEntityById$')
        .mockReturnValue(of({} as DocumentModel));

      jest
        .spyOn(entityValidationFunctions, 'validateEntityFound')
        .mockReturnValue({ images: [{} as Image] } as DocumentModel);

      const mockedRemoveImage$ = jest
        .spyOn(contentRemoveOneProvider, 'removeImage$')
        .mockReturnValue(of(undefined));

      contentRemoveProvider.removeAllImages$(DUMMY_MONGODB_ID).subscribe(() => {
        expect(mockedRemoveImage$).toHaveBeenCalled();
        done();
      });
    });

    it('should not remove all images of entity if entity is not found', (done: any) => {
      jest
        .spyOn(entityRepositoryFunctions, 'findEntityById$')
        .mockReturnValue(of(null));

      jest
        .spyOn(entityValidationFunctions, 'validateEntityFound')
        .mockImplementation(() => {
          throw new NotFoundException();
        });

      const mockedRemoveImage$ = jest.spyOn(
        contentRemoveOneProvider,
        'removeImage$'
      );

      contentRemoveProvider.removeAllImages$(DUMMY_MONGODB_ID).subscribe({
        next: () => {
          done();
        },
        error: () => {
          expect(mockedRemoveImage$).not.toHaveBeenCalled();
          done();
        },
        complete: () => {
          done();
        },
      });
    });

    it('should not remove all images of entity if it does not have any images', (done: any) => {
      const documentModel: DocumentModel = {
        images: [],
      } as unknown as DocumentModel;
      jest
        .spyOn(entityRepositoryFunctions, 'findEntityById$')
        .mockReturnValue(of(documentModel));

      jest
        .spyOn(entityValidationFunctions, 'validateEntityFound')
        .mockReturnValue(documentModel);

      const mockedRemoveImage$ = jest.spyOn(
        contentRemoveOneProvider,
        'removeImage$'
      );

      contentRemoveProvider.removeAllImages$(DUMMY_MONGODB_ID).subscribe(() => {
        expect(mockedRemoveImage$).not.toHaveBeenCalled();
        done();
      });
    });

    it('should remove multiple images of an entity if they are found', (done: any) => {
      jest
        .spyOn(entityRepositoryFunctions, 'findEntityById$')
        .mockReturnValue(of({} as DocumentModel));

      jest
        .spyOn(entityValidationFunctions, 'validateEntityFound')
        .mockReturnValue({
          images: [{} as Image, {} as Image],
        } as DocumentModel);

      const mockedRemoveImage$ = jest
        .spyOn(contentRemoveOneProvider, 'removeImage$')
        .mockReturnValue(of(undefined));

      contentRemoveProvider.removeAllImages$(DUMMY_MONGODB_ID).subscribe(() => {
        expect(mockedRemoveImage$).toBeCalledTimes(2);
        done();
      });
    });
  });

  describe('removeAllImagesForState$', () => {
    it('should remove all images of an entity for a given state', (done: any) => {
      jest
        .spyOn(entityRepositoryFunctions, 'findEntityById$')
        .mockReturnValue(of({} as DocumentModel));

      const imageState = faker.random.arrayElement(Object.values(ImageState));
      jest
        .spyOn(entityValidationFunctions, 'validateEntityFound')
        .mockReturnValue({
          images: [{ state: imageState } as Image],
        } as DocumentModel);

      const mockedRemoveImage$ = jest
        .spyOn(contentRemoveOneProvider, 'removeImage$')
        .mockReturnValue(of(undefined));

      contentRemoveProvider
        .removeAllImagesForState$(imageState, DUMMY_MONGODB_ID)
        .subscribe(() => {
          expect(mockedRemoveImage$).toHaveBeenCalled();
          done();
        });
    });

    it('should not remove all images of entity for a given state if entity is not found', (done: any) => {
      jest
        .spyOn(entityRepositoryFunctions, 'findEntityById$')
        .mockReturnValue(of(null));

      jest
        .spyOn(entityValidationFunctions, 'validateEntityFound')
        .mockImplementation(() => {
          throw new NotFoundException();
        });

      const mockedRemoveImage$ = jest.spyOn(
        contentRemoveOneProvider,
        'removeImage$'
      );

      contentRemoveProvider
        .removeAllImagesForState$(
          faker.random.arrayElement(Object.values(ImageState)),
          DUMMY_MONGODB_ID
        )
        .subscribe({
          next: () => {
            done();
          },
          error: () => {
            expect(mockedRemoveImage$).not.toHaveBeenCalled();
            done();
          },
          complete: () => {
            done();
          },
        });
    });

    it('should not remove all images of entity for a given state if entity does not have any images for that state', (done: any) => {
      const documentModelImageState = ImageState.New;
      const providedImageState = ImageState.Selected;

      const documentModel: DocumentModel = {
        images: [{ state: documentModelImageState }],
      } as unknown as DocumentModel;
      jest
        .spyOn(entityRepositoryFunctions, 'findEntityById$')
        .mockReturnValue(of(documentModel));

      jest
        .spyOn(entityValidationFunctions, 'validateEntityFound')
        .mockReturnValue(documentModel);

      const mockedRemoveImage$ = jest.spyOn(
        contentRemoveOneProvider,
        'removeImage$'
      );

      contentRemoveProvider
        .removeAllImagesForState$(providedImageState, DUMMY_MONGODB_ID)
        .subscribe(() => {
          expect(mockedRemoveImage$).not.toHaveBeenCalled();
          done();
        });
    });

    it('should remove multiple images of an entity for a given state', (done: any) => {
      jest
        .spyOn(entityRepositoryFunctions, 'findEntityById$')
        .mockReturnValue(of({} as DocumentModel));

      const imageState = faker.random.arrayElement(Object.values(ImageState));
      jest
        .spyOn(entityValidationFunctions, 'validateEntityFound')
        .mockReturnValue({
          images: [
            { state: imageState } as Image,
            { state: imageState } as Image,
          ],
        } as DocumentModel);

      const mockedRemoveImage$ = jest
        .spyOn(contentRemoveOneProvider, 'removeImage$')
        .mockReturnValue(of(undefined));

      contentRemoveProvider
        .removeAllImagesForState$(imageState, DUMMY_MONGODB_ID)
        .subscribe(() => {
          expect(mockedRemoveImage$).toBeCalledTimes(2);
          done();
        });
    });
  });

  describe('removeImage$', () => {
    it('should remove an image of an entity', (done: any) => {
      jest
        .spyOn(entityRepositoryFunctions, 'findEntityById$')
        .mockReturnValue(of({} as DocumentModel));

      const imageId = faker.datatype.uuid();
      jest
        .spyOn(entityValidationFunctions, 'validateEntityFound')
        .mockReturnValue({
          images: [{ id: imageId } as Image],
        } as DocumentModel);

      const mockedRemoveImage$ = jest
        .spyOn(contentRemoveOneProvider, 'removeImage$')
        .mockReturnValue(of(undefined));

      contentRemoveProvider
        .removeImage$(imageId, DUMMY_MONGODB_ID)
        .subscribe(() => {
          expect(mockedRemoveImage$).toHaveBeenCalled();
          done();
        });
    });

    it('should not remove an image of an entity if the entity is not found', (done: any) => {
      jest
        .spyOn(entityRepositoryFunctions, 'findEntityById$')
        .mockReturnValue(of(null));

      jest
        .spyOn(entityValidationFunctions, 'validateEntityFound')
        .mockImplementation(() => {
          throw new NotFoundException();
        });

      const mockedRemoveImage$ = jest.spyOn(
        contentRemoveOneProvider,
        'removeImage$'
      );

      contentRemoveProvider
        .removeImage$(faker.datatype.uuid(), DUMMY_MONGODB_ID)
        .subscribe({
          next: () => {
            done();
          },
          error: () => {
            expect(mockedRemoveImage$).not.toHaveBeenCalled();
            done();
          },
          complete: () => {
            done();
          },
        });
    });

    it('should not remove an image of an entity if the image is not found', (done: any) => {
      const documentModelImageId = faker.datatype.uuid();
      const providedImageId = faker.datatype.uuid();

      const documentModel: DocumentModel = {
        images: [{ id: documentModelImageId }],
      } as unknown as DocumentModel;
      jest
        .spyOn(entityRepositoryFunctions, 'findEntityById$')
        .mockReturnValue(of(documentModel));

      jest
        .spyOn(entityValidationFunctions, 'validateEntityFound')
        .mockReturnValue(documentModel);

      const mockedRemoveImage$ = jest.spyOn(
        contentRemoveOneProvider,
        'removeImage$'
      );

      contentRemoveProvider
        .removeImage$(providedImageId, DUMMY_MONGODB_ID)
        .subscribe(() => {
          expect(mockedRemoveImage$).not.toHaveBeenCalled();
          done();
        });
    });
  });

  describe('removeAllVideos$', () => {
    it('should remove all videos of an entity', (done: any) => {
      jest
        .spyOn(entityRepositoryFunctions, 'findEntityById$')
        .mockReturnValue(of({} as DocumentModel));

      jest
        .spyOn(entityValidationFunctions, 'validateEntityFound')
        .mockReturnValue({ videos: [{} as Video] } as DocumentModel);

      const mockedRemoveVideo$ = jest
        .spyOn(contentRemoveOneProvider, 'removeVideo$')
        .mockReturnValue(of(undefined));

      contentRemoveProvider.removeAllVideos$(DUMMY_MONGODB_ID).subscribe(() => {
        expect(mockedRemoveVideo$).toHaveBeenCalled();
        done();
      });
    });

    it('should not remove all videos of entity if entity is not found', (done: any) => {
      jest
        .spyOn(entityRepositoryFunctions, 'findEntityById$')
        .mockReturnValue(of(null));

      jest
        .spyOn(entityValidationFunctions, 'validateEntityFound')
        .mockImplementation(() => {
          throw new NotFoundException();
        });

      const mockedRemoveVideo$ = jest.spyOn(
        contentRemoveOneProvider,
        'removeVideo$'
      );

      contentRemoveProvider.removeAllVideos$(DUMMY_MONGODB_ID).subscribe({
        next: () => {
          done();
        },
        error: () => {
          expect(mockedRemoveVideo$).not.toHaveBeenCalled();
          done();
        },
        complete: () => {
          done();
        },
      });
    });

    it('should not remove all videos of entity if it does not have any videos', (done: any) => {
      const documentModel: DocumentModel = {
        videos: [],
      } as unknown as DocumentModel;
      jest
        .spyOn(entityRepositoryFunctions, 'findEntityById$')
        .mockReturnValue(of(documentModel));

      jest
        .spyOn(entityValidationFunctions, 'validateEntityFound')
        .mockReturnValue(documentModel);

      const mockedRemoveVideo$ = jest.spyOn(
        contentRemoveOneProvider,
        'removeVideo$'
      );

      contentRemoveProvider.removeAllVideos$(DUMMY_MONGODB_ID).subscribe(() => {
        expect(mockedRemoveVideo$).not.toHaveBeenCalled();
        done();
      });
    });

    it('should remove multiple videos of an entity if they are found', (done: any) => {
      jest
        .spyOn(entityRepositoryFunctions, 'findEntityById$')
        .mockReturnValue(of({} as DocumentModel));

      jest
        .spyOn(entityValidationFunctions, 'validateEntityFound')
        .mockReturnValue({
          videos: [{} as Video, {} as Video],
        } as DocumentModel);

      const mockedRemoveVideo$ = jest
        .spyOn(contentRemoveOneProvider, 'removeVideo$')
        .mockReturnValue(of(undefined));

      contentRemoveProvider.removeAllVideos$(DUMMY_MONGODB_ID).subscribe(() => {
        expect(mockedRemoveVideo$).toBeCalledTimes(2);
        done();
      });
    });
  });
});
