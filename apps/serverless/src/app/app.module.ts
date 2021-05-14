import { Module } from '@nestjs/common';

import { ENV } from '@dark-rush-photography/shared-server/types';
import { environment } from '../environments/environment';
import {
  ExifImageController,
  ExifImageService,
  ImageUploadController,
  ImageUploadService,
  RecordImageDimensionsController,
  RecordImageDimensionsService,
  ResizeImageController,
  ResizeImageService,
  TinifyImageController,
  TinifyImageService,
} from '@dark-rush-photography/serverless/feature';

@Module({
  imports: [],
  controllers: [
    ExifImageController,
    ImageUploadController,
    RecordImageDimensionsController,
    ResizeImageController,
    TinifyImageController,
  ],
  providers: [
    ExifImageService,
    ImageUploadService,
    RecordImageDimensionsService,
    ResizeImageService,
    TinifyImageService,
    {
      provide: ENV,
      useValue: environment.env,
    },
  ],
})
export class AppModule {}
