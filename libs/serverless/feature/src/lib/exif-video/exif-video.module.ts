import { Module } from '@nestjs/common';

import { AzureStorageProvider } from '@dark-rush-photography/serverless/data';
import { ExifVideoService } from './exif-video.service';
import { ExifVideoController } from './exif-video.controller';

@Module({
  controllers: [ExifVideoController],
  providers: [ExifVideoService, AzureStorageProvider],
})
export class ExifVideoModule {}
