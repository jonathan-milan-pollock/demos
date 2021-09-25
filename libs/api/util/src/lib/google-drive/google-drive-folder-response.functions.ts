import { BadRequestException } from '@nestjs/common';

import { GoogleDriveFolder } from '@dark-rush-photography/shared/types';

export const findGoogleDriveFolderByNameResponse = (
  folderName: string,
  response?: {
    data?: {
      files?: GoogleDriveFolder[];
    };
  }
): GoogleDriveFolder => {
  if (
    !response ||
    !response.data ||
    !response.data.files ||
    response.data.files.length === 0
  )
    throw new BadRequestException(
      `Could not find Google Drive folder ${folderName}`
    );

  if (response.data.files.length > 1) {
    throw new BadRequestException(
      `Found more that one Google Drive folder with name ${folderName}`
    );
  }
  return response.data.files[0];
};
