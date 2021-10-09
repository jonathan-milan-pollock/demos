/* eslint-disable @typescript-eslint/no-explicit-any */
import { Test } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { getModelToken } from '@nestjs/mongoose';

import * as faker from 'faker';
import { of } from 'rxjs';
import { drive_v3 } from 'googleapis';

import {
  EntityWithGroupType,
  EntityWithoutGroupType,
  WatermarkedType,
} from '@dark-rush-photography/shared/types';
import { Document } from '../schema/document.schema';
import { ConfigProvider } from './config.provider';
import { EntityCreateProvider } from './entity-create.provider';
import { EntityCreateWatermarkedTypeProvider } from './entity-create-watermarked-type.provider';
import { EntityCreateForFolderProvider } from './entity-create-for-folder.provider';

jest.mock('@dark-rush-photography/api/util', () => ({
  ...jest.requireActual('@dark-rush-photography/api/util'),
}));
import * as apiUtil from '@dark-rush-photography/api/util';

describe('entity-create.provider', () => {
  let entityCreateProvider: EntityCreateProvider;
  let entityCreateWatermarkedTypeProvider: EntityCreateWatermarkedTypeProvider;

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
        EntityCreateProvider,
        EntityCreateWatermarkedTypeProvider,
        EntityCreateForFolderProvider,
      ],
    }).compile();

    entityCreateProvider =
      moduleRef.get<EntityCreateProvider>(EntityCreateProvider);
    entityCreateWatermarkedTypeProvider =
      moduleRef.get<EntityCreateWatermarkedTypeProvider>(
        EntityCreateWatermarkedTypeProvider
      );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create$', () => {
    it('should create watermarked and without watermark', (done: any) => {
      const folderName = faker.lorem.word();
      jest
        .spyOn(apiUtil, 'getEntityWithoutGroupTypeFolderName')
        .mockReturnValue(folderName);

      const initialSlug = faker.lorem.word();
      jest
        .spyOn(apiUtil, 'getEntityWithoutGroupTypeInitialSlug')
        .mockReturnValue(initialSlug);

      const mockedCreateWatermarkedType$ = jest
        .spyOn(entityCreateWatermarkedTypeProvider, 'createWatermarkedType$')
        .mockReturnValue(of(undefined));

      const entityWithoutGroupType = faker.random.arrayElement(
        Object.values(EntityWithoutGroupType)
      );
      entityCreateProvider
        .create$({} as drive_v3.Drive, entityWithoutGroupType)
        .subscribe(() => {
          expect(mockedCreateWatermarkedType$).toBeCalledTimes(2);
          expect(mockedCreateWatermarkedType$.mock.calls).toEqual([
            [
              {},
              folderName,
              entityWithoutGroupType,
              WatermarkedType.Watermarked,
              initialSlug,
            ],
            [
              {},
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

  describe('createForGroup$', () => {
    it('should create watermarked and without watermark entities for a group', (done: any) => {
      const folderName = faker.lorem.word();
      jest
        .spyOn(apiUtil, 'getEntityWithGroupTypeFolderName')
        .mockReturnValue(folderName);

      const mockedCreateWatermarkedTypeForGroup$ = jest
        .spyOn(
          entityCreateWatermarkedTypeProvider,
          'createWatermarkedTypeForGroup$'
        )
        .mockReturnValue(of(undefined));

      const entityWithGroupType = faker.random.arrayElement(
        Object.values(EntityWithGroupType)
      );
      const group = faker.lorem.word();
      entityCreateProvider
        .createForGroup$({} as drive_v3.Drive, entityWithGroupType, group)
        .subscribe(() => {
          expect(mockedCreateWatermarkedTypeForGroup$).toBeCalledTimes(2);
          expect(mockedCreateWatermarkedTypeForGroup$.mock.calls).toEqual([
            [
              {},
              folderName,
              entityWithGroupType,
              WatermarkedType.Watermarked,
              group,
            ],
            [
              {},
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
