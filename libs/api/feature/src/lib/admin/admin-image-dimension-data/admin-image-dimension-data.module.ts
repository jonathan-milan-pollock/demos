import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Document, DocumentSchema } from '@dark-rush-photography/api/data';
import { AdminImageDimensionDataController } from './admin-image-dimension-data.controller';
import { AdminImageDimensionDataService } from './admin-image-dimension-data.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
    HttpModule,
  ],
  controllers: [AdminImageDimensionDataController],
  providers: [AdminImageDimensionDataService],
})
export class AdminImageDimensionDataModule {}
