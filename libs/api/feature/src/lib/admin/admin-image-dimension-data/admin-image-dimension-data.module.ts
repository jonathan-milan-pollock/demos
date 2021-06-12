import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  Document,
  DocumentModelProvider,
  DocumentSchema,
  ImageDimensionDataProvider,
  PostedStateProvider,
} from '@dark-rush-photography/api/data';
import { AdminImageDimensionDataController } from './admin-image-dimension-data.controller';
import { AdminImageDimensionDataService } from './admin-image-dimension-data.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
  ],
  controllers: [AdminImageDimensionDataController],
  providers: [
    DocumentModelProvider,
    ImageDimensionDataProvider,
    PostedStateProvider,
    AdminImageDimensionDataService,
  ],
})
export class AdminImageDimensionDataModule {}
