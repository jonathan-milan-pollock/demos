import { Module } from '@nestjs/common';

import { AzureStorageProvider } from '@dark-rush-photography/serverless/data';
import { ResizeVideoService } from './resize-video.service';
import { ResizeVideoController } from './resize-video.controller';

@Module({
  controllers: [ResizeVideoController],
  providers: [ResizeVideoService, AzureStorageProvider],
})
export class ResizeVideoModule {}
