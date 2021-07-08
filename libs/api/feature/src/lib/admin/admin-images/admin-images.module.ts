import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  Document,
  DocumentSchema,
  EntityProvider,
  ImageDimensionProvider,
  ImageProvider,
  ImageRemoveProvider,
  ImageUpdateProvider,
  ImageUploadProvider,
} from '@dark-rush-photography/api/data';
import { AdminImagesService } from './admin-images.service';
import { AdminImagesController } from './admin-images.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
    HttpModule,
  ],
  controllers: [AdminImagesController],
  providers: [
    AdminImagesService,
    EntityProvider,
    ImageProvider,
    ImageDimensionProvider,
    ImageUploadProvider,
    ImageUpdateProvider,
    ImageRemoveProvider,
  ],
})
export class AdminImagesModule {}
