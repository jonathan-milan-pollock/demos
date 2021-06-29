import { HttpModule, Module } from '@nestjs/common';

import {
  AzureStorageProvider,
  CreateIconProvider,
} from '@dark-rush-photography/serverless/data';
import { CreateIconService } from './create-icon.service';
import { CreateIconController } from './create-icon.controller';

@Module({
  imports: [HttpModule],
  controllers: [CreateIconController],
  providers: [CreateIconService, CreateIconProvider, AzureStorageProvider],
})
export class CreateIconModule {}
