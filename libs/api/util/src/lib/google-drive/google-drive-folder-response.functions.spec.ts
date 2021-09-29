import { ConflictException } from '@nestjs/common';

import * as faker from 'faker';

import { GoogleDriveFolder } from '@dark-rush-photography/shared/types';
import { findGoogleDriveFolderByNameResponse } from './google-drive-folder-response.functions';

describe('google-drive-folder-response.functions', () => {
  describe('findGoogleDriveFolderByNameResponse', () => {
    const couldNotFindFolderResponses: {
      response?: {
        data?: {
          files?: GoogleDriveFolder[];
        };
      };
    }[] = [
      {
        response: undefined,
      },
      {
        response: { data: undefined },
      },
      {
        response: { data: { files: undefined } },
      },
      {
        response: { data: { files: [] } },
      },
    ];

    it('should return a google drive folder with correct id', () => {
      const id = faker.datatype.uuid();
      const response = { data: { files: [{ id, name: faker.lorem.word() }] } };

      const result = findGoogleDriveFolderByNameResponse(
        faker.lorem.word(),
        response
      );
      expect(result?.id).toBe(id);
    });

    it('should return a google drive folder with correct name', () => {
      const folderName = faker.lorem.word();
      const response = {
        data: { files: [{ id: faker.datatype.uuid(), name: folderName }] },
      };

      const result = findGoogleDriveFolderByNameResponse(folderName, response);
      expect(result?.name).toBe(folderName);
    });

    it.each(couldNotFindFolderResponses)(
      'should be undefined for %s',
      ({ response }) => {
        const folderName = faker.lorem.word();
        const result = findGoogleDriveFolderByNameResponse(
          folderName,
          response
        );
        expect(result).toBeUndefined();
      }
    );

    it('should throw a conflict exception if more than 1 folder is returned', () => {
      const folderName = faker.lorem.word();
      const response = {
        data: {
          files: [
            { id: faker.datatype.uuid(), name: folderName },
            { id: faker.datatype.uuid(), name: folderName },
          ],
        },
      };
      const result = () => {
        findGoogleDriveFolderByNameResponse(folderName, response);
      };

      expect(result).toThrow(ConflictException);
      expect(result).toThrow(
        `Found more that one Google Drive folder with name ${folderName}`
      );
    });
  });
});