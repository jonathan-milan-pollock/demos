import { Module } from '@nestjs/common';

import { SyncImagesService } from './sync-images.service';
import { SyncImagesController } from './sync-images.controller';

@Module({
  controllers: [SyncImagesController],
  providers: [SyncImagesService],
})
export class SyncImagesModule {}
