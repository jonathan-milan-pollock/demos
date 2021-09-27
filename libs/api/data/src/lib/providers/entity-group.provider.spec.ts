/* eslint-disable @typescript-eslint/no-explicit-any */
import { Test } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { getModelToken } from '@nestjs/mongoose';

import * as faker from 'faker';
import { of } from 'rxjs';
import { drive_v3 } from 'googleapis';

import { EntityWithGroupType } from '@dark-rush-photography/shared/types';
import { Document } from '../schema/document.schema';
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
import { EntityCreateProvider } from './entity-create.provider';

describe('entity-group.provider', () => {
  let entityGroupProvider: EntityGroupProvider;

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
        EntityGroupProvider,
        EntityCreateProvider,
      ],
    }).compile();

    entityGroupProvider =
      moduleRef.get<EntityGroupProvider>(EntityGroupProvider);
  });

  describe('findGroups$', () => {
    const entityWithGroupTypes: {
      entityWithGroupType: EntityWithGroupType;
    }[] = [
      {
        entityWithGroupType: EntityWithGroupType.Event,
      },
      {
        entityWithGroupType: EntityWithGroupType.PhotoOfTheWeek,
      },
      {
        entityWithGroupType: EntityWithGroupType.SocialMedia,
      },
    ];

    beforeEach(() => {
      jest
        .spyOn(apiUtil, 'getEntityWithGroupTypeFolderName')
        .mockImplementation(() => '');
    });

    it.each(entityWithGroupTypes)(
      'should combine groups for %s from google drive',
      ({ entityWithGroupType }, done: any) => {
        const watermarkedGroups = [faker.lorem.word()];
        const withoutWatermarkGroups = [faker.lorem.word()];

        jest
          .spyOn(entityGroupFunctions, 'findGroupsFromGoogleDriveFolderName$')
          .mockImplementationOnce(() => of(watermarkedGroups))
          .mockImplementationOnce(() => of(withoutWatermarkGroups));

        entityGroupProvider
          .findGroups$({} as drive_v3.Drive, entityWithGroupType)
          .subscribe((groups) => {
            expect(groups).toEqual([
              ...watermarkedGroups,
              ...withoutWatermarkGroups,
            ]);
            done();
          });
      }
    );

    it.each(entityWithGroupTypes)(
      'should not have duplicates for %s from google drive',
      ({ entityWithGroupType }, done: any) => {
        const sameGroup = faker.lorem.word();

        const watermarkedGroups = [sameGroup];
        const withoutWatermarkGroups = [sameGroup];

        jest
          .spyOn(entityGroupFunctions, 'findGroupsFromGoogleDriveFolderName$')
          .mockImplementationOnce(() => of(watermarkedGroups))
          .mockImplementationOnce(() => of(withoutWatermarkGroups));

        entityGroupProvider
          .findGroups$({} as drive_v3.Drive, entityWithGroupType)
          .subscribe((groups) => {
            expect(groups).toEqual([sameGroup]);
            expect(groups).toHaveLength(1);
            done();
          });
      }
    );

    it.each(entityWithGroupTypes)(
      'should return an empty array for %s if groups are not found in google drive',
      ({ entityWithGroupType }, done: any) => {
        jest
          .spyOn(entityGroupFunctions, 'findGroupsFromGoogleDriveFolderName$')
          .mockImplementation(() => of([]));

        entityGroupProvider
          .findGroups$({} as drive_v3.Drive, entityWithGroupType)
          .subscribe((groups) => {
            expect(groups).toHaveLength(0);
            done();
          });
      }
    );
  });
});
