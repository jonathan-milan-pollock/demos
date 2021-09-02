import { Module } from '@nestjs/common';

import { AdminEntitiesModule } from './admin-entities/admin-entities.module';
import { AdminGoogleDriveModule } from './admin-google-drive/admin-google-drive.module';
import { AdminImagesModule } from './admin-images/admin-images.module';

@Module({
  imports: [AdminEntitiesModule, AdminGoogleDriveModule, AdminImagesModule],
})
export class AdminModule {}
