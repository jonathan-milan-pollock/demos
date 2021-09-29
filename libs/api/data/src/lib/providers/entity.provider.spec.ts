/* eslint-disable @typescript-eslint/no-explicit-any */
import { Test } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { getModelToken } from '@nestjs/mongoose';

import * as faker from 'faker';
import { of } from 'rxjs';
import { drive_v3 } from 'googleapis';

import {
  EntityMinimal,
  EntityWithoutGroupType,
  WatermarkedType,
} from '@dark-rush-photography/shared/types';
import { Document, DocumentModel } from '../schema/document.schema';
import { ConfigProvider } from './config.provider';
import { EntityProvider } from './entity.provider';
import { EntityCreateProvider } from './entity-create.provider';

jest.mock('@dark-rush-photography/api/util', () => ({
  ...jest.requireActual('@dark-rush-photography/api/util'),
}));
import * as apiUtil from '@dark-rush-photography/api/util';

jest.mock('../entities/entity-load.functions', () => ({
  ...jest.requireActual('../entities/entity-load.functions'),
}));
import * as entityLoadFunctions from '../entities/entity-load.functions';

jest.mock('../entities/entity-find-all.functions', () => ({
  ...jest.requireActual('../entities/entity-find-all.functions'),
}));
import * as entityFindAllFunctions from '../entities/entity-find-all.functions';

describe('entity.provider', () => {
  let entityProvider: EntityProvider;
  let entityCreateProvider: EntityCreateProvider;

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
        EntityProvider,
        EntityCreateProvider,
      ],
    }).compile();

    entityProvider = moduleRef.get<EntityProvider>(EntityProvider);
    entityCreateProvider =
      moduleRef.get<EntityCreateProvider>(EntityCreateProvider);
  });

  describe('findAll$', () => {
    it('should find watermarked and without watermark entities', (done: any) => {
      jest
        .spyOn(apiUtil, 'getEntityWithoutGroupTypeFolderName')
        .mockImplementation(() => '');

      jest
        .spyOn(apiUtil, 'getEntityWithoutGroupTypeInitialSlug')
        .mockImplementation(() => '');

      jest
        .spyOn(entityCreateProvider, 'create$')
        .mockImplementation(() => of(undefined));

      const watermarkedEntity = {
        slug: faker.lorem.word(),
      } as DocumentModel;
      const withoutWatermarkEntity = {
        slug: faker.lorem.word(),
      } as DocumentModel;

      jest
        .spyOn(entityFindAllFunctions, 'findAllEntities$')
        .mockImplementationOnce(() => of([watermarkedEntity]))
        .mockImplementationOnce(() => of([withoutWatermarkEntity]));

      jest
        .spyOn(entityLoadFunctions, 'loadEntityMinimal')
        .mockImplementation(
          (documentModel: DocumentModel) =>
            ({ slug: documentModel.slug } as EntityMinimal)
        );

      entityProvider
        .findAll$(
          {} as drive_v3.Drive,
          faker.random.arrayElement(Object.values(EntityWithoutGroupType))
        )
        .subscribe((result) => {
          expect(result).toEqual([
            { ...watermarkedEntity },
            { ...withoutWatermarkEntity },
          ]);
          done();
        });
    });

    it('should be empty if entities are not found', (done: any) => {
      jest
        .spyOn(apiUtil, 'getEntityWithoutGroupTypeFolderName')
        .mockImplementation(() => '');

      jest
        .spyOn(apiUtil, 'getEntityWithoutGroupTypeInitialSlug')
        .mockImplementation(() => '');

      jest
        .spyOn(entityCreateProvider, 'create$')
        .mockImplementation(() => of(undefined));

      jest
        .spyOn(entityFindAllFunctions, 'findAllEntities$')
        .mockImplementation(() => of([]));

      entityProvider
        .findAll$(
          {} as drive_v3.Drive,
          faker.random.arrayElement(Object.values(EntityWithoutGroupType))
        )
        .subscribe((result) => {
          expect(result).toHaveLength(0);
          done();
        });
    });

    it('should create entities for both watermarked and without watermark', (done: any) => {
      const folderName = faker.lorem.word();
      jest
        .spyOn(apiUtil, 'getEntityWithoutGroupTypeFolderName')
        .mockImplementation(() => folderName);

      const initialSlug = faker.lorem.word();
      jest
        .spyOn(apiUtil, 'getEntityWithoutGroupTypeInitialSlug')
        .mockImplementation(() => initialSlug);

      const mockCreate$ = jest
        .spyOn(entityCreateProvider, 'create$')
        .mockImplementation(() => of(undefined));

      jest
        .spyOn(entityFindAllFunctions, 'findAllEntities$')
        .mockImplementation(() => of([]));

      const googleDrive = {} as drive_v3.Drive;
      const entityWithoutGroupType = faker.random.arrayElement(
        Object.values(EntityWithoutGroupType)
      );

      entityProvider
        .findAll$(googleDrive, entityWithoutGroupType)
        .subscribe(() => {
          expect(mockCreate$.mock.calls).toEqual([
            [
              googleDrive,
              folderName,
              entityWithoutGroupType,
              WatermarkedType.Watermarked,
              initialSlug,
            ],
            [
              googleDrive,
              folderName,
              entityWithoutGroupType,
              WatermarkedType.WithoutWatermark,
              initialSlug,
            ],
          ]);
          done();
        });
    });
  });
});
