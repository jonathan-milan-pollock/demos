import { HttpModule, Module } from '@nestjs/common';

import {
  ApiEntityCreateProvider,
  AzureStorageProvider,
  UploadImageProvider,
} from '@dark-rush-photography/serverless/data';
import { UploadLightroomImageService } from './upload-lightroom-image.service';
import { UploadLightroomImageController } from './upload-lightroom-image.controller';

@Module({
  imports: [HttpModule],
  controllers: [UploadLightroomImageController],
  providers: [
    UploadLightroomImageService,
    UploadImageProvider,
    AzureStorageProvider,
    ApiEntityCreateProvider,
  ],
})
export class UploadImageModule {}
