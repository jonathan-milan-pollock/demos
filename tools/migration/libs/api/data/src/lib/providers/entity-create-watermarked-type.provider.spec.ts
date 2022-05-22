/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Test } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { getModelToken } from '@nestjs/mongoose';

import * as faker from 'faker';
import { of } from 'rxjs';
import { drive_v3 } from 'googleapis';

import {
  EntityType,
  EntityWithGroupType,
  EntityWithoutGroupType,
  GoogleDriveFolder,
  WatermarkedType,
} from '@dark-rush-photography/shared/types';
import { Document } from '../schema/document.schema';
import { ConfigProvider } from './config.provider';
import { EntityCreateAllForFolderProvider } from './entity-create-all-for-folder.provider';
import { EntityCreateOneForFolderProvider } from './entity-create-one-for-folder.provider';
import { EntityCreateWatermarkedTypeProvider } from './entity-create-watermarked-type.provider';

jest.mock('@dark-rush-photography/shared/util', () => ({
  ...jest.requireActual('@dark-rush-photography/shared/util'),
}));
import * as sharedUtil from '@dark-rush-photography/shared/util';

jest.mock('@dark-rush-photography/api/util', () => ({
  ...jest.requireActual('@dark-rush-photography/api/util'),
}));
import * as apiUtil from '@dark-rush-photography/api/util';

describe('entity-create-watermarked-type.provider', () => {
  let entityCreateWatermarkedTypeProvider: EntityCreateWatermarkedTypeProvider;
  let entityCreateAllForFolderProvider: EntityCreateAllForFolderProvider;

  beforeEach(async () => {
    const mockedConfigProvider = {
      getGoogleDriveWebsitesFolderId: jest
        .fn()
        .mockReturnValue(faker.datatype.uuid()),
    };
    class MockDocumentModel {}

    const moduleRef = await Test.createTestingModule({
      providers: [
        ConfigService,
        {
          provide: ConfigProvider,
          useValue: mockedConfigProvider,
        },
        {
          provide: getModelToken(Document.name),
          useClass: MockDocumentModel,
        },
        EntityCreateWatermarkedTypeProvider,
        EntityCreateAllForFolderProvider,
        EntityCreateOneForFolderProvider,
      ],
    }).compile();

    entityCreateWatermarkedTypeProvider =
      moduleRef.get<EntityCreateWatermarkedTypeProvider>(
        EntityCreateWatermarkedTypeProvider
      );

    entityCreateAllForFolderProvider =
      moduleRef.get<EntityCreateAllForFolderProvider>(
        EntityCreateAllForFolderProvider
      );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createWatermarkedType$', () => {
    it('should create watermarked type entity', (done: any) => {
      const mockedFindGoogleDriveFolderByName$ = jest
        .spyOn(apiUtil, 'findGoogleDriveFolderByName$')
        .mockReturnValue(
          of({ id: faker.datatype.uuid() } as GoogleDriveFolder)
        );

      const mockedGetEntityTypeFromEntityWithoutGroupType = jest
        .spyOn(sharedUtil, 'getEntityTypeFromEntityWithoutGroupType')
        .mockReturnValue(faker.random.arrayElement(Object.values(EntityType)));

      const mockedCreateAllEntitiesForFolder$ = jest
        .spyOn(entityCreateAllForFolderProvider, 'createAllEntitiesForFolder$')
        .mockReturnValue(of(undefined));

      entityCreateWatermarkedTypeProvider
        .createWatermarkedType$(
          {} as drive_v3.Drive,
          faker.lorem.word(),
          faker.random.arrayElement(Object.values(EntityWithoutGroupType)),
          faker.random.arrayElement(Object.values(WatermarkedType))
        )
        .subscribe(() => {
          expect(mockedFindGoogleDriveFolderByName$).toHaveBeenCalledTimes(1);
          expect(
            mockedGetEntityTypeFromEntityWithoutGroupType
          ).toHaveBeenCalledTimes(1);
          expect(mockedCreateAllEntitiesForFolder$).toHaveBeenCalledTimes(1);
          done();
        });
    });

    it('should create watermarked type entity with initial slug', (done: any) => {
      const mockedFindGoogleDriveFolderByName$ = jest
        .spyOn(apiUtil, 'findGoogleDriveFolderByName$')
        .mockReturnValue(
          of({ id: faker.datatype.uuid() } as GoogleDriveFolder)
        );

      const mockedGetEntityTypeFromEntityWithoutGroupType = jest
        .spyOn(sharedUtil, 'getEntityTypeFromEntityWithoutGroupType')
        .mockReturnValue(faker.random.arrayElement(Object.values(EntityType)));

      const mockedCreateAllEntitiesForFolder$ = jest
        .spyOn(entityCreateAllForFolderProvider, 'createAllEntitiesForFolder$')
        .mockReturnValue(of(undefined));

      const initialSlug = faker.lorem.word();
      entityCreateWatermarkedTypeProvider
        .createWatermarkedType$(
          {} as drive_v3.Drive,
          faker.lorem.word(),
          faker.random.arrayElement(Object.values(EntityWithoutGroupType)),
          faker.random.arrayElement(Object.values(WatermarkedType)),
          initialSlug
        )
        .subscribe(() => {
          expect(mockedFindGoogleDriveFolderByName$).toHaveBeenCalledTimes(1);
          expect(
            mockedGetEntityTypeFromEntityWithoutGroupType
          ).toHaveBeenCalledTimes(1);
          expect(mockedCreateAllEntitiesForFolder$).toHaveBeenCalledTimes(1);
          const [
            _googleDrive,
            _folderId,
            _entityType,
            _watermarkedType,
            _defaultEntityGroup,
            slug,
          ] = mockedCreateAllEntitiesForFolder$.mock.calls[0];
          expect(slug).toBe(initialSlug);
          done();
        });
    });

    it('should not create watermarked type entity when folder is not found', (done: any) => {
      const mockedFindGoogleDriveFolderByName$ = jest
        .spyOn(apiUtil, 'findGoogleDriveFolderByName$')
        .mockReturnValue(of(undefined));

      const mockedGetEntityTypeFromEntityWithoutGroupType = jest.spyOn(
        sharedUtil,
        'getEntityTypeFromEntityWithoutGroupType'
      );

      const mockedCreateAllEntitiesForFolder$ = jest.spyOn(
        entityCreateAllForFolderProvider,
        'createAllEntitiesForFolder$'
      );

      entityCreateWatermarkedTypeProvider
        .createWatermarkedType$(
          {} as drive_v3.Drive,
          faker.lorem.word(),
          faker.random.arrayElement(Object.values(EntityWithoutGroupType)),
          faker.random.arrayElement(Object.values(WatermarkedType))
        )
        .subscribe(() => {
          expect(mockedFindGoogleDriveFolderByName$).toHaveBeenCalledTimes(1);
          expect(
            mockedGetEntityTypeFromEntityWithoutGroupType
          ).not.toHaveBeenCalled();
          expect(mockedCreateAllEntitiesForFolder$).not.toHaveBeenCalled();
          done();
        });
    });
  });

  describe('createWatermarkedTypeForGroup$', () => {
    it('should create watermarked type entity for a group', (done: any) => {
      const mockedFindGoogleDriveFolderByName$ = jest
        .spyOn(apiUtil, 'findGoogleDriveFolderByName$')
        .mockReturnValue(
          of({ id: faker.datatype.uuid() } as GoogleDriveFolder)
        );

      const mockedGetEntityTypeFromEntityWithGroupType = jest
        .spyOn(sharedUtil, 'getEntityTypeFromEntityWithGroupType')
        .mockReturnValue(faker.random.arrayElement(Object.values(EntityType)));

      const mockedCreateAllEntitiesForFolder$ = jest
        .spyOn(entityCreateAllForFolderProvider, 'createAllEntitiesForFolder$')
        .mockReturnValue(of(undefined));

      entityCreateWatermarkedTypeProvider
        .createWatermarkedTypeForGroup$(
          {} as drive_v3.Drive,
          faker.lorem.word(),
          faker.random.arrayElement(Object.values(EntityWithGroupType)),
          faker.random.arrayElement(Object.values(WatermarkedType)),
          faker.lorem.word()
        )
        .subscribe(() => {
          expect(mockedFindGoogleDriveFolderByName$).toHaveBeenCalledTimes(2);
          expect(
            mockedGetEntityTypeFromEntityWithGroupType
          ).toHaveBeenCalledTimes(1);
          expect(mockedCreateAllEntitiesForFolder$).toHaveBeenCalledTimes(1);
          done();
        });
    });

    it('should not create watermarked type entity for a group when folder is not found', (done: any) => {
      const mockedFindGoogleDriveFolderByName$ = jest
        .spyOn(apiUtil, 'findGoogleDriveFolderByName$')
        .mockReturnValue(of(undefined));

      const mockedGetEntityTypeFromEntityWithGroupType = jest.spyOn(
        sharedUtil,
        'getEntityTypeFromEntityWithGroupType'
      );

      const mockedCreateAllEntitiesForFolder$ = jest.spyOn(
        entityCreateAllForFolderProvider,
        'createAllEntitiesForFolder$'
      );

      entityCreateWatermarkedTypeProvider
        .createWatermarkedTypeForGroup$(
          {} as drive_v3.Drive,
          faker.lorem.word(),
          faker.random.arrayElement(Object.values(EntityWithGroupType)),
          faker.random.arrayElement(Object.values(WatermarkedType)),
          faker.lorem.word()
        )
        .subscribe(() => {
          expect(mockedFindGoogleDriveFolderByName$).toHaveBeenCalledTimes(1);
          expect(
            mockedGetEntityTypeFromEntityWithGroupType
          ).not.toHaveBeenCalled();
          expect(mockedCreateAllEntitiesForFolder$).not.toHaveBeenCalled();
          done();
        });
    });

    it('should not create watermarked type for a group when group folder is not found', (done: any) => {
      const mockFindGoogleDriveFolderByName$ = jest
        .spyOn(apiUtil, 'findGoogleDriveFolderByName$')
        .mockReturnValueOnce(
          of({ id: faker.datatype.uuid() } as GoogleDriveFolder)
        )
        .mockReturnValueOnce(of(undefined));

      const mockedGetEntityTypeFromEntityWithGroupType = jest.spyOn(
        sharedUtil,
        'getEntityTypeFromEntityWithGroupType'
      );

      const mockedCreateAllEntitiesForFolder$ = jest.spyOn(
        entityCreateAllForFolderProvider,
        'createAllEntitiesForFolder$'
      );

      entityCreateWatermarkedTypeProvider
        .createWatermarkedTypeForGroup$(
          {} as drive_v3.Drive,
          faker.lorem.word(),
          faker.random.arrayElement(Object.values(EntityWithGroupType)),
          faker.random.arrayElement(Object.values(WatermarkedType)),
          faker.lorem.word()
        )
        .subscribe(() => {
          expect(mockFindGoogleDriveFolderByName$).toHaveBeenCalledTimes(2);
          expect(
            mockedGetEntityTypeFromEntityWithGroupType
          ).not.toHaveBeenCalled();
          expect(mockedCreateAllEntitiesForFolder$).not.toHaveBeenCalled();
          done();
        });
    });
  });
});
