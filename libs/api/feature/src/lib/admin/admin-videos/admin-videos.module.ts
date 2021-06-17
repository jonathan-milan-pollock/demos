import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  Document,
  DocumentSchema,
  ImageProvider,
} from '@dark-rush-photography/api/data';
import { AdminVideosController } from './admin-videos.controller';
import { AdminVideosService } from './admin-videos.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
  ],
  controllers: [AdminVideosController],
  providers: [ImageProvider, AdminVideosService],
})
export class AdminVideosModule {}
