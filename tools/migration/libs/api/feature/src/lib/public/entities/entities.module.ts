import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';

import {
  Document,
  DocumentSchema,
  EntityFindPublicProvider,
  PublicEntitiesService,
} from '@dark-rush-photography/api/data';
import { EntitiesController } from './entities.controller';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
  ],
  controllers: [EntitiesController],
  providers: [PublicEntitiesService, EntityFindPublicProvider],
})
export class EntitiesModule {}
