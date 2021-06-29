import { HttpModule, Module } from '@nestjs/common';

import {
  AzureStorageProvider,
  PostEntityProvider,
} from '@dark-rush-photography/serverless/data';
import { PostEntityService } from './post-entity.service';
import { PostEntityController } from './post-entity.controller';

@Module({
  imports: [HttpModule],
  controllers: [PostEntityController],
  providers: [PostEntityService, PostEntityProvider, AzureStorageProvider],
})
export class PostEntityModule {}
