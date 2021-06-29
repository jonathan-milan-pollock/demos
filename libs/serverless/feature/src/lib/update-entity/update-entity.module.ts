import { HttpModule, Module } from '@nestjs/common';

import {
  AzureStorageProvider,
  UpdateEntityProvider,
} from '@dark-rush-photography/serverless/data';
import { UpdateEntityService } from './update-entity.service';
import { UpdateEntityController } from './update-entity.controller';

@Module({
  imports: [HttpModule],
  controllers: [UpdateEntityController],
  providers: [UpdateEntityService, UpdateEntityProvider, AzureStorageProvider],
})
export class UpdateEntityModule {}
