/* eslint-disable @typescript-eslint/no-explicit-any */
import { Test } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { getModelToken } from '@nestjs/mongoose';

import * as faker from 'faker';
import { of } from 'rxjs';
import { drive_v3 } from 'googleapis';

import {
  EntityMinimal,
  EntityWithGroupType,
  WatermarkedType,
} from '@dark-rush-photography/shared/types';
import { Document, DocumentModel } from '../schema/document.schema';
import { ConfigProvider } from './config.provider';
import { EntityGroupProvider } from './entity-group.provider';
import { EntityCreateProvider } from './entity-create.provider';

jest.mock('@dark-rush-photography/api/util', () => ({
  ...jest.requireActual('@dark-rush-photography/api/util'),
}));
import * as apiUtil from '@dark-rush-photography/api/util';

jest.mock('../entities/entity.functions', () => ({
  ...jest.requireActual('../entities/entity.functions'),
}));
import * as entityFunctions from '../entities/entity.functions';

jest.mock('../entities/entity-group.functions', () => ({
  ...jest.requireActual('../entities/entity-group.functions'),
}));
import * as entityGroupFunctions from '../entities/entity-group.functions';

describe('entity-group.provider', () => {
  let entityGroupProvider: EntityGroupProvider;
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
        EntityGroupProvider,
      ],
    }).compile();

    entityGroupProvider =
      moduleRef.get<EntityGroupProvider>(EntityGroupProvider);
    entityCreateProvider =
      moduleRef.get<EntityCreateProvider>(EntityCreateProvider);
  });

  describe('findGroups$', () => {
    it('should combine groups from google drive', (done: any) => {
      jest
        .spyOn(apiUtil, 'getEntityWithGroupTypeFolderName')
        .mockImplementation(() => '');

      const watermarkedGroups = [faker.lorem.word()];
      const withoutWatermarkGroups = [faker.lorem.word()];

      jest
        .spyOn(entityGroupFunctions, 'findGroupsFromGoogleDriveFolderName$')
        .mockImplementationOnce(() => of(watermarkedGroups))
        .mockImplementationOnce(() => of(withoutWatermarkGroups));

      entityGroupProvider
        .findGroups$(
          {} as drive_v3.Drive,
          faker.random.arrayElement(Object.values(EntityWithGroupType))
        )
        .subscribe((result) => {
          expect(result).toEqual([
            ...watermarkedGroups,
            ...withoutWatermarkGroups,
          ]);
          done();
        });
    });

    it('should not have duplicates from google drive', (done: any) => {
      jest
        .spyOn(apiUtil, 'getEntityWithGroupTypeFolderName')
        .mockImplementation(() => '');

      const sameGroup = faker.lorem.word();

      const watermarkedGroups = [sameGroup];
      const withoutWatermarkGroups = [sameGroup];

      jest
        .spyOn(entityGroupFunctions, 'findGroupsFromGoogleDriveFolderName$')
        .mockImplementationOnce(() => of(watermarkedGroups))
        .mockImplementationOnce(() => of(withoutWatermarkGroups));

      entityGroupProvider
        .findGroups$(
          {} as drive_v3.Drive,
          faker.random.arrayElement(Object.values(EntityWithGroupType))
        )
        .subscribe((result) => {
          expect(result).toEqual([sameGroup]);
          expect(result).toHaveLength(1);
          done();
        });
    });

    it('should return an empty array if groups are not found in google drive', (done: any) => {
      jest
        .spyOn(apiUtil, 'getEntityWithGroupTypeFolderName')
        .mockImplementation(() => '');

      jest
        .spyOn(entityGroupFunctions, 'findGroupsFromGoogleDriveFolderName$')
        .mockImplementation(() => of([]));

      entityGroupProvider
        .findGroups$(
          {} as drive_v3.Drive,
          faker.random.arrayElement(Object.values(EntityWithGroupType))
        )
        .subscribe((result) => {
          expect(result).toHaveLength(0);
          done();
        });
    });
  });

  describe('findAllForGroup$', () => {
    it('should find all entities for a provided group', (done: any) => {
      jest
        .spyOn(apiUtil, 'getEntityWithGroupTypeFolderName')
        .mockImplementation(() => '');

      jest
        .spyOn(entityCreateProvider, 'createForGroup$')
        .mockImplementation(() => of(undefined));

      const entities = [
        {
          slug: faker.lorem.word(),
        } as DocumentModel,
        {
          slug: faker.lorem.word(),
        } as DocumentModel,
      ];
      jest
        .spyOn(entityGroupFunctions, 'findAllForGroup$')
        .mockImplementation(() => of(entities));

      jest
        .spyOn(entityFunctions, 'loadEntityMinimal')
        .mockImplementation(
          (documentModel: DocumentModel) =>
            ({ slug: documentModel.slug } as EntityMinimal)
        );

      entityGroupProvider
        .findAllForGroup$(
          {} as drive_v3.Drive,
          faker.random.arrayElement(Object.values(EntityWithGroupType)),
          faker.lorem.word()
        )
        .subscribe((result) => {
          expect(result).toEqual(entities);
          done();
        });
    });

    it('should be empty if entities are not found', (done: any) => {
      jest
        .spyOn(apiUtil, 'getEntityWithGroupTypeFolderName')
        .mockImplementation(() => '');

      jest
        .spyOn(entityCreateProvider, 'createForGroup$')
        .mockImplementation(() => of(undefined));

      jest
        .spyOn(entityGroupFunctions, 'findAllForGroup$')
        .mockImplementation(() => of([]));

      entityGroupProvider
        .findAllForGroup$(
          {} as drive_v3.Drive,
          faker.random.arrayElement(Object.values(EntityWithGroupType)),
          faker.lorem.word()
        )
        .subscribe((result) => {
          expect(result).toHaveLength(0);
          done();
        });
    });

    it('should create entities for watermarked and without watermark groups', (done: any) => {
      const folderName = faker.lorem.word();

      jest
        .spyOn(apiUtil, 'getEntityWithGroupTypeFolderName')
        .mockImplementation(() => folderName);

      const mockCreateForGroup$ = jest
        .spyOn(entityCreateProvider, 'createForGroup$')
        .mockImplementation(() => of(undefined));

      jest
        .spyOn(entityGroupFunctions, 'findAllForGroup$')
        .mockImplementation(() => of([]));

      const googleDrive = {} as drive_v3.Drive;
      const entityWithGroupType = faker.random.arrayElement(
        Object.values(EntityWithGroupType)
      );
      const group = faker.lorem.word();

      entityGroupProvider
        .findAllForGroup$(googleDrive, entityWithGroupType, group)
        .subscribe(() => {
          expect(mockCreateForGroup$.mock.calls).toEqual([
            [
              googleDrive,
              folderName,
              entityWithGroupType,
              WatermarkedType.Watermarked,
              group,
            ],
            [
              googleDrive,
              folderName,
              entityWithGroupType,
              WatermarkedType.WithoutWatermark,
              group,
            ],
          ]);
          done();
        });
    });
  });
});
