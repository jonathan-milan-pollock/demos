import { Module } from '@nestjs/common';

import { AdminDropboxModule } from './admin-dropbox/admin-dropbox.module';
import { AdminEntitiesModule } from './admin-entities/admin-entities.module';
import { AdminGoogleDriveModule } from './admin-google-drive/admin-google-drive.module';
import { AdminImagesModule } from './admin-images/admin-images.module';
import { AdminMediaProcessesModule } from './admin-media-processes/admin-media-processes.module';
import { AdminVideosModule } from './admin-videos/admin-videos.module';

@Module({
  imports: [
    AdminDropboxModule,
    AdminEntitiesModule,
    AdminGoogleDriveModule,
    AdminImagesModule,
    AdminMediaProcessesModule,
    AdminVideosModule,
  ],
})
export class AdminModule {}
