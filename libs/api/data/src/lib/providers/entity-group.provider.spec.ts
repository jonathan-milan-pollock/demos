/* eslint-disable @typescript-eslint/no-explicit-any */
import { Test } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';

import * as faker from 'faker';
import { of } from 'rxjs';
import { drive_v3 } from 'googleapis';

import { EntityWithGroupType } from '@dark-rush-photography/shared/types';
import { ConfigProvider } from './config.provider';
import { EntityGroupProvider } from './entity-group.provider';

jest.mock('@dark-rush-photography/api/util', () => ({
  ...jest.requireActual('@dark-rush-photography/api/util'),
}));
import * as apiUtil from '@dark-rush-photography/api/util';

jest.mock('../entities/entity-group.functions', () => ({
  ...jest.requireActual('../entities/entity-group.functions'),
}));
import * as entityGroupFunctions from '../entities/entity-group.functions';

describe('entity-group.provider', () => {
  let entityGroupProvider: EntityGroupProvider;

  beforeEach(async () => {
    class MockConfigProvider {
      getGoogleDriveWebsitesFolderId(): string {
        return '';
      }
    }

    const moduleRef = await Test.createTestingModule({
      providers: [
        ConfigService,
        {
          provide: ConfigProvider,
          useClass: MockConfigProvider,
        },
        EntityGroupProvider,
      ],
    }).compile();

    entityGroupProvider =
      moduleRef.get<EntityGroupProvider>(EntityGroupProvider);
  });

  describe('findGroups$', () => {
    it('should combine groups from google drive', (done: any) => {
      jest
        .spyOn(apiUtil, 'getEntityWithGroupTypeFolderName')
        .mockReturnValue('');

      const watermarkedGroups = [faker.lorem.word()];
      const withoutWatermarkGroups = [faker.lorem.word()];

      jest
        .spyOn(entityGroupFunctions, 'findGroupsFromGoogleDriveFolderName$')
        .mockReturnValueOnce(of(watermarkedGroups))
        .mockReturnValueOnce(of(withoutWatermarkGroups));

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
        .mockReturnValue('');

      const sameGroup = faker.lorem.word();

      const watermarkedGroups = [sameGroup];
      const withoutWatermarkGroups = [sameGroup];

      jest
        .spyOn(entityGroupFunctions, 'findGroupsFromGoogleDriveFolderName$')
        .mockReturnValueOnce(of(watermarkedGroups))
        .mockReturnValueOnce(of(withoutWatermarkGroups));

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
        .mockReturnValue('');

      jest
        .spyOn(entityGroupFunctions, 'findGroupsFromGoogleDriveFolderName$')
        .mockReturnValue(of([]));

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
});
