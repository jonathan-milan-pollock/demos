import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  Document,
  DocumentSchema,
  ImageDimensionProvider,
  ImageProcessNewProvider,
  ImageProvider,
  ImageResizeProvider,
  ImageUploadProvider,
} from '@dark-rush-photography/api/data';
import { AdminImagePostsService } from './admin-image-posts.service';
import { AdminImagePostsController } from './admin-image-posts.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
  ],
  controllers: [AdminImagePostsController],
  providers: [
    AdminImagePostsService,
    ImageProvider,
    ImageDimensionProvider,
    ImageProcessNewProvider,
    ImageUploadProvider,
    ImageResizeProvider,
  ],
})
export class AdminImagePostsModule {}
