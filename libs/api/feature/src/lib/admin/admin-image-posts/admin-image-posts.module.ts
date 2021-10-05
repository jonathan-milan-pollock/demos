import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  Document,
  DocumentSchema,
  ImageProcessProvider,
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
    ImageUploadProvider,
    ImageProcessProvider,
  ],
})
export class AdminImagePostsModule {}
