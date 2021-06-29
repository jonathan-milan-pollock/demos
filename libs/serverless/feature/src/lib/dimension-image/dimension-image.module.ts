import { HttpModule, Module } from '@nestjs/common';

import {
  AzureStorageProvider,
  DimensionImageProvider,
} from '@dark-rush-photography/serverless/data';
import { DimensionImageService } from './dimension-image.service';
import { DimensionImageController } from './dimension-image.controller';

@Module({
  imports: [HttpModule],
  controllers: [DimensionImageController],
  providers: [
    DimensionImageService,
    DimensionImageProvider,
    AzureStorageProvider,
  ],
})
export class DimensionImageModule {}
