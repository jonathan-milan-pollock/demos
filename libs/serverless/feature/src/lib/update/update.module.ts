import { Module } from '@nestjs/common';

import {
  AzureStorageProvider,
  UpdateProvider,
} from '@dark-rush-photography/serverless/data';
import { UpdateService } from './update.service';
import { UpdateController } from './update.controller';

@Module({
  controllers: [UpdateController],
  providers: [UpdateService, UpdateProvider, AzureStorageProvider],
})
export class UpdateModule {}
