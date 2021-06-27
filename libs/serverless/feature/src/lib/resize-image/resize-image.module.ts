import { HttpModule, Module } from '@nestjs/common';

import {
  ApiImageDimensionProvider,
  AzureStorageProvider,
  ResizeImageProvider,
} from '@dark-rush-photography/serverless/data';
import { ResizeImageService } from './resize-image.service';
import { ResizeImageController } from './resize-image.controller';

@Module({
  imports: [HttpModule],
  controllers: [ResizeImageController],
  providers: [
    ResizeImageService,
    ResizeImageProvider,
    AzureStorageProvider,
    ApiImageDimensionProvider,
  ],
})
export class ResizeImageModule {}
