import { HttpModule, Module } from '@nestjs/common';

import {
  AzureStorageProvider,
  CreateImageVideoProvider,
} from '@dark-rush-photography/serverless/data';
import { CreateImageVideoService } from './create-image-video.service';
import { CreateImageVideoController } from './create-image-video.controller';

@Module({
  imports: [HttpModule],
  controllers: [CreateImageVideoController],
  providers: [
    CreateImageVideoService,
    CreateImageVideoProvider,
    AzureStorageProvider,
  ],
})
export class CreateImageVideoModule {}
