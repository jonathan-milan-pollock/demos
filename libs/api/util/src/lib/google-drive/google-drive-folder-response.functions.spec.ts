import { BadRequestException } from '@nestjs/common';

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
      const folderName = faker.lorem.word();
      const response = { data: { files: [{ id, name: folderName }] } };

      const result = findGoogleDriveFolderByNameResponse(folderName, response);
      expect(result.id).toBe(id);
    });

    it('should return a google drive folder with correct name', () => {
      const folderName = faker.lorem.word();
      const response = {
        data: { files: [{ id: faker.datatype.uuid(), name: folderName }] },
      };

      const result = findGoogleDriveFolderByNameResponse(folderName, response);
      expect(result.name).toBe(folderName);
    });

    it.each(couldNotFindFolderResponses)(
      'should throw a bad request for %s',
      ({ response }) => {
        const folderName = faker.lorem.word();

        expect(() => {
          findGoogleDriveFolderByNameResponse(folderName, response);
        }).toThrow(BadRequestException);
      }
    );

    it.each(couldNotFindFolderResponses)(
      'should throw correct error message for %s',
      ({ response }) => {
        const folderName = faker.lorem.word();

        expect(() => {
          findGoogleDriveFolderByNameResponse(folderName, response);
        }).toThrow(`Could not find Google Drive folder ${folderName}`);
      }
    );

    it('should throw a bad request if more than 1 folder is returned', () => {
      const folderName = faker.lorem.word();
      const response = {
        data: {
          files: [
            { id: faker.datatype.uuid(), name: folderName },
            { id: faker.datatype.uuid(), name: folderName },
          ],
        },
      };

      expect(() => {
        findGoogleDriveFolderByNameResponse(folderName, response);
      }).toThrow(BadRequestException);
    });

    it('should throw correct error message if more than 1 folder is returned', () => {
      const folderName = faker.lorem.word();
      const response = {
        data: {
          files: [
            { id: faker.datatype.uuid(), name: folderName },
            { id: faker.datatype.uuid(), name: folderName },
          ],
        },
      };

      expect(() => {
        findGoogleDriveFolderByNameResponse(folderName, response);
      }).toThrow(
        `Found more that one Google Drive folder with name ${folderName}`
      );
    });
  });
});
