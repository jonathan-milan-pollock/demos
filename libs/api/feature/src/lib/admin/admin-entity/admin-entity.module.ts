import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  EntityProvider,
  Document,
  DocumentModelProvider,
  DocumentSchema,
} from '@dark-rush-photography/api/data';
import { AdminEntityController } from './admin-entity.controller';
import { AdminEntityService } from './admin-entity.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
  ],
  controllers: [AdminEntityController],
  providers: [DocumentModelProvider, EntityProvider, AdminEntityService],
})
export class AdminEntityModule {}
