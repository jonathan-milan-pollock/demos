/* eslint-disable @typescript-eslint/no-explicit-any */
import { Test } from '@nestjs/testing';

import * as faker from 'faker';
import { of } from 'rxjs';
import { drive_v3 } from 'googleapis';

import { GoogleDriveFolder } from '@dark-rush-photography/shared/types';
import { EntityGroupFindProvider } from './entity-group-find.provider';

jest.mock('@dark-rush-photography/api/util', () => ({
  ...jest.requireActual('@dark-rush-photography/api/util'),
}));
import * as apiUtil from '@dark-rush-photography/api/util';

describe('entity-group-find.provider', () => {
  let entityGroupFindProvider: EntityGroupFindProvider;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [EntityGroupFindProvider],
    }).compile();

    entityGroupFindProvider = moduleRef.get<EntityGroupFindProvider>(
      EntityGroupFindProvider
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findGroupsFromGoogleDriveFolderName$', () => {
    it('should return groups from google drive', (done: any) => {
      const mockedFindGoogleDriveFolderByName$ = jest
        .spyOn(apiUtil, 'findGoogleDriveFolderByName$')
        .mockReturnValue(of({} as GoogleDriveFolder));

      const groupFolders = [
        { id: '', name: faker.lorem.word() },
        { id: '', name: faker.lorem.word() },
      ];
      const mockedFindGoogleDriveFolders$ = jest
        .spyOn(apiUtil, 'findGoogleDriveFolders$')
        .mockReturnValue(of(groupFolders));

      entityGroupFindProvider
        .findGroupsFromGoogleDriveFolderName$(
          {} as drive_v3.Drive,
          faker.lorem.word(),
          faker.datatype.uuid()
        )
        .subscribe((result) => {
          expect(mockedFindGoogleDriveFolderByName$).toBeCalledTimes(1);
          expect(mockedFindGoogleDriveFolders$).toBeCalledTimes(1);
          expect(result).toEqual(
            groupFolders.map((groupFolder) => groupFolder.name)
          );
          done();
        });
    });

    it('should return empty array if entity folder is not found', (done: any) => {
      const mockedFindGoogleDriveFolderByName$ = jest
        .spyOn(apiUtil, 'findGoogleDriveFolderByName$')
        .mockReturnValue(of(undefined));

      const mockedFindGoogleDriveFolders$ = jest.spyOn(
        apiUtil,
        'findGoogleDriveFolders$'
      );

      entityGroupFindProvider
        .findGroupsFromGoogleDriveFolderName$(
          {} as drive_v3.Drive,
          faker.lorem.word(),
          faker.datatype.uuid()
        )
        .subscribe((result) => {
          expect(mockedFindGoogleDriveFolderByName$).toBeCalledTimes(1);
          expect(mockedFindGoogleDriveFolders$).not.toBeCalled();
          expect(result).toHaveLength(0);
          done();
        });
    });

    it('should return empty array if folders are not found', (done: any) => {
      const mockedFindGoogleDriveFolderByName$ = jest
        .spyOn(apiUtil, 'findGoogleDriveFolderByName$')
        .mockReturnValue(of({} as GoogleDriveFolder));

      const mockedFindGoogleDriveFolders$ = jest
        .spyOn(apiUtil, 'findGoogleDriveFolders$')
        .mockReturnValue(of([]));

      entityGroupFindProvider
        .findGroupsFromGoogleDriveFolderName$(
          {} as drive_v3.Drive,
          faker.lorem.word(),
          faker.datatype.uuid()
        )
        .subscribe((result) => {
          expect(mockedFindGoogleDriveFolderByName$).toBeCalledTimes(1);
          expect(mockedFindGoogleDriveFolders$).toBeCalledTimes(1);
          expect(result).toHaveLength(0);
          done();
        });
    });
  });
});
