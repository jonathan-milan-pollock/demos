import { Module } from '@nestjs/common';

import { AdminCronProcessesModule } from './admin-cron-processes/admin-cron-processes.module';
import { AdminEntitiesModule } from './admin-entities/admin-entities.module';
import { AdminImagePostsModule } from './admin-image-posts/admin-image-posts.module';
import { AdminImagesModule } from './admin-images/admin-images.module';

@Module({
  imports: [
    AdminCronProcessesModule,
    AdminEntitiesModule,
    AdminImagePostsModule,
    AdminImagesModule,
  ],
})
export class AdminModule {}
