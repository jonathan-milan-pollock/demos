import { Module } from '@nestjs/common';

import { AzureStorageProvider } from '@dark-rush-photography/serverless/data';
import { TinifyImageService } from './tinify-image.service';
import { TinifyImageController } from './tinify-image.controller';

@Module({
  controllers: [TinifyImageController],
  providers: [TinifyImageService, AzureStorageProvider],
})
export class TinifyImageModule {}
