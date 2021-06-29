import { HttpModule, Module } from '@nestjs/common';

import {
  AzureStorageProvider,
  UpdateVideoProvider,
} from '@dark-rush-photography/serverless/data';
import { UpdateVideoService } from './update-video.service';
import { UpdateVideoController } from './update-video.controller';

@Module({
  imports: [HttpModule],
  controllers: [UpdateVideoController],
  providers: [UpdateVideoService, UpdateVideoProvider, AzureStorageProvider],
})
export class UpdateVideoModule {}
