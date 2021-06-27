import { HttpModule, Module } from '@nestjs/common';

import {
  AzureStorageProvider,
  UploadImageProvider,
} from '@dark-rush-photography/serverless/data';
import { UploadVideoService } from './upload-video.service';
import { UploadVideoController } from './upload-video.controller';

@Module({
  imports: [HttpModule],
  controllers: [UploadVideoController],
  providers: [UploadVideoService, UploadImageProvider, AzureStorageProvider],
})
export class UploadVideoModule {}
