import { Module } from '@nestjs/common';

import { AdminEntitiesModule } from './admin-entities/admin-entities.module';
import { AdminImagesModule } from './admin-images/admin-images.module';
import { AdminMediaProcessesModule } from './admin-media-processes/admin-media-processes.module';
import { AdminSharedPhotoAlbumsModule } from './admin-shared-photo-albums/admin-shared-photo-albums.module';

@Module({
  imports: [
    AdminEntitiesModule,
    AdminImagesModule,
    AdminMediaProcessesModule,
    AdminSharedPhotoAlbumsModule,
  ],
})
export class AdminModule {}
