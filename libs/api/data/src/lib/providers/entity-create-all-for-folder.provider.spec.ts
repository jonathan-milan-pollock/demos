/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

import * as faker from 'faker';
import { of } from 'rxjs';
import { drive_v3 } from 'googleapis';

import {
  EntityType,
  GoogleDriveFolder,
  WatermarkedType,
} from '@dark-rush-photography/shared/types';
import { Document } from '../schema/document.schema';
import { EntityCreateAllForFolderProvider } from './entity-create-all-for-folder.provider';
import { EntityCreateOneForFolderProvider } from './entity-create-one-for-folder.provider';

jest.mock('@dark-rush-photography/api/util', () => ({
  ...jest.requireActual('@dark-rush-photography/api/util'),
}));
import * as apiUtil from '@dark-rush-photography/api/util';

describe('entity-create-all-for-folder.provider', () => {
  let entityCreateAllForFolderProvider: EntityCreateAllForFolderProvider;
  let entityCreateOneForFolderProvider: EntityCreateOneForFolderProvider;

  beforeEach(async () => {
    class MockDocumentModel {}

    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: getModelToken(Document.name),
          useClass: MockDocumentModel,
        },
        EntityCreateAllForFolderProvider,
        EntityCreateOneForFolderProvider,
      ],
    }).compile();

    entityCreateAllForFolderProvider =
      moduleRef.get<EntityCreateAllForFolderProvider>(
        EntityCreateAllForFolderProvider
      );
    entityCreateOneForFolderProvider =
      moduleRef.get<EntityCreateOneForFolderProvider>(
        EntityCreateOneForFolderProvider
      );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createAllEntitiesForFolder$', () => {
    it('should create all entities for a folder', (done: any) => {
      const mockedFindGoogleDriveFolders$ = jest
        .spyOn(apiUtil, 'findGoogleDriveFolders$')
        .mockReturnValue(of([{} as GoogleDriveFolder]));

      const mockedCreateOneEntityForFolder$ = jest
        .spyOn(entityCreateOneForFolderProvider, 'createOneEntityForFolder$')
        .mockReturnValue(of(undefined));

      entityCreateAllForFolderProvider
        .createAllEntitiesForFolder$(
          {} as drive_v3.Drive,
          faker.datatype.uuid(),
          faker.random.arrayElement(Object.values(EntityType)),
          faker.random.arrayElement(Object.values(WatermarkedType)),
          faker.lorem.word()
        )
        .subscribe(() => {
          expect(mockedFindGoogleDriveFolders$).toHaveBeenCalledTimes(1);
          expect(mockedCreateOneEntityForFolder$).toHaveBeenCalledTimes(1);
          done();
        });
    });

    it('should create all entities with an initial slug when provided', (done: any) => {
      const mockedFindGoogleDriveFolders$ = jest
        .spyOn(apiUtil, 'findGoogleDriveFolders$')
        .mockReturnValue(of([{} as GoogleDriveFolder]));

      const mockedCreateOneEntityForFolder$ = jest
        .spyOn(entityCreateOneForFolderProvider, 'createOneEntityForFolder$')
        .mockReturnValue(of(undefined));

      const initialSlug = faker.lorem.word();
      entityCreateAllForFolderProvider
        .createAllEntitiesForFolder$(
          {} as drive_v3.Drive,
          faker.datatype.uuid(),
          faker.random.arrayElement(Object.values(EntityType)),
          faker.random.arrayElement(Object.values(WatermarkedType)),
          faker.lorem.word(),
          initialSlug
        )
        .subscribe(() => {
          expect(mockedFindGoogleDriveFolders$).toHaveBeenCalledTimes(1);
          expect(mockedCreateOneEntityForFolder$).toHaveBeenCalledTimes(1);
          const [_entityFolder, _entityType, _watermarkedType, _group, slug] =
            mockedCreateOneEntityForFolder$.mock.calls[0];
          expect(slug).toBe(initialSlug);
          done();
        });
    });

    it('should not create all entities for a folder if entity folders are not found', (done: any) => {
      const mockedFindGoogleDriveFolders$ = jest
        .spyOn(apiUtil, 'findGoogleDriveFolders$')
        .mockReturnValue(of([] as GoogleDriveFolder[]));

      const mockedCreateOneEntityForFolder$ = jest.spyOn(
        entityCreateOneForFolderProvider,
        'createOneEntityForFolder$'
      );

      entityCreateAllForFolderProvider
        .createAllEntitiesForFolder$(
          {} as drive_v3.Drive,
          faker.datatype.uuid(),
          faker.random.arrayElement(Object.values(EntityType)),
          faker.random.arrayElement(Object.values(WatermarkedType)),
          faker.lorem.word()
        )
        .subscribe(() => {
          expect(mockedFindGoogleDriveFolders$).toHaveBeenCalledTimes(1);
          expect(mockedCreateOneEntityForFolder$).not.toHaveBeenCalled();
          done();
        });
    });
  });
});
