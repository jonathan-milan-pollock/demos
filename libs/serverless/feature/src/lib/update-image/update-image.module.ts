import { HttpModule, Module } from '@nestjs/common';

import {
  AzureStorageProvider,
  UpdateImageProvider,
} from '@dark-rush-photography/serverless/data';
import { UpdateImageService } from './update-image.service';
import { UpdateImageController } from './update-image.controller';

@Module({
  imports: [HttpModule],
  controllers: [UpdateImageController],
  providers: [UpdateImageService, UpdateImageProvider, AzureStorageProvider],
})
export class UpdateImageModule {}
