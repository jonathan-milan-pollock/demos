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
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
  ],
  controllers: [FavoritesController],
  providers: [
    FavoritesProvider,
    ImageProvider,
    ImageDimensionProvider,
    VideoProvider,
    VideoDimensionProvider,
    CommentProvider,
    EmotionProvider,
    FavoritesService,
  ],
})
export class FavoritesModule {}
