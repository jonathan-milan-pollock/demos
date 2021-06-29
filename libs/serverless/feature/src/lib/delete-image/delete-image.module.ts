import { HttpModule, Module } from '@nestjs/common';

import {
  AzureStorageProvider,
  DeleteImageProvider,
} from '@dark-rush-photography/serverless/data';
import { DeleteImageService } from './delete-image.service';
import { DeleteImageController } from './delete-image.controller';

@Module({
  imports: [HttpModule],
  controllers: [DeleteImageController],
  providers: [DeleteImageService, DeleteImageProvider, AzureStorageProvider],
})
export class DeleteImageModule {}
