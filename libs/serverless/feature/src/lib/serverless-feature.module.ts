import { Module } from '@nestjs/common';

import { ExifImageController } from './exif-image/exif-image.controller';
import { ExifImageService } from './exif-image/exif-image.service';
import { ResizeImageController } from './resize-image/resize-image.controller';
import { ResizeImageService } from './resize-image/resize-image.service';
import { TinifyImageController } from './tinify-image/tinify-image.controller';
import { TinifyImageService } from './tinify-image/tinify-image.service';
import { UploadImageController } from './upload-image/upload-image.controller';
import { UploadImageService } from './upload-image/upload-image.service';

@Module({
  controllers: [
    ExifImageController,
    UploadImageController,
    ResizeImageController,
    TinifyImageController,
  ],
  providers: [
    ExifImageService,
    UploadImageService,
    ResizeImageService,
    TinifyImageService,
  ],
  exports: [],
})
export class ServerlessFeatureModule {}
