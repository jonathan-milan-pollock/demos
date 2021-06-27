import { Module } from '@nestjs/common';

import {
  AzureStorageProvider,
  UploadImageProvider,
} from '@dark-rush-photography/serverless/data';
import { UploadThreeSixtyImageService } from './upload-three-sixty-image.service';
import { UploadThreeSixtyImageController } from './upload-three-sixty-image.controller';

@Module({
  controllers: [UploadThreeSixtyImageController],
  providers: [
    UploadThreeSixtyImageService,
    UploadImageProvider,
    AzureStorageProvider,
  ],
})
export class UploadThreeSixtyImageModule {}
