import { HttpModule, Module } from '@nestjs/common';

import {
  AzureStorageProvider,
  DeleteVideoProvider,
} from '@dark-rush-photography/serverless/data';
import { DeleteVideoService } from './delete-video.service';
import { DeleteVideoController } from './delete-video.controller';

@Module({
  imports: [HttpModule],
  controllers: [DeleteVideoController],
  providers: [DeleteVideoService, DeleteVideoProvider, AzureStorageProvider],
})
export class DeleteVideoModule {}
