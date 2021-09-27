import { ConflictException } from '@nestjs/common';

import { GoogleDriveFolder } from '@dark-rush-photography/shared/types';

export const findGoogleDriveFolderByNameResponse = (
  folderName: string,
  response?: {
    data?: {
      files?: GoogleDriveFolder[];
    };
  }
): GoogleDriveFolder | undefined => {
  if (response && response.data && response.data.files) {
    if (response.data.files.length === 1) {
      return response.data.files[0];
    }
    if (response.data.files.length > 1) {
      throw new ConflictException(
        `Found more that one Google Drive folder with name ${folderName}`
      );
    }
  }
  return undefined;
};
