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

describe('entity-group.provider', () => {
  let entityGroupProvider: EntityGroupProvider;

  beforeEach(async () => {
    class MockConfigProvider {
      get googleDriveWebsitesWatermarkedFolderId(): string {
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
        .spyOn(apiUtil, 'findGoogleDriveFolderByName$')
        .mockImplementation(() => of({ id: '', name: '' }));
    });

    it.each(entityWithGroupTypes)(
      'should return multiple groups for %s if they are found in google drive',
      ({ entityWithGroupType }, done: any) => {
        jest
          .spyOn(apiUtil, 'findGoogleDriveFolders$')
          .mockImplementation(() => of([{ id: '', name: '' }]));

        entityGroupProvider
          .findGroups$({} as drive_v3.Drive, entityWithGroupType)
          .subscribe((groups) => {
            expect(groups).toHaveLength(1);
            done();
          });
      }
    );

    it.each(entityWithGroupTypes)(
      'should return group name for %s if found in google drive',
      ({ entityWithGroupType }, done: any) => {
        const groupName1 = faker.lorem.word();
        const groupName2 = faker.lorem.word();

        jest.spyOn(apiUtil, 'findGoogleDriveFolders$').mockImplementation(() =>
          of([
            { id: '', name: groupName1 },
            { id: '', name: groupName2 },
          ])
        );

        entityGroupProvider
          .findGroups$({} as drive_v3.Drive, entityWithGroupType)
          .subscribe((groups) => {
            expect(groups).toEqual([groupName1, groupName2]);
            done();
          });
      }
    );

    it.each(entityWithGroupTypes)(
      'should return an empty array if groups are not found in google drive',
      ({ entityWithGroupType }, done: any) => {
        jest
          .spyOn(apiUtil, 'findGoogleDriveFolders$')
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
