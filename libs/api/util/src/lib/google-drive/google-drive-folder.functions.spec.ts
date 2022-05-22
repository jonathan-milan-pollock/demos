/* eslint-disable @typescript-eslint/no-explicit-any */
import { ConflictException } from '@nestjs/common';

import faker from '@faker-js/faker';
import { drive_v3 } from 'googleapis';

import { GoogleDriveFolder } from '@dark-rush-photography/shared/types';
import {
  findGoogleDriveFolderById$,
  findGoogleDriveFolderByName$,
  findGoogleDriveFolders$,
} from './google-drive-folder.functions';

describe('google-drive-folder.functions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findGoogleDriveFolders$', () => {
    const mockedGoogleDriveListFn = jest.fn().mockReturnValue(
      Promise.resolve({
        data: {
          files: [] as GoogleDriveFolder[],
        },
      })
    );

    const mockedGoogleDrive = {
      files: {
        list: mockedGoogleDriveListFn,
      },
    };

    it('should find google drive folders', (done: any) => {
      findGoogleDriveFolders$(
        mockedGoogleDrive as unknown as drive_v3.Drive,
        faker.datatype.uuid()
      ).subscribe(() => {
        expect(mockedGoogleDriveListFn).toHaveBeenCalledTimes(1);
        const [params] = mockedGoogleDriveListFn.mock.calls[0];
        expect(params.q).toContain(
          `mimeType = 'application/vnd.google-apps.folder'`
        );
        done();
      });
    });

    it('should not find trashed google drive folders', (done: any) => {
      findGoogleDriveFolders$(
        mockedGoogleDrive as unknown as drive_v3.Drive,
        faker.datatype.uuid()
      ).subscribe(() => {
        expect(mockedGoogleDriveListFn).toHaveBeenCalledTimes(1);
        const [params] = mockedGoogleDriveListFn.mock.calls[0];
        expect(params.q).toContain('trashed = false');
        done();
      });
    });

    it('should find the max number of folders for a list', (done: any) => {
      findGoogleDriveFolders$(
        mockedGoogleDrive as unknown as drive_v3.Drive,
        faker.datatype.uuid()
      ).subscribe(() => {
        expect(mockedGoogleDriveListFn).toHaveBeenCalledTimes(1);
        const [params] = mockedGoogleDriveListFn.mock.calls[0];
        expect(params.pageSize).toBe(1_000);
        done();
      });
    });
  });

  describe('findGoogleDriveFolderById$', () => {
    const mockedGoogleDriveGetFn = jest.fn().mockReturnValue(
      Promise.resolve({
        data: {} as GoogleDriveFolder,
      })
    );

    const mockedGoogleDrive = {
      files: {
        get: mockedGoogleDriveGetFn,
      },
    };

    it('should find a folder by id', (done: any) => {
      const folderId = faker.datatype.uuid();

      findGoogleDriveFolderById$(
        mockedGoogleDrive as unknown as drive_v3.Drive,
        folderId
      ).subscribe(() => {
        expect(mockedGoogleDriveGetFn).toHaveBeenCalledTimes(1);
        const [params] = mockedGoogleDriveGetFn.mock.calls[0];
        expect(params.fileId).toBe(folderId);
        done();
      });
    });
  });

  describe('findGoogleDriveFolderByName$', () => {
    it('should return a google drive folder by name', (done: any) => {
      const mockedGoogleDriveListFn = jest.fn().mockReturnValue(
        Promise.resolve({
          data: {
            files: [{} as GoogleDriveFolder],
          },
        })
      );

      const mockedGoogleDrive = {
        files: {
          list: mockedGoogleDriveListFn,
        },
      };

      const folderName = faker.lorem.word();
      findGoogleDriveFolderByName$(
        mockedGoogleDrive as unknown as drive_v3.Drive,
        folderName,
        faker.datatype.uuid()
      ).subscribe((result) => {
        expect(mockedGoogleDriveListFn).toHaveBeenCalledTimes(1);
        const [params] = mockedGoogleDriveListFn.mock.calls[0];
        expect(params.q).toContain(`name = '${folderName}'`);
        expect(result).toBeDefined();
        done();
      });
    });

    it('should return a google drive folder by name in a parent folder id', (done: any) => {
      const mockedGoogleDriveListFn = jest.fn().mockReturnValue(
        Promise.resolve({
          data: {
            files: [{} as GoogleDriveFolder],
          },
        })
      );

      const mockedGoogleDrive = {
        files: {
          list: mockedGoogleDriveListFn,
        },
      };

      const parentFolderId = faker.datatype.uuid();
      findGoogleDriveFolderByName$(
        mockedGoogleDrive as unknown as drive_v3.Drive,
        faker.lorem.word(),
        parentFolderId
      ).subscribe((result) => {
        expect(mockedGoogleDriveListFn).toHaveBeenCalledTimes(1);
        const [params] = mockedGoogleDriveListFn.mock.calls[0];
        expect(params.q).toContain(`'${parentFolderId}' in parents`);
        expect(result).toBeDefined();
        done();
      });
    });

    it('should return a google drive folder by name that is a folder', (done: any) => {
      const mockedGoogleDriveListFn = jest.fn().mockReturnValue(
        Promise.resolve({
          data: {
            files: [{} as GoogleDriveFolder],
          },
        })
      );

      const mockedGoogleDrive = {
        files: {
          list: mockedGoogleDriveListFn,
        },
      };

      findGoogleDriveFolderByName$(
        mockedGoogleDrive as unknown as drive_v3.Drive,
        faker.lorem.word(),
        faker.datatype.uuid()
      ).subscribe((result) => {
        expect(mockedGoogleDriveListFn).toHaveBeenCalledTimes(1);
        const [params] = mockedGoogleDriveListFn.mock.calls[0];
        expect(params.q).toContain(
          `mimeType = 'application/vnd.google-apps.folder'`
        );
        expect(result).toBeDefined();
        done();
      });
    });

    it('should not return a google drive folder by name if it is trashed', (done: any) => {
      const mockedGoogleDriveListFn = jest.fn().mockReturnValue(
        Promise.resolve({
          data: {
            files: [] as GoogleDriveFolder[],
          },
        })
      );

      const mockedGoogleDrive = {
        files: {
          list: mockedGoogleDriveListFn,
        },
      };

      findGoogleDriveFolderByName$(
        mockedGoogleDrive as unknown as drive_v3.Drive,
        faker.lorem.word(),
        faker.datatype.uuid()
      ).subscribe(() => {
        expect(mockedGoogleDriveListFn).toHaveBeenCalledTimes(1);
        const [params] = mockedGoogleDriveListFn.mock.calls[0];
        expect(params.q).toContain('trashed = false');
        done();
      });
    });

    it('should throw a conflict exception when more than one folder is found for the folder name', (done: any) => {
      const mockedGoogleDriveListFn = jest.fn().mockReturnValue(
        Promise.resolve({
          data: {
            files: [{} as GoogleDriveFolder, {} as GoogleDriveFolder],
          },
        })
      );

      const mockedGoogleDrive = {
        files: {
          list: mockedGoogleDriveListFn,
        },
      };

      const folderName = faker.lorem.word();
      findGoogleDriveFolderByName$(
        mockedGoogleDrive as unknown as drive_v3.Drive,
        folderName,
        faker.datatype.uuid()
      ).subscribe({
        next: () => {
          done();
        },
        error: (error) => {
          const conflictException = new ConflictException(
            `Found more that one Google Drive folder with name ${folderName}`
          );
          expect(error).toEqual(conflictException);
          done();
        },
        complete: () => {
          done();
        },
      });
    });

    it('should return undefined when folder is not found for the folder name', (done: any) => {
      const mockedGoogleDriveListFn = jest.fn().mockReturnValue(
        Promise.resolve({
          data: {
            files: [] as GoogleDriveFolder[],
          },
        })
      );

      const mockedGoogleDrive = {
        files: {
          list: mockedGoogleDriveListFn,
        },
      };

      findGoogleDriveFolderByName$(
        mockedGoogleDrive as unknown as drive_v3.Drive,
        faker.lorem.word(),
        faker.datatype.uuid()
      ).subscribe((result) => {
        expect(mockedGoogleDriveListFn).toHaveBeenCalledTimes(1);
        expect(result).toBeUndefined();
        done();
      });
    });
  });
});
