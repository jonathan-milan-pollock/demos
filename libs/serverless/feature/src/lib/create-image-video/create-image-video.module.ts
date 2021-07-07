import { Module } from '@nestjs/common';

import { AzureStorageProvider } from '@dark-rush-photography/serverless/data';
import { CreateImageVideoService } from './create-image-video.service';
import { CreateImageVideoController } from './create-image-video.controller';

@Module({
  controllers: [CreateImageVideoController],
  providers: [CreateImageVideoService, AzureStorageProvider],
})
export class CreateImageVideoModule {}
