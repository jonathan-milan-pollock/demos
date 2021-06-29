import { HttpModule, Module } from '@nestjs/common';

import {
  AzureStorageProvider,
  UpdateVideoDimensionProvider,
} from '@dark-rush-photography/serverless/data';
import { UpdateVideoDimensionService } from './update-video-dimension.service';
import { UpdateVideoDimensionController } from './update-video-dimension.controller';

@Module({
  imports: [HttpModule],
  controllers: [UpdateVideoDimensionController],
  providers: [
    UpdateVideoDimensionService,
    UpdateVideoDimensionProvider,
    AzureStorageProvider,
  ],
})
export class UpdateVideoDimensionModule {}
