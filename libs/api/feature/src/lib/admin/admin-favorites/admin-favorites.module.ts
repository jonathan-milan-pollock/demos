import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  CommentProvider,
  Document,
  DocumentSchema,
  EmotionProvider,
  FavoritesProvider,
  ImageDimensionProvider,
  ImageProvider,
  VideoDimensionProvider,
  VideoProvider,
} from '@dark-rush-photography/api/data';
import { AdminFavoritesController } from './admin-favorites.controller';
import { AdminFavoritesService } from './admin-favorites.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
  ],
  controllers: [AdminFavoritesController],
  providers: [
    FavoritesProvider,
    ImageProvider,
    ImageDimensionProvider,
    VideoProvider,
    VideoDimensionProvider,
    CommentProvider,
    EmotionProvider,
    AdminFavoritesService,
  ],
})
export class AdminFavoritesModule {}
