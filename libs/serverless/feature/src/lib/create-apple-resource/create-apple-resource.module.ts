import { HttpModule, Module } from '@nestjs/common';

import {
  AzureStorageProvider,
  CreateAppleResourceProvider,
} from '@dark-rush-photography/serverless/data';
import { CreateAppleResourceService } from './create-apple-resource.service';
import { CreateAppleResourceController } from './create-apple-resource.controller';

@Module({
  imports: [HttpModule],
  controllers: [CreateAppleResourceController],
  providers: [
    CreateAppleResourceService,
    CreateAppleResourceProvider,
    AzureStorageProvider,
  ],
})
export class CreateAppleResourceModule {}
