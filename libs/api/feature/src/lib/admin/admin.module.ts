import { Module } from '@nestjs/common';

import { AdminEntitiesModule } from './admin-entities/admin-entities.module';
import { AdminImagePostsModule } from './admin-image-posts/admin-image-posts.module';
import { AdminImagesModule } from './admin-images/admin-images.module';

@Module({
  imports: [AdminEntitiesModule, AdminImagePostsModule, AdminImagesModule],
})
export class AdminModule {}
