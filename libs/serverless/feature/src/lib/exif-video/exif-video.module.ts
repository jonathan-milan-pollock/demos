import { HttpModule, Module } from '@nestjs/common';

import {
  AzureStorageProvider,
  ExifVideoProvider,
} from '@dark-rush-photography/serverless/data';
import { ExifVideoService } from './exif-video.service';
import { ExifVideoController } from './exif-video.controller';

@Module({
  imports: [HttpModule],
  controllers: [ExifVideoController],
  providers: [ExifVideoService, ExifVideoProvider, AzureStorageProvider],
})
export class ExifVideoModule {}
