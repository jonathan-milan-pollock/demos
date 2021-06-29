import { HttpModule, Module } from '@nestjs/common';

import {
  AzureStorageProvider,
  DimensionVideoProvider,
} from '@dark-rush-photography/serverless/data';
import { DimensionVideoService } from './dimension-video.service';
import { DimensionVideoController } from './dimension-video.controller';

@Module({
  imports: [HttpModule],
  controllers: [DimensionVideoController],
  providers: [
    DimensionVideoService,
    DimensionVideoProvider,
    AzureStorageProvider,
  ],
})
export class DimensionVideoModule {}
