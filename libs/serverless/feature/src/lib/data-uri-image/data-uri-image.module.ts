import { HttpModule, Module } from '@nestjs/common';

import {
  AzureStorageProvider,
  DataUriImageProvider,
} from '@dark-rush-photography/serverless/data';
import { DataUriImageService } from './data-uri-image.service';
import { DataUriImageController } from './data-uri-image.controller';

@Module({
  imports: [HttpModule],
  controllers: [DataUriImageController],
  providers: [DataUriImageService, DataUriImageProvider, AzureStorageProvider],
})
export class DataUriImageModule {}
