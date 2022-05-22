/* eslint-disable @typescript-eslint/no-explicit-any */
import { Test } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';

import faker from '@faker-js/faker';
import { of } from 'rxjs';
import { drive_v3 } from 'googleapis';

import { EntityWithGroupType } from '@dark-rush-photography/shared/types';
import { ConfigProvider } from './config.provider';
import { EntityGroupProvider } from './entity-group.provider';
import { EntityGroupFindProvider } from './entity-group-find.provider';

jest.mock('@dark-rush-photography/shared/util', () => ({
  ...jest.requireActual('@dark-rush-photography/shared/util'),
}));
import * as sharedUtil from '@dark-rush-photography/shared/util';

describe('entity-group.provider', () => {
  let entityGroupProvider: EntityGroupProvider;
  let entityGroupFindProvider: EntityGroupFindProvider;

  beforeEach(async () => {
    const mockedConfigProvider = {
      getGoogleDriveWebsitesFolderId: jest
        .fn()
        .mockReturnValue(faker.lorem.word()),
    };

    const moduleRef = await Test.createTestingModule({
      providers: [
        ConfigService,
        {
          provide: ConfigProvider,
          useValue: mockedConfigProvider,
        },
        EntityGroupProvider,
        EntityGroupFindProvider,
      ],
    }).compile();

    entityGroupProvider =
      moduleRef.get<EntityGroupProvider>(EntityGroupProvider);
    entityGroupFindProvider = moduleRef.get<EntityGroupFindProvider>(
      EntityGroupFindProvider
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findGroups$', () => {
    it('should find watermarked and without watermark groups', (done: any) => {
      const mockedGetEntityWithGroupTypeFolderName = jest
        .spyOn(sharedUtil, 'getEntityWithGroupTypeFolderName')
        .mockReturnValue(faker.lorem.word());

      const watermarkedGroups = [faker.lorem.word()];
      const withoutWatermarkGroups = [faker.lorem.word()];

      const mockedFindGroupsFromGoogleDriveFolderName$ = jest
        .spyOn(entityGroupFindProvider, 'findGroupsFromGoogleDriveFolderName$')
        .mockReturnValueOnce(of(watermarkedGroups))
        .mockReturnValueOnce(of(withoutWatermarkGroups));

      entityGroupProvider
        .findGroups$(
          {} as drive_v3.Drive,
          faker.random.arrayElement(Object.values(EntityWithGroupType))
        )
        .subscribe((result) => {
          expect(mockedGetEntityWithGroupTypeFolderName).toBeCalledTimes(1);
          expect(mockedFindGroupsFromGoogleDriveFolderName$).toBeCalledTimes(2);
          expect(result).toEqual([
            ...watermarkedGroups,
            ...withoutWatermarkGroups,
          ]);
          done();
        });
    });

    it('should not have duplicates from google drive', (done: any) => {
      const mockedGetEntityWithGroupTypeFolderName = jest
        .spyOn(sharedUtil, 'getEntityWithGroupTypeFolderName')
        .mockReturnValue(faker.lorem.word());

      const sameGroup = faker.lorem.word();

      const watermarkedGroups = [sameGroup];
      const withoutWatermarkGroups = [sameGroup];

      const mockedFindGroupsFromGoogleDriveFolderName$ = jest
        .spyOn(entityGroupFindProvider, 'findGroupsFromGoogleDriveFolderName$')
        .mockReturnValueOnce(of(watermarkedGroups))
        .mockReturnValueOnce(of(withoutWatermarkGroups));

      entityGroupProvider
        .findGroups$(
          {} as drive_v3.Drive,
          faker.random.arrayElement(Object.values(EntityWithGroupType))
        )
        .subscribe((result) => {
          expect(mockedGetEntityWithGroupTypeFolderName).toBeCalledTimes(1);
          expect(mockedFindGroupsFromGoogleDriveFolderName$).toBeCalledTimes(2);
          expect(result).toEqual([sameGroup]);
          expect(result).toHaveLength(1);
          done();
        });
    });

    it('should return an empty array if groups are not found in google drive', (done: any) => {
      const mockedGetEntityWithGroupTypeFolderName = jest
        .spyOn(sharedUtil, 'getEntityWithGroupTypeFolderName')
        .mockReturnValue(faker.lorem.word());

      const mockedFindGroupsFromGoogleDriveFolderName$ = jest
        .spyOn(entityGroupFindProvider, 'findGroupsFromGoogleDriveFolderName$')
        .mockReturnValue(of([]));

      entityGroupProvider
        .findGroups$(
          {} as drive_v3.Drive,
          faker.random.arrayElement(Object.values(EntityWithGroupType))
        )
        .subscribe((result) => {
          expect(mockedGetEntityWithGroupTypeFolderName).toBeCalledTimes(1);
          expect(mockedFindGroupsFromGoogleDriveFolderName$).toBeCalledTimes(2);
          expect(result).toHaveLength(0);
          done();
        });
    });
  });
});
