import { HttpModule, Module } from '@nestjs/common';

import {
  AzureStorageProvider,
  UpdateImageDimensionProvider,
} from '@dark-rush-photography/serverless/data';
import { UpdateImageDimensionService } from './update-image-dimension.service';
import { UpdateImageDimensionController } from './update-image-dimension.controller';

@Module({
  imports: [HttpModule],
  controllers: [UpdateImageDimensionController],
  providers: [
    UpdateImageDimensionService,
    UpdateImageDimensionProvider,
    AzureStorageProvider,
  ],
})
export class UpdateImageDimensionModule {}
