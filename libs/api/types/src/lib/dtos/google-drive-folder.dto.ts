import { IsString, IsUUID } from 'class-validator';

import { GoogleDriveFolder } from '../interfaces/google-drive-folder.interface';

export class GoogleDriveFolderDto implements GoogleDriveFolder {
  @IsUUID()
  id!: string;

  @IsString()
  name!: string;
}
