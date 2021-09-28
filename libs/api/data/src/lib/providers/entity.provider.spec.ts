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

jest.mock('../entities/entity.functions', () => ({
  ...jest.requireActual('../entities/entity.functions'),
}));
import * as entityFunctions from '../entities/entity.functions';

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
    it('should find all entities', (done: any) => {
      jest
        .spyOn(apiUtil, 'getEntityWithoutGroupTypeFolderName')
        .mockImplementation(() => '');

      jest
        .spyOn(apiUtil, 'getEntityWithoutGroupTypeInitialSlug')
        .mockImplementation(() => '');

      jest
        .spyOn(entityCreateProvider, 'create$')
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
        .spyOn(entityFunctions, 'findAll$')
        .mockImplementation(() => of(entities));

      jest
        .spyOn(entityFunctions, 'loadEntityMinimal')
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
          expect(result).toEqual(entities);
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
        .spyOn(entityFunctions, 'findAll$')
        .mockImplementationOnce(() => of([]));

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
        .spyOn(entityFunctions, 'findAll$')
        .mockImplementationOnce(() => of([]));

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
