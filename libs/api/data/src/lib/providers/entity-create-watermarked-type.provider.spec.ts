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
  GoogleDriveFolder,
  WatermarkedType,
} from '@dark-rush-photography/shared/types';
import { Document } from '../schema/document.schema';
import { ConfigProvider } from './config.provider';
import { EntityCreateWatermarkedTypeProvider } from './entity-create-watermarked-type.provider';

jest.mock('@dark-rush-photography/api/util', () => ({
  ...jest.requireActual('@dark-rush-photography/api/util'),
}));
import * as apiUtil from '@dark-rush-photography/api/util';

jest.mock('../entities/entity-create.functions', () => ({
  ...jest.requireActual('../entities/entity-create.functions'),
}));
import * as entityCreateFunctions from '../entities/entity-create.functions';

describe('entity-create-watermarked-type.provider', () => {
  let entityCreateWatermarkedTypeProvider: EntityCreateWatermarkedTypeProvider;

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
        EntityCreateWatermarkedTypeProvider,
      ],
    }).compile();

    entityCreateWatermarkedTypeProvider =
      moduleRef.get<EntityCreateWatermarkedTypeProvider>(
        EntityCreateWatermarkedTypeProvider
      );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createWatermarkedType$', () => {
    it('should create watermarked type entity', (done: any) => {
      jest
        .spyOn(apiUtil, 'findGoogleDriveFolderByName$')
        .mockReturnValue(
          of({ id: faker.datatype.uuid() } as GoogleDriveFolder)
        );

      const mockedCreateEntityFoFolder$ = jest
        .spyOn(entityCreateFunctions, 'createEntityForFolder$')
        .mockReturnValue(of(undefined));

      entityCreateWatermarkedTypeProvider
        .createWatermarkedType$(
          {} as drive_v3.Drive,
          faker.lorem.word(),
          faker.random.arrayElement(Object.values(EntityWithoutGroupType)),
          faker.random.arrayElement(Object.values(WatermarkedType)),
          faker.lorem.word()
        )
        .subscribe(() => {
          expect(mockedCreateEntityFoFolder$).toHaveBeenCalled();
          done();
        });
    });

    it('should not create watermarked type entity when folder is not found', (done: any) => {
      const mockedFindGoogleDriveFolderByName$ = jest
        .spyOn(apiUtil, 'findGoogleDriveFolderByName$')
        .mockReturnValue(of(undefined));

      const mockedCreateEntityForFolder$ = jest.spyOn(
        entityCreateFunctions,
        'createEntityForFolder$'
      );

      entityCreateWatermarkedTypeProvider
        .createWatermarkedType$(
          {} as drive_v3.Drive,
          faker.lorem.word(),
          faker.random.arrayElement(Object.values(EntityWithoutGroupType)),
          faker.random.arrayElement(Object.values(WatermarkedType)),
          faker.lorem.word()
        )
        .subscribe(() => {
          expect(mockedFindGoogleDriveFolderByName$).toHaveBeenCalledTimes(1);
          expect(mockedCreateEntityForFolder$).not.toHaveBeenCalled();
          done();
        });
    });
  });

  describe('createForGroup$', () => {
    it('should create watermarked type entity for a group', (done: any) => {
      jest
        .spyOn(apiUtil, 'findGoogleDriveFolderByName$')
        .mockReturnValueOnce(
          of({ id: faker.datatype.uuid() } as GoogleDriveFolder)
        )
        .mockReturnValueOnce(
          of({ id: faker.datatype.uuid() } as GoogleDriveFolder)
        );

      const mockedCreateEntityForFolder$ = jest
        .spyOn(entityCreateFunctions, 'createEntityForFolder$')
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
          expect(mockedCreateEntityForFolder$).toHaveBeenCalled();
          done();
        });
    });

    it('should not create watermarked type entity for a group when folder is not found', (done: any) => {
      const mockFindGoogleDriveFolderByName$ = jest
        .spyOn(apiUtil, 'findGoogleDriveFolderByName$')
        .mockReturnValue(of(undefined));

      const mockedCreateEntityForFolder$ = jest.spyOn(
        entityCreateFunctions,
        'createEntityForFolder$'
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
          expect(mockFindGoogleDriveFolderByName$).toHaveBeenCalledTimes(1);
          expect(mockedCreateEntityForFolder$).not.toHaveBeenCalled();
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

      const mockedCreateEntityForFolder$ = jest.spyOn(
        entityCreateFunctions,
        'createEntityForFolder$'
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
          expect(mockedCreateEntityForFolder$).not.toHaveBeenCalled();
          done();
        });
    });
  });
});
