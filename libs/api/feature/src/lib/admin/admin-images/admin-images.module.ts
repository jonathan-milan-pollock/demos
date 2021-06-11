import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ImageStateProvider } from '@dark-rush-photography/api/util';
import {
  Document,
  DocumentModelService,
  DocumentSchema,
} from '@dark-rush-photography/api/data';
import { AdminImagesController } from './admin-images.controller';
import { AdminImagesService } from './admin-images.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
  ],
  controllers: [AdminImagesController],
  providers: [ImageStateProvider, DocumentModelService, AdminImagesService],
})
export class AdminImagesModule {}
