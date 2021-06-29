import { HttpModule, Module } from '@nestjs/common';

import {
  AzureStorageProvider,
  UploadLightroomImageProvider,
} from '@dark-rush-photography/serverless/data';
import { UploadLightroomImageService } from './upload-lightroom-image.service';
import { UploadLightroomImageController } from './upload-lightroom-image.controller';

@Module({
  imports: [HttpModule],
  controllers: [UploadLightroomImageController],
  providers: [
    UploadLightroomImageService,
    UploadLightroomImageProvider,
    AzureStorageProvider,
  ],
})
export class UploadLightroomImageModule {}
