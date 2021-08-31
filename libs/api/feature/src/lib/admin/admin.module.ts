import { Module } from '@nestjs/common';

import { AdminDropboxModule } from './admin-dropbox/admin-dropbox.module';
import { AdminEntitiesModule } from './admin-entities/admin-entities.module';
import { AdminGoogleDriveModule } from './admin-google-drive/admin-google-drive.module';
import { AdminImagesModule } from './admin-images/admin-images.module';

@Module({
  imports: [
    AdminDropboxModule,
    AdminEntitiesModule,
    AdminGoogleDriveModule,
    AdminImagesModule,
  ],
})
export class AdminModule {}
