import { HttpModule, Module } from '@nestjs/common';

import {
  AzureStorageProvider,
  DeleteEntityProvider,
} from '@dark-rush-photography/serverless/data';
import { DeleteEntityService } from './delete-entity.service';
import { DeleteEntityController } from './delete-entity.controller';

@Module({
  imports: [HttpModule],
  controllers: [DeleteEntityController],
  providers: [DeleteEntityService, DeleteEntityProvider, AzureStorageProvider],
})
export class DeleteEntityModule {}
