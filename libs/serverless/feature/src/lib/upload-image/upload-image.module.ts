import { Module } from '@nestjs/common';

import {
  AzureStorageProvider,
  UploadImageProvider,
} from '@dark-rush-photography/serverless/data';
import { UploadImageService } from './upload-image.service';
import { UploadImageController } from './upload-image.controller';

@Module({
  controllers: [UploadImageController],
  providers: [UploadImageService, UploadImageProvider, AzureStorageProvider],
})
export class UploadImageModule {}
