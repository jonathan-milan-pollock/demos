/* eslint-disable @typescript-eslint/no-explicit-any */
import { Test } from '@nestjs/testing';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getModelToken } from '@nestjs/mongoose';

import * as faker from 'faker';
import { of } from 'rxjs';
import { drive_v3 } from 'googleapis';

import {
  CronProcessType,
  DUMMY_MONGODB_ID,
  EntityAdmin,
  EntityOrders,
  EntityType,
  EntityUpdate,
  EntityWithGroupType,
  EntityWithoutGroupType,
} from '@dark-rush-photography/shared/types';
import { Document, DocumentModel } from '../schema/document.schema';
import { CronProcessTable } from '../tables/cron-process.table';
import { ConfigProvider } from '../providers/config.provider';
import { EntityGroupProvider } from '../providers/entity-group.provider';
import { EntityGroupFindProvider } from '../providers/entity-group-find.provider';
import { EntityCreateProvider } from '../providers/entity-create.provider';
import { EntityCreateWatermarkedTypeProvider } from '../providers/entity-create-watermarked-type.provider';
import { EntityCreateAllForFolderProvider } from '../providers/entity-create-all-for-folder.provider';
import { EntityCreateOneForFolderProvider } from '../providers/entity-create-one-for-folder.provider';
import { EntityFindAllProvider } from '../providers/entity-find-all.provider';
import { EntityOrderProvider } from '../providers/entity-order.provider';
import { CronProcessRepositoryProvider } from '../providers/cron-process-repository.provider';
import { AdminEntitiesService } from './admin-entities.service';

jest.mock('@dark-rush-photography/api/util', () => ({
  ...jest.requireActual('@dark-rush-photography/api/util'),
}));
import * as apiUtil from '@dark-rush-photography/api/util';

jest.mock('../entities/entity-repository.functions', () => ({
  ...jest.requireActual('../entities/entity-repository.functions'),
}));
import * as entityRepositoryFunctions from '../entities/entity-repository.functions';

jest.mock('../entities/entity-load-admin.functions', () => ({
  ...jest.requireActual('../entities/entity-load-admin.functions'),
}));
import * as entityLoadAdminFunctions from '../entities/entity-load-admin.functions';

jest.mock('../cron-processes/cron-process-start.functions', () => ({
  ...jest.requireActual('../cron-processes/cron-process-start.functions'),
}));
import * as cronProcessStartFunctions from '../cron-processes/cron-process-start.functions';

jest.mock('../entities/entity-publish-validation.functions', () => ({
  ...jest.requireActual('../entities/entity-publish-validation.functions'),
}));
import * as entityPublishValidationFunctions from '../entities/entity-publish-validation.functions';

jest.mock('../entities/entity-validation.functions', () => ({
  ...jest.requireActual('../entities/entity-validation.functions'),
}));
import * as entityValidationFunctions from '../entities/entity-validation.functions';

describe('admin-entities.service', () => {
  let adminEntitiesService: AdminEntitiesService;
  let entityGroupProvider: EntityGroupProvider;
  let entityCreateProvider: EntityCreateProvider;
  let entityFindAllProvider: EntityFindAllProvider;
  let entityOrderProvider: EntityOrderProvider;

  const mockedCronProcessRepositoryProvider = {
    create$: jest.fn().mockReturnValue(of(undefined)),
  };

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
          useClass: MockDocumentModel,
        },
        {
          provide: CronProcessRepositoryProvider.name,
          useValue: mockedCronProcessRepositoryProvider,
        },
        AdminEntitiesService,
        EntityGroupProvider,
        EntityGroupFindProvider,
        EntityCreateProvider,
        EntityCreateWatermarkedTypeProvider,
        EntityCreateAllForFolderProvider,
        EntityCreateOneForFolderProvider,
        EntityFindAllProvider,
        EntityOrderProvider,
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
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createTest$', () => {
    it('should create a test entity', (done: any) => {
      const mockedCreateTestEntity$ = jest
        .spyOn(entityRepositoryFunctions, 'createTestEntity$')
        .mockReturnValue(of({} as DocumentModel));

      const mockedLoadEntityAdmin = jest
        .spyOn(entityLoadAdminFunctions, 'loadEntityAdmin')
        .mockReturnValue({} as EntityAdmin);

      adminEntitiesService.createTest$().subscribe((result) => {
        expect(mockedCreateTestEntity$).toBeCalledTimes(1);
        expect(mockedLoadEntityAdmin).toBeCalledTimes(1);
        expect(result).toBeDefined();
        done();
      });
    });
  });

  describe('order$', () => {
    it('should order entities', (done: any) => {
      const mockedOrder$ = jest
        .spyOn(entityOrderProvider, 'order$')
        .mockReturnValue(of(undefined));

      adminEntitiesService.order$({} as EntityOrders).subscribe(() => {
        expect(mockedOrder$).toBeCalledTimes(1);
        done();
      });
    });
  });

  describe('update$', () => {
    it('should update an entity', (done: any) => {
      const mockedFindEntityById$ = jest
        .spyOn(entityRepositoryFunctions, 'findEntityById$')
        .mockReturnValue(of({} as DocumentModel));

      const mockedValidateEntityFound = jest
        .spyOn(entityValidationFunctions, 'validateEntityFound')
        .mockReturnValue({} as DocumentModel);

      const mockedUpdateEntity$ = jest
        .spyOn(entityRepositoryFunctions, 'updateEntity$')
        .mockReturnValue(of({} as DocumentModel));

      adminEntitiesService
        .update$(DUMMY_MONGODB_ID, {} as EntityUpdate)
        .subscribe(() => {
          expect(mockedFindEntityById$).toBeCalledTimes(1);
          expect(mockedValidateEntityFound).toBeCalledTimes(1);
          expect(mockedUpdateEntity$).toBeCalledTimes(1);
          done();
        });
    });

    it('should not update entity when entity is not found', (done: any) => {
      const mockedFindEntityById$ = jest
        .spyOn(entityRepositoryFunctions, 'findEntityById$')
        .mockReturnValue(of(null));

      const mockedValidateEntityFound = jest
        .spyOn(entityValidationFunctions, 'validateEntityFound')
        .mockImplementation(() => {
          throw new NotFoundException();
        });

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
          error: (error) => {
            expect(mockedFindEntityById$).toBeCalledTimes(1);
            expect(mockedValidateEntityFound).toHaveBeenCalledTimes(1);
            expect(mockedUpdateEntity$).not.toHaveBeenCalled();
            expect(error).toBeInstanceOf(NotFoundException);
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
      const mockedFindEntityById$ = jest
        .spyOn(entityRepositoryFunctions, 'findEntityById$')
        .mockReturnValue(of({} as DocumentModel));

      const mockedValidateEntityFound = jest
        .spyOn(entityValidationFunctions, 'validateEntityFound')
        .mockReturnValue({} as DocumentModel);

      const mockedValidatePublishEntity = jest
        .spyOn(entityPublishValidationFunctions, 'validatePublishEntity')
        .mockReturnValue({} as DocumentModel);

      const mockedStartCronProcessType = jest
        .spyOn(cronProcessStartFunctions, 'startCronProcessType')
        .mockReturnValue({} as CronProcessTable);

      const mockedCreate$ = jest
        .spyOn(mockedCronProcessRepositoryProvider, 'create$')
        .mockReturnValue(of(undefined));

      adminEntitiesService
        .publish$(DUMMY_MONGODB_ID, faker.datatype.boolean())
        .subscribe(() => {
          expect(mockedFindEntityById$).toBeCalledTimes(1);
          expect(mockedValidateEntityFound).toBeCalledTimes(1);
          expect(mockedValidatePublishEntity).toBeCalledTimes(1);
          expect(mockedStartCronProcessType).toBeCalledTimes(1);
          const [cronProcessType] = mockedStartCronProcessType.mock.calls[0];
          expect(cronProcessType).toBe(CronProcessType.PublishEntity);
          expect(mockedCreate$).toBeCalledTimes(1);
          done();
        });
    });

    it('should not publish an entity for entity type Test', (done: any) => {
      const mockedFindEntityById$ = jest
        .spyOn(entityRepositoryFunctions, 'findEntityById$')
        .mockReturnValue(of({ type: EntityType.Test } as DocumentModel));

      const mockedValidateEntityFound = jest
        .spyOn(entityValidationFunctions, 'validateEntityFound')
        .mockImplementation((documentModel) => documentModel as DocumentModel);

      const mockedValidatePublishEntity = jest
        .spyOn(entityPublishValidationFunctions, 'validatePublishEntity')
        .mockImplementation((documentModel) => documentModel as DocumentModel);

      const mockedStartCronProcessType = jest.spyOn(
        cronProcessStartFunctions,
        'startCronProcessType'
      );

      const mockedCreate$ = jest.spyOn(
        mockedCronProcessRepositoryProvider,
        'create$'
      );

      adminEntitiesService
        .publish$(DUMMY_MONGODB_ID, faker.datatype.boolean())
        .subscribe(() => {
          expect(mockedFindEntityById$).toBeCalledTimes(1);
          expect(mockedValidateEntityFound).toBeCalledTimes(1);
          expect(mockedValidatePublishEntity).toBeCalledTimes(1);
          expect(mockedStartCronProcessType).not.toBeCalled();
          expect(mockedCreate$).not.toBeCalled();
          done();
        });
    });

    it('should not publish an entity if entity is not found', (done: any) => {
      const mockedFindEntityById$ = jest
        .spyOn(entityRepositoryFunctions, 'findEntityById$')
        .mockReturnValue(of(null));

      const mockedValidateEntityFound = jest
        .spyOn(entityValidationFunctions, 'validateEntityFound')
        .mockImplementation(() => {
          throw new NotFoundException();
        });

      const mockedValidatePublishEntity = jest.spyOn(
        entityPublishValidationFunctions,
        'validatePublishEntity'
      );

      const mockedStartCronProcessType = jest.spyOn(
        cronProcessStartFunctions,
        'startCronProcessType'
      );

      const mockedCreate$ = jest.spyOn(
        mockedCronProcessRepositoryProvider,
        'create$'
      );

      adminEntitiesService
        .publish$(DUMMY_MONGODB_ID, faker.datatype.boolean())
        .subscribe({
          next: () => {
            done();
          },
          error: (error) => {
            expect(mockedFindEntityById$).toBeCalledTimes(1);
            expect(mockedValidateEntityFound).toBeCalledTimes(1);
            expect(mockedValidatePublishEntity).not.toBeCalled();
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

    it('should not publish an entity if entity is not valid for publishing', (done: any) => {
      const mockedFindEntityById$ = jest
        .spyOn(entityRepositoryFunctions, 'findEntityById$')
        .mockReturnValue(of({} as DocumentModel));

      const mockedValidateEntityFound = jest
        .spyOn(entityValidationFunctions, 'validateEntityFound')
        .mockReturnValue({} as DocumentModel);

      const mockedValidatePublishEntity = jest
        .spyOn(entityPublishValidationFunctions, 'validatePublishEntity')
        .mockImplementation(() => {
          throw new ConflictException();
        });

      const mockedStartCronProcessType = jest.spyOn(
        cronProcessStartFunctions,
        'startCronProcessType'
      );

      const mockedCreate$ = jest.spyOn(
        mockedCronProcessRepositoryProvider,
        'create$'
      );

      adminEntitiesService
        .publish$(DUMMY_MONGODB_ID, faker.datatype.boolean())
        .subscribe({
          next: () => {
            done();
          },
          error: (error) => {
            expect(mockedFindEntityById$).toBeCalledTimes(1);
            expect(mockedValidateEntityFound).toBeCalledTimes(1);
            expect(mockedValidatePublishEntity).toBeCalledTimes(1);
            expect(mockedStartCronProcessType).not.toBeCalled();
            expect(mockedCreate$).not.toBeCalled();
            expect(error).toBeInstanceOf(ConflictException);
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
        .spyOn(apiUtil, 'getGoogleDrive')
        .mockReturnValue({} as drive_v3.Drive);

      const foundGroups = [faker.lorem.word()];
      const mockedFindGroups$ = jest
        .spyOn(entityGroupProvider, 'findGroups$')
        .mockReturnValue(of(foundGroups));

      adminEntitiesService
        .findGroups$(
          faker.random.arrayElement(Object.values(EntityWithGroupType))
        )
        .subscribe((result) => {
          expect(mockedFindGroups$).toBeCalledTimes(1);
          expect(result).toEqual(foundGroups);
          done();
        });
    });
  });

  describe('findAll$', () => {
    it('should find all entities', (done: any) => {
      jest
        .spyOn(apiUtil, 'getGoogleDrive')
        .mockReturnValue({} as drive_v3.Drive);

      const mockedCreate$ = jest
        .spyOn(entityCreateProvider, 'create$')
        .mockReturnValue(of(undefined));

      const mockedFindAllEntities$ = jest
        .spyOn(entityFindAllProvider, 'findAllEntities$')
        .mockReturnValue(
          of([{} as EntityAdmin, {} as EntityAdmin] as EntityAdmin[])
        );

      adminEntitiesService
        .findAll$(
          faker.random.arrayElement(Object.values(EntityWithoutGroupType))
        )
        .subscribe((result) => {
          expect(mockedCreate$).toBeCalledTimes(1);
          expect(mockedFindAllEntities$).toBeCalledTimes(1);
          expect(result).toHaveLength(2);
          done();
        });
    });

    it('should return entities in ascending order', (done: any) => {
      jest
        .spyOn(apiUtil, 'getGoogleDrive')
        .mockReturnValue({} as drive_v3.Drive);

      const mockedCreate$ = jest
        .spyOn(entityCreateProvider, 'create$')
        .mockReturnValue(of(undefined));

      const mockedFindAllEntities$ = jest
        .spyOn(entityFindAllProvider, 'findAllEntities$')
        .mockReturnValue(
          of([
            { order: 2 } as EntityAdmin,
            { order: 1 } as EntityAdmin,
          ] as EntityAdmin[])
        );

      adminEntitiesService
        .findAll$(
          faker.random.arrayElement(Object.values(EntityWithoutGroupType))
        )
        .subscribe((result) => {
          expect(mockedCreate$).toBeCalledTimes(1);
          expect(mockedFindAllEntities$).toBeCalledTimes(1);
          expect(result[0].order).toBe(1);
          expect(result[1].order).toBe(2);
          done();
        });
    });

    it('should return an empty array of entities if none are found', (done: any) => {
      jest
        .spyOn(apiUtil, 'getGoogleDrive')
        .mockReturnValue({} as drive_v3.Drive);

      const mockedCreate$ = jest
        .spyOn(entityCreateProvider, 'create$')
        .mockReturnValue(of(undefined));

      const mockedFindAllEntities$ = jest
        .spyOn(entityFindAllProvider, 'findAllEntities$')
        .mockReturnValue(of([] as EntityAdmin[]));

      adminEntitiesService
        .findAll$(
          faker.random.arrayElement(Object.values(EntityWithoutGroupType))
        )
        .subscribe((result) => {
          expect(mockedCreate$).toBeCalledTimes(1);
          expect(mockedFindAllEntities$).toBeCalledTimes(1);
          expect(result.length).toBe(0);
          done();
        });
    });
  });

  describe('findAllForGroup$', () => {
    it('should find all entities for a group', (done: any) => {
      jest
        .spyOn(apiUtil, 'getGoogleDrive')
        .mockReturnValue({} as drive_v3.Drive);

      const mockedCreateForGroup$ = jest
        .spyOn(entityCreateProvider, 'createForGroup$')
        .mockReturnValue(of(undefined));

      const mockedFindAllEntitiesForGroup$ = jest
        .spyOn(entityFindAllProvider, 'findAllEntitiesForGroup$')
        .mockReturnValue(
          of([{} as EntityAdmin, {} as EntityAdmin] as EntityAdmin[])
        );

      adminEntitiesService
        .findAllForGroup$(
          faker.random.arrayElement(Object.values(EntityWithGroupType)),
          faker.lorem.word()
        )
        .subscribe((result) => {
          expect(mockedCreateForGroup$).toBeCalledTimes(1);
          expect(mockedFindAllEntitiesForGroup$).toBeCalledTimes(1);
          expect(result).toHaveLength(2);
          done();
        });
    });

    it('should return entities for a group in ascending order', (done: any) => {
      jest
        .spyOn(apiUtil, 'getGoogleDrive')
        .mockReturnValue({} as drive_v3.Drive);

      const mockedCreateForGroup$ = jest
        .spyOn(entityCreateProvider, 'createForGroup$')
        .mockReturnValue(of(undefined));

      const mockedFindAllEntitiesForGroup$ = jest
        .spyOn(entityFindAllProvider, 'findAllEntitiesForGroup$')
        .mockReturnValue(
          of([
            { order: 2 } as EntityAdmin,
            { order: 1 } as EntityAdmin,
          ] as EntityAdmin[])
        );

      adminEntitiesService
        .findAllForGroup$(
          faker.random.arrayElement(Object.values(EntityWithGroupType)),
          faker.lorem.word()
        )
        .subscribe((result) => {
          expect(mockedCreateForGroup$).toBeCalledTimes(1);
          expect(mockedFindAllEntitiesForGroup$).toBeCalledTimes(1);
          expect(result[0].order).toBe(1);
          expect(result[1].order).toBe(2);
          done();
        });
    });

    it('should return an empty array of entities for a group if none are found', (done: any) => {
      jest
        .spyOn(apiUtil, 'getGoogleDrive')
        .mockReturnValue({} as drive_v3.Drive);

      const mockedCreateForGroup$ = jest
        .spyOn(entityCreateProvider, 'createForGroup$')
        .mockReturnValue(of(undefined));

      const mockedFindAllEntitiesForGroup$ = jest
        .spyOn(entityFindAllProvider, 'findAllEntitiesForGroup$')
        .mockReturnValue(of([] as EntityAdmin[]));

      adminEntitiesService
        .findAllForGroup$(
          faker.random.arrayElement(Object.values(EntityWithGroupType)),
          faker.lorem.word()
        )
        .subscribe((result) => {
          expect(mockedCreateForGroup$).toBeCalledTimes(1);
          expect(mockedFindAllEntitiesForGroup$).toBeCalledTimes(1);
          expect(result.length).toBe(0);
          done();
        });
    });
  });

  describe('findOne$', () => {
    it('should find one entity', (done: any) => {
      const mockedFindEntityById$ = jest
        .spyOn(entityRepositoryFunctions, 'findEntityById$')
        .mockReturnValue(of({} as DocumentModel));

      const mockedValidateEntityFound = jest
        .spyOn(entityValidationFunctions, 'validateEntityFound')
        .mockReturnValue({} as DocumentModel);

      const mockedLoadEntityAdmin = jest
        .spyOn(entityLoadAdminFunctions, 'loadEntityAdmin')
        .mockReturnValue({} as EntityAdmin);

      adminEntitiesService.findOne$(DUMMY_MONGODB_ID).subscribe((result) => {
        expect(mockedFindEntityById$).toBeCalledTimes(1);
        expect(mockedValidateEntityFound).toBeCalledTimes(1);
        expect(mockedLoadEntityAdmin).toBeCalledTimes(1);
        expect(result).toBeDefined();
        done();
      });
    });

    it('should not find one entity if entity is not found', (done: any) => {
      const mockedFindEntityById$ = jest
        .spyOn(entityRepositoryFunctions, 'findEntityById$')
        .mockReturnValue(of(null));

      const mockedValidateEntityFound = jest
        .spyOn(entityValidationFunctions, 'validateEntityFound')
        .mockImplementation(() => {
          throw new NotFoundException();
        });

      const mockedLoadEntityAdmin = jest.spyOn(
        entityLoadAdminFunctions,
        'loadEntityAdmin'
      );

      adminEntitiesService.findOne$(DUMMY_MONGODB_ID).subscribe({
        next: () => {
          done();
        },
        error: (error) => {
          expect(mockedFindEntityById$).toHaveBeenCalledTimes(1);
          expect(mockedValidateEntityFound).toHaveBeenCalledTimes(1);
          expect(mockedLoadEntityAdmin).not.toHaveBeenCalled();
          expect(error).toBeInstanceOf(NotFoundException);
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
      const mockedFindEntityByIdAndSoftDelete$ = jest
        .spyOn(entityRepositoryFunctions, 'findEntityByIdAndSoftDelete$')
        .mockReturnValue(of({} as DocumentModel));

      const mockedStartCronProcessType = jest
        .spyOn(cronProcessStartFunctions, 'startCronProcessType')
        .mockReturnValue({} as CronProcessTable);

      const mockedCreate$ = jest
        .spyOn(mockedCronProcessRepositoryProvider, 'create$')
        .mockReturnValue(of(undefined));

      adminEntitiesService.delete$(DUMMY_MONGODB_ID).subscribe(() => {
        expect(mockedFindEntityByIdAndSoftDelete$).toBeCalledTimes(1);
        expect(mockedStartCronProcessType).toBeCalledTimes(1);
        const [cronProcessType] = mockedStartCronProcessType.mock.calls[0];
        expect(cronProcessType).toBe(CronProcessType.DeleteEntity);
        expect(mockedCreate$).toBeCalledTimes(1);
        done();
      });
    });

    it('should delete an entity for Test entity', (done: any) => {
      const mockedFindEntityByIdAndSoftDelete$ = jest
        .spyOn(entityRepositoryFunctions, 'findEntityByIdAndSoftDelete$')
        .mockReturnValue(of({ type: EntityType.Test } as DocumentModel));

      const mockedFindEntityByIdAndDelete$ = jest
        .spyOn(entityRepositoryFunctions, 'findEntityByIdAndDelete$')
        .mockReturnValue(of({} as DocumentModel));

      const mockedStartCronProcessType = jest.spyOn(
        cronProcessStartFunctions,
        'startCronProcessType'
      );

      const mockedCreate$ = jest.spyOn(
        mockedCronProcessRepositoryProvider,
        'create$'
      );

      adminEntitiesService.delete$(DUMMY_MONGODB_ID).subscribe(() => {
        expect(mockedFindEntityByIdAndSoftDelete$).toBeCalledTimes(1);
        expect(mockedFindEntityByIdAndDelete$).toBeCalledTimes(1);
        expect(mockedStartCronProcessType).not.toBeCalled();
        expect(mockedCreate$).not.toBeCalled();
        done();
      });
    });

    it('should not delete an entity if entity is not found', (done: any) => {
      const mockedFindEntityByIdAndSoftDelete$ = jest
        .spyOn(entityRepositoryFunctions, 'findEntityByIdAndSoftDelete$')
        .mockReturnValue(of(null));

      const mockedStartCronProcessType = jest.spyOn(
        cronProcessStartFunctions,
        'startCronProcessType'
      );

      const mockedCreate$ = jest.spyOn(
        mockedCronProcessRepositoryProvider,
        'create$'
      );

      adminEntitiesService.delete$(DUMMY_MONGODB_ID).subscribe(() => {
        expect(mockedFindEntityByIdAndSoftDelete$).toBeCalledTimes(1);
        expect(mockedStartCronProcessType).not.toBeCalled();
        expect(mockedCreate$).not.toBeCalled();
        done();
      });
    });
  });
});
