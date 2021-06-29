import { HttpModule, Module } from '@nestjs/common';

import {
  AzureStorageProvider,
  DataUriVideoProvider,
} from '@dark-rush-photography/serverless/data';
import { DataUriVideoService } from './data-uri-video.service';
import { DataUriVideoController } from './data-uri-video.controller';

@Module({
  imports: [HttpModule],
  controllers: [DataUriVideoController],
  providers: [DataUriVideoService, DataUriVideoProvider, AzureStorageProvider],
})
export class DataUriVideoModule {}
