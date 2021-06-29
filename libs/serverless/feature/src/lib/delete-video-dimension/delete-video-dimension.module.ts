import { HttpModule, Module } from '@nestjs/common';

import {
  AzureStorageProvider,
  DeleteVideoDimensionProvider,
} from '@dark-rush-photography/serverless/data';
import { DeleteVideoDimensionService } from './delete-video-dimension.service';
import { DeleteVideoDimensionController } from './delete-video-dimension.controller';

@Module({
  imports: [HttpModule],
  controllers: [DeleteVideoDimensionController],
  providers: [
    DeleteVideoDimensionService,
    DeleteVideoDimensionProvider,
    AzureStorageProvider,
  ],
})
export class DeleteVideoDimensionModule {}
