import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  Document,
  DocumentSchema,
  VideoDimensionProvider,
} from '@dark-rush-photography/api/data';
import { AdminVideoDimensionsController } from './admin-video-dimensions.controller';
import { AdminVideoDimensionsService } from './admin-video-dimensions.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
  ],
  controllers: [AdminVideoDimensionsController],
  providers: [VideoDimensionProvider, AdminVideoDimensionsService],
})
export class AdminVideoDimensionsModule {}
