/* eslint-disable @typescript-eslint/no-explicit-any */
import { Test } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { getModelToken } from '@nestjs/mongoose';

import * as faker from 'faker';
import { of } from 'rxjs';
import { drive_v3 } from 'googleapis';

import {
  EntityWithGroupType,
  GoogleDriveFolder,
  WatermarkedType,
} from '@dark-rush-photography/shared/types';
import { Document } from '../schema/document.schema';
import { ConfigProvider } from './config.provider';
import { EntityCreateProvider } from './entity-create.provider';

jest.mock('@dark-rush-photography/api/util', () => ({
  ...jest.requireActual('@dark-rush-photography/api/util'),
}));
import * as apiUtil from '@dark-rush-photography/api/util';

jest.mock('../entities/entity-create.functions', () => ({
  ...jest.requireActual('../entities/entity-create.functions'),
}));
import * as entityCreateFunctions from '../entities/entity-create.functions';

describe('entity-create.provider', () => {
  let entityCreateProvider: EntityCreateProvider;

  beforeEach(async () => {
    class MockConfigProvider {
      getGoogleDriveWebsitesFolderId(): string {
        return '';
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
        EntityCreateProvider,
      ],
    }).compile();

    entityCreateProvider =
      moduleRef.get<EntityCreateProvider>(EntityCreateProvider);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createForGroup$', () => {
    it('should create entities for group', (done: any) => {
      jest
        .spyOn(apiUtil, 'findGoogleDriveFolderByName$')
        .mockImplementationOnce(() =>
          of({ id: faker.datatype.uuid() } as GoogleDriveFolder)
        )
        .mockImplementationOnce(() =>
          of({ id: faker.datatype.uuid() } as GoogleDriveFolder)
        );

      const mockCreateWithEntityParentFolderId$ = jest
        .spyOn(entityCreateFunctions, 'createEntity$')
        .mockImplementationOnce(() => of(undefined));

      entityCreateProvider
        .createForGroup$(
          {} as drive_v3.Drive,
          faker.lorem.word(),
          faker.random.arrayElement(Object.values(EntityWithGroupType)),
          faker.random.arrayElement(Object.values(WatermarkedType)),
          faker.lorem.word()
        )
        .subscribe(() => {
          expect(mockCreateWithEntityParentFolderId$).toHaveBeenCalled();
          done();
        });
    });

    it('should not create entities when folder is not found by name', (done: any) => {
      const mockFindGoogleDriveFolderByName$ = jest
        .spyOn(apiUtil, 'findGoogleDriveFolderByName$')
        .mockImplementation(() => of(undefined));

      const mockCreateWithEntityParentFolderId$ = jest.spyOn(
        entityCreateFunctions,
        'createEntity$'
      );

      entityCreateProvider
        .createForGroup$(
          {} as drive_v3.Drive,
          faker.lorem.word(),
          faker.random.arrayElement(Object.values(EntityWithGroupType)),
          faker.random.arrayElement(Object.values(WatermarkedType)),
          faker.lorem.word()
        )
        .subscribe(() => {
          expect(mockFindGoogleDriveFolderByName$).toHaveBeenCalledTimes(1);
          expect(mockCreateWithEntityParentFolderId$).not.toHaveBeenCalled();
          done();
        });
    });

    it('should not create entities when group folder is not found by name', (done: any) => {
      const mockFindGoogleDriveFolderByName$ = jest
        .spyOn(apiUtil, 'findGoogleDriveFolderByName$')
        .mockImplementationOnce(() =>
          of({ id: faker.datatype.uuid() } as GoogleDriveFolder)
        )
        .mockImplementationOnce(() => of(undefined));

      const mockCreateWithEntityParentFolderId$ = jest.spyOn(
        entityCreateFunctions,
        'createEntity$'
      );

      entityCreateProvider
        .createForGroup$(
          {} as drive_v3.Drive,
          faker.lorem.word(),
          faker.random.arrayElement(Object.values(EntityWithGroupType)),
          faker.random.arrayElement(Object.values(WatermarkedType)),
          faker.lorem.word()
        )
        .subscribe(() => {
          expect(mockFindGoogleDriveFolderByName$).toHaveBeenCalledTimes(2);
          expect(mockCreateWithEntityParentFolderId$).not.toHaveBeenCalled();
          done();
        });
    });
  });
});
