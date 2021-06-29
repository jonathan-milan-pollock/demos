import { HttpModule, Module } from '@nestjs/common';

import {
  AzureStorageProvider,
  DeleteImageDimensionProvider,
} from '@dark-rush-photography/serverless/data';
import { DeleteImageDimensionService } from './delete-image-dimension.service';
import { DeleteImageDimensionController } from './delete-image-dimension.controller';

@Module({
  imports: [HttpModule],
  controllers: [DeleteImageDimensionController],
  providers: [
    DeleteImageDimensionService,
    DeleteImageDimensionProvider,
    AzureStorageProvider,
  ],
})
export class DeleteImageDimensionModule {}
