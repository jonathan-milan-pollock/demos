import { Module } from '@nestjs/common';

import {
  AzureStorageProvider,
  MediaProcessProvider,
} from '@dark-rush-photography/serverless/data';
import { MediaProcessService } from './media-process.service';
import { MediaProcessController } from './media-process.controller';

@Module({
  controllers: [MediaProcessController],
  providers: [MediaProcessService, MediaProcessProvider, AzureStorageProvider],
})
export class MediaProcessModule {}
