/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { BadRequestException } from '@nestjs/common';

import { GoogleDriveFolder } from '@dark-rush-photography/shared/types';

export const getGoogleDriveFolderWithNameExistsResponse = (
  response: any
): boolean =>
  response &&
  response.data &&
  response.data.files &&
  response.data.files.length > 0;

export const getGoogleDriveFolderWithNameResponse = (
  response: any,
  folderName: string
): GoogleDriveFolder => {
  if (
    !response ||
    !response.data ||
    !response.data.files ||
    response.data.files.length === 0
  )
    throw new BadRequestException(`Could not find folder ${folderName}`);

  if (response.data.files.length > 1) {
    throw new BadRequestException('More that one folder found');
  }
  return response.data.files[0] as GoogleDriveFolder;
};
