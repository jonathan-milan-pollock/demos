import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  Document,
  DocumentModelService,
  DocumentSchema,
} from '@dark-rush-photography/api/data';
import { AdminDestinationsController } from './admin-destinations.controller';
import { AdminDestinationsService } from './admin-destinations.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
  ],
  controllers: [AdminDestinationsController],
  providers: [DocumentModelService, AdminDestinationsService],
})
export class AdminDestinationsModule {}
