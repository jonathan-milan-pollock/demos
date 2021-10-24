/* eslint-disable @typescript-eslint/no-explicit-any */
import { Test } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { getModelToken } from '@nestjs/mongoose';

import * as faker from 'faker';
import { of } from 'rxjs';
import { drive_v3 } from 'googleapis';

import {
  DUMMY_MONGODB_ID,
  EntityAdmin,
  EntityUpdate,
  EntityWithGroupType,
  EntityWithoutGroupType,
} from '@dark-rush-photography/shared/types';
import { Document, DocumentModel } from '../schema/document.schema';
import { ConfigProvider } from '../providers/config.provider';
import { EntityGroupProvider } from '../providers/entity-group.provider';
import { EntityGroupFindProvider } from '../providers/entity-group-find.provider';
import { EntityCreateProvider } from '../providers/entity-create.provider';
import { EntityCreateWatermarkedTypeProvider } from '../providers/entity-create-watermarked-type.provider';
import { EntityCreateAllForFolderProvider } from '../providers/entity-create-all-for-folder.provider';
import { EntityCreateOneForFolderProvider } from '../providers/entity-create-one-for-folder.provider';
import { EntityFindAllProvider } from '../providers/entity-find-all.provider';
import { ImageFindFolderProvider } from '../providers/image-find-folder.provider';
import { ImageAddProvider } from '../providers/image-add.provider';
import { ImageAddBlobProvider } from '../providers/image-add-blob.provider';
import { ImageProcessOneProvider } from '../providers/image-process-one.provider';
import { ImageExifProvider } from '../providers/image-exif.provider';
import { ImageTinifyProvider } from '../providers/image-tinify.provider';
import { ImageResizeProvider } from '../providers/image-resize.provider';
import { ImageRemoveOneProvider } from '../providers/image-remove-one.provider';
import { ImageDeleteBlobsProvider } from '../providers/image-delete-blobs.provider';
import { EntityPublishProvider } from '../providers/entity-publish.provider';
import { ImagePublishProvider } from '../providers/image-publish.provider';
import { SocialMediaPostProvider } from '../providers/social-media-post.provider';
import { ImageVideoEmailProvider } from '../providers/image-video-email.provider';
import { ImageProcessAllProvider } from '../providers/image-process-all.provider';
import { EntityOrderProvider } from '../providers/entity-order.provider';
import { CronProcessStartProvider } from '../providers/cron-process-start.provider';

import { AdminEntitiesService } from './admin-entities.service';

jest.mock('@dark-rush-photography/api/util', () => ({
  ...jest.requireActual('@dark-rush-photography/api/util'),
}));
import * as apiUtils from '@dark-rush-photography/api/util';

jest.mock('../entities/entity-repository.functions', () => ({
  ...jest.requireActual('../entities/entity-repository.functions'),
}));
import * as entityRepositoryFunctions from '../entities/entity-repository.functions';

jest.mock('../entities/entity-load-admin.functions', () => ({
  ...jest.requireActual('../entities/entity-load-admin.functions'),
}));
import * as entityLoadAdminFunctions from '../entities/entity-load-admin.functions';

describe('admin-entities.service', () => {
  let adminEntitiesService: AdminEntitiesService;
  let entityGroupProvider: EntityGroupProvider;
  let entityCreateProvider: EntityCreateProvider;
  let entityFindAllProvider: EntityFindAllProvider;
  let entityOrderProvider: EntityOrderProvider;
  let cronProcessStartProvider: CronProcessStartProvider;

  beforeEach(async () => {
    class MockConfigProvider {
      get googleDriveClientEmail(): string {
        return faker.internet.email();
      }
      get googleDrivePrivateKey(): string {
        return faker.lorem.word();
      }
    }
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
        AdminEntitiesService,
        EntityGroupProvider,
        EntityGroupFindProvider,
        EntityCreateProvider,
        EntityCreateWatermarkedTypeProvider,
        EntityCreateAllForFolderProvider,
        EntityCreateOneForFolderProvider,
        EntityFindAllProvider,
        EntityPublishProvider,
        ImageFindFolderProvider,
        ImageAddProvider,
        ImageAddBlobProvider,
        ImageProcessAllProvider,
        ImageProcessOneProvider,
        ImageTinifyProvider,
        ImageExifProvider,
        ImageResizeProvider,
        ImageRemoveOneProvider,
        ImageDeleteBlobsProvider,
        ImagePublishProvider,
        ImageVideoEmailProvider,
        SocialMediaPostProvider,
      ],
    }).compile();

    adminEntitiesService =
      moduleRef.get<AdminEntitiesService>(AdminEntitiesService);
    entityGroupProvider =
      moduleRef.get<EntityGroupProvider>(EntityGroupProvider);
    entityCreateProvider =
      moduleRef.get<EntityCreateProvider>(EntityCreateProvider);
    entityFindAllProvider = moduleRef.get<EntityFindAllProvider>(
      EntityFindAllProvider
    );
    entityOrderProvider =
      moduleRef.get<EntityOrderProvider>(EntityOrderProvider);
    entityDeleteProvider =
      moduleRef.get<EntityDeleteProvider>(EntityDeleteProvider);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('update$', () => {
    it('should update an entity', (done: any) => {
      jest
        .spyOn(entityRepositoryFunctions, 'findEntityById$')
        .mockReturnValue(of({} as DocumentModel));

      const mockedUpdateEntity$ = jest
        .spyOn(entityRepositoryFunctions, 'updateEntity$')
        .mockReturnValue(of({} as DocumentModel));

      adminEntitiesService
        .update$(DUMMY_MONGODB_ID, {} as EntityUpdate)
        .subscribe(() => {
          expect(mockedUpdateEntity$).toBeCalled();
          done();
        });
    });

    it('should not update an entity if entity is not found', (done: any) => {
      jest
        .spyOn(entityRepositoryFunctions, 'findEntityById$')
        .mockReturnValue(of(null));

      const mockedUpdateEntity$ = jest.spyOn(
        entityRepositoryFunctions,
        'updateEntity$'
      );

      adminEntitiesService
        .update$(DUMMY_MONGODB_ID, {} as EntityUpdate)
        .subscribe({
          next: () => {
            done();
          },
          error: () => {
            expect(mockedUpdateEntity$).not.toHaveBeenCalled();
            done();
          },
          complete: () => {
            done();
          },
        });
    });
  });

  describe('loadNewImages$', () => {
    it('should load new images', (done: any) => {
      jest
        .spyOn(entityRepositoryFunctions, 'findEntityById$')
        .mockReturnValue(of({} as DocumentModel));

      const mockedLoadNewImages$ = jest
        .spyOn(entityLoadNewImagesProvider, 'loadNewImages$')
        .mockReturnValue(of(undefined));

      adminEntitiesService.loadNewImages$(DUMMY_MONGODB_ID).subscribe(() => {
        expect(mockedLoadNewImages$).toBeCalled();
        done();
      });
    });

    it('should not load new images if entity is not found', (done: any) => {
      jest
        .spyOn(entityRepositoryFunctions, 'findEntityById$')
        .mockReturnValue(of(null));

      const mockedLoadNewImages$ = jest.spyOn(
        entityLoadNewImagesProvider,
        'loadNewImages$'
      );

      adminEntitiesService.loadNewImages$(DUMMY_MONGODB_ID).subscribe({
        next: () => {
          done();
        },
        error: () => {
          expect(mockedLoadNewImages$).not.toHaveBeenCalled();
          done();
        },
        complete: () => {
          done();
        },
      });
    });
  });

  describe('publish$', () => {
    it('should publish an entity', (done: any) => {
      jest
        .spyOn(entityRepositoryFunctions, 'findEntityById$')
        .mockReturnValue(of({} as DocumentModel));

      const mockedPublishEntity$ = jest
        .spyOn(entityPublishProvider, 'publishEntity$')
        .mockReturnValue(of(undefined));

      adminEntitiesService
        .publish$(DUMMY_MONGODB_ID, faker.datatype.boolean())
        .subscribe(() => {
          expect(mockedPublishEntity$).toBeCalled();
          done();
        });
    });

    it('should not publish an entity if entity is not found', (done: any) => {
      jest
        .spyOn(entityRepositoryFunctions, 'findEntityById$')
        .mockReturnValue(of(null));

      const mockedPublishEntity$ = jest.spyOn(
        entityPublishProvider,
        'publishEntity$'
      );

      adminEntitiesService
        .publish$(DUMMY_MONGODB_ID, faker.datatype.boolean())
        .subscribe({
          next: () => {
            done();
          },
          error: () => {
            expect(mockedPublishEntity$).not.toHaveBeenCalled();
            done();
          },
          complete: () => {
            done();
          },
        });
    });
  });

  describe('setIsProcessing$', () => {
    it('should set is processing', (done: any) => {
      jest
        .spyOn(entityRepositoryFunctions, 'findEntityById$')
        .mockReturnValue(of({} as DocumentModel));

      const mockedFindByIdAndUpdateIsProcessing$ = jest
        .spyOn(entityRepositoryFunctions, 'findByIdAndUpdateIsProcessing$')
        .mockReturnValue(of({} as DocumentModel));

      adminEntitiesService
        .setIsProcessing$(DUMMY_MONGODB_ID, faker.datatype.boolean())
        .subscribe(() => {
          expect(mockedFindByIdAndUpdateIsProcessing$).toBeCalled();
          done();
        });
    });

    it('should not set is processing if entity is not found', (done: any) => {
      jest
        .spyOn(entityRepositoryFunctions, 'findEntityById$')
        .mockReturnValue(of(null));

      const mockedFindByIdAndUpdateIsProcessing$ = jest.spyOn(
        entityRepositoryFunctions,
        'findByIdAndUpdateIsProcessing$'
      );

      adminEntitiesService
        .setIsProcessing$(DUMMY_MONGODB_ID, faker.datatype.boolean())
        .subscribe({
          next: () => {
            done();
          },
          error: () => {
            expect(mockedFindByIdAndUpdateIsProcessing$).not.toHaveBeenCalled();
            done();
          },
          complete: () => {
            done();
          },
        });
    });
  });

  describe('findGroups$', () => {
    it('should find groups', (done: any) => {
      jest
        .spyOn(apiUtils, 'getGoogleDrive')
        .mockReturnValue({} as drive_v3.Drive);

      const mockedFindGroups$ = jest
        .spyOn(entityGroupProvider, 'findGroups$')
        .mockReturnValue(of([faker.lorem.word()]));

      adminEntitiesService
        .findGroups$(
          faker.random.arrayElement(Object.values(EntityWithGroupType))
        )
        .subscribe(() => {
          expect(mockedFindGroups$).toBeCalled();
          done();
        });
    });
  });

  describe('findAll$', () => {
    it('should find all entities', (done: any) => {
      jest
        .spyOn(apiUtils, 'getGoogleDrive')
        .mockReturnValue({} as drive_v3.Drive);

      const mockedCreate$ = jest
        .spyOn(entityCreateProvider, 'create$')
        .mockReturnValue(of(undefined));

      const mockedFindAllEntities$ = jest
        .spyOn(entityFindAllProvider, 'findAllEntities$')
        .mockReturnValue(of([] as EntityMinimalAdmin[]));

      adminEntitiesService
        .findAll$(
          faker.random.arrayElement(Object.values(EntityWithoutGroupType))
        )
        .subscribe(() => {
          expect(mockedCreate$).toBeCalled();
          expect(mockedFindAllEntities$).toBeCalled();
          done();
        });
    });
  });

  describe('findAllForGroup$', () => {
    it('should find all entities for a group', (done: any) => {
      jest
        .spyOn(apiUtils, 'getGoogleDrive')
        .mockReturnValue({} as drive_v3.Drive);

      const mockedCreateForGroup$ = jest
        .spyOn(entityCreateProvider, 'createForGroup$')
        .mockReturnValue(of(undefined));

      const mockedFindAllEntitiesForGroup$ = jest
        .spyOn(entityFindAllProvider, 'findAllEntitiesForGroup$')
        .mockReturnValue(of([] as EntityMinimalAdmin[]));

      adminEntitiesService
        .findAllForGroup$(
          faker.random.arrayElement(Object.values(EntityWithGroupType)),
          faker.lorem.word()
        )
        .subscribe(() => {
          expect(mockedCreateForGroup$).toBeCalled();
          expect(mockedFindAllEntitiesForGroup$).toBeCalled();
          done();
        });
    });
  });

  describe('findOne$', () => {
    it('should find one entity', (done: any) => {
      jest
        .spyOn(entityRepositoryFunctions, 'findEntityById$')
        .mockReturnValue(of({} as DocumentModel));

      const mockedLoadEntityAdmin$ = jest
        .spyOn(entityLoadAdminFunctions, 'loadEntityAdmin')
        .mockReturnValue({} as EntityAdmin);

      adminEntitiesService.findOne$(DUMMY_MONGODB_ID).subscribe(() => {
        expect(mockedLoadEntityAdmin$).toBeCalled();
        done();
      });
    });

    it('should not find one entity if entity is not found', (done: any) => {
      jest
        .spyOn(entityRepositoryFunctions, 'findEntityById$')
        .mockReturnValue(of(null));

      const mockedLoadEntityAdmin$ = jest.spyOn(
        entityLoadAdminFunctions,
        'loadEntityAdmin'
      );

      adminEntitiesService.findOne$(DUMMY_MONGODB_ID).subscribe({
        next: () => {
          done();
        },
        error: () => {
          expect(mockedLoadEntityAdmin$).not.toHaveBeenCalled();
          done();
        },
        complete: () => {
          done();
        },
      });
    });
  });

  describe('delete$', () => {
    it('should delete an entity', (done: any) => {
      jest
        .spyOn(entityRepositoryFunctions, 'findEntityById$')
        .mockReturnValue(of({} as DocumentModel));

      const mockedDeleteEntity$ = jest
        .spyOn(entityDeleteProvider, 'deleteEntity$')
        .mockReturnValue(of(undefined));

      adminEntitiesService.delete$(DUMMY_MONGODB_ID).subscribe(() => {
        expect(mockedDeleteEntity$).toBeCalled();
        done();
      });
    });

    it('should not delete an entity if entity is not found', (done: any) => {
      jest
        .spyOn(entityRepositoryFunctions, 'findEntityById$')
        .mockReturnValue(of(null));

      const mockedDeleteEntity$ = jest.spyOn(
        entityDeleteProvider,
        'deleteEntity$'
      );

      adminEntitiesService.delete$(DUMMY_MONGODB_ID).subscribe(() => {
        expect(mockedDeleteEntity$).not.toBeCalled();
        done();
      });
    });
  });
});
