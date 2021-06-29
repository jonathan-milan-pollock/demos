import { Module } from '@nestjs/common';

import {
  AzureStorageProvider,
  DeleteProvider,
} from '@dark-rush-photography/serverless/data';
import { DeleteService } from './delete.service';
import { DeleteController } from './delete.controller';

@Module({
  controllers: [DeleteController],
  providers: [DeleteService, DeleteProvider, AzureStorageProvider],
})
export class DeleteModule {}
