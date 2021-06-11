import { Module } from '@nestjs/common';

import { ExifImageProcessService } from '@dark-rush-photography/serverless/data';
import { ExifImageController } from './exif-image.controller';
import { ExifImageService } from './exif-image.service';

@Module({
  controllers: [ExifImageController],
  providers: [ExifImageProcessService, ExifImageService],
})
export class ExifImageModule {}
