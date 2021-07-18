import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  Document,
  DocumentSchema,
  EntityDeleteProvider,
  EntityProvider,
  FavoritesProvider,
  ImageProvider,
  ImageRemoveProvider,
  MediaProvider,
  VideoProvider,
  VideoRemoveProvider,
} from '@dark-rush-photography/api/data';
import { AdminFavoritesService } from './admin-favorites.service';
import { AdminFavoritesController } from './admin-favorites.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
  ],
  controllers: [AdminFavoritesController],
  providers: [
    AdminFavoritesService,
    FavoritesProvider,
    EntityProvider,
    EntityDeleteProvider,
    MediaProvider,
    ImageProvider,
    ImageRemoveProvider,
    VideoProvider,
    VideoRemoveProvider,
  ],
})
export class AdminFavoritesModule {}
