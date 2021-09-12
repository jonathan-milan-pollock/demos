import { Module } from '@nestjs/common';

import { AdminEntitiesModule } from './admin-entities/admin-entities.module';
import { AdminImagesModule } from './admin-images/admin-images.module';
import { AdminMediaProcessesModule } from './admin-media-processes/admin-media-processes.module';

@Module({
  imports: [AdminEntitiesModule, AdminImagesModule, AdminMediaProcessesModule],
})
export class AdminModule {}
