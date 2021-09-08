import { IsString, IsUUID } from 'class-validator';

import { GoogleDriveFolder } from '@dark-rush-photography/api/types';

export class GoogleDriveFolderDto implements GoogleDriveFolder {
  @IsUUID()
  id!: string;

  @IsString()
  name!: string;
}
