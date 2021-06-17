import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Document, DocumentSchema } from '@dark-rush-photography/api/data';
import { AdminVideoDimensionDataController } from './admin-video-dimension-data.controller';
import { AdminVideoDimensionDataService } from './admin-video-dimension-data.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
    HttpModule,
  ],
  controllers: [AdminVideoDimensionDataController],
  providers: [AdminVideoDimensionDataService],
})
export class AdminVideoDimensionDataModule {}
