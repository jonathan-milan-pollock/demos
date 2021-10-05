/* eslint-disable @typescript-eslint/no-explicit-any */
import * as faker from 'faker';
import { of } from 'rxjs';
import { drive_v3 } from 'googleapis';

jest.mock('@dark-rush-photography/api/util', () => ({
  ...jest.requireActual('@dark-rush-photography/api/util'),
}));
import * as apiUtil from '@dark-rush-photography/api/util';

import { findGroupsFromGoogleDriveFolderName$ } from './entity-group.functions';

describe('entity-group.functions', () => {
  describe('findGroupsFromGoogleDriveFolderName$', () => {
    it('should return groups from google drive', (done: any) => {
      const groupFolders = [
        { id: '', name: faker.lorem.word() },
        { id: '', name: faker.lorem.word() },
      ];

      jest
        .spyOn(apiUtil, 'findGoogleDriveFolderByName$')
        .mockReturnValue(of({ id: '', name: '' }));
      jest
        .spyOn(apiUtil, 'findGoogleDriveFolders$')
        .mockReturnValue(of(groupFolders));

      findGroupsFromGoogleDriveFolderName$(
        {} as drive_v3.Drive,
        faker.lorem.word(),
        faker.datatype.uuid()
      ).subscribe((result) => {
        expect(result).toEqual(
          groupFolders.map((groupFolder) => groupFolder.name)
        );
        done();
      });
    });

    it('should return empty array if entity folder is not found', (done: any) => {
      jest
        .spyOn(apiUtil, 'findGoogleDriveFolderByName$')
        .mockReturnValue(of(undefined));

      findGroupsFromGoogleDriveFolderName$(
        {} as drive_v3.Drive,
        faker.lorem.word(),
        faker.datatype.uuid()
      ).subscribe((result) => {
        expect(result).toHaveLength(0);
        done();
      });
    });

    it('should return empty array if folders are not found', (done: any) => {
      jest
        .spyOn(apiUtil, 'findGoogleDriveFolderByName$')
        .mockReturnValue(of({ id: '', name: '' }));
      jest.spyOn(apiUtil, 'findGoogleDriveFolders$').mockReturnValue(of([]));

      findGroupsFromGoogleDriveFolderName$(
        {} as drive_v3.Drive,
        faker.lorem.word(),
        faker.datatype.uuid()
      ).subscribe((result) => {
        expect(result).toHaveLength(0);
        done();
      });
    });
  });
});
