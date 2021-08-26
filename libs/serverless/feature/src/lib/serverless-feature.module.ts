import { Module } from '@nestjs/common';

import { ProcessSyncImageModule } from './process-sync-image/process-sync-image.module';
import { SyncImagesModule } from './sync-images/sync-images.module';

@Module({
  imports: [ProcessSyncImageModule, SyncImagesModule],
})
export class ServerlessFeatureModule {}
